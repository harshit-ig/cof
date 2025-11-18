const { MongoClient } = require('mongodb');

// Your MongoDB Atlas connection string
const remote_url = "mongodb+srv://elite:w73XvGD6XAmS4vT0@spokify.gagpwfj.mongodb.net/";

async function copyCollections() {
    let client;
    
    try {
        // Connect to MongoDB Atlas
        console.log("Connecting to MongoDB Atlas...");
        client = new MongoClient(remote_url, { serverSelectionTimeoutMS: 30000 });
        await client.connect();
        
        // Test the connection
        await client.db("admin").command({ ping: 1 });
        console.log("✅ Successfully connected to MongoDB Atlas");
        
        console.log("Getting collections from fishery_college database...");

        // Get the databases from the remote server
        const source_db = client.db("test");  // Source database
        const target_db = client.db("fishery_college");  // Target database

        // Get all collection names from fishery_college
        const collections_to_copy = await target_db.listCollections().toArray();
        const collectionNames = collections_to_copy.map(coll => coll.name).filter(name => 
            !['system.indexes', 'system.views', 'system.profile'].includes(name)
        );

        console.log(`Found ${collectionNames.length} collections in fishery_college:`, collectionNames);

        console.log("Copying collections from 'test' database to 'fishery_college' database...");

        for (const coll_name of collectionNames) {
            console.log(`  -> Processing collection: ${coll_name}`);
            
            const source_coll = source_db.collection(coll_name);
            const target_coll = target_db.collection(coll_name);
            
            // Check if source collection exists in test database
            const sourceCollections = await source_db.listCollections({name: coll_name}).toArray();
            if (sourceCollections.length === 0) {
                console.log(`     ⚠️  Collection '${coll_name}' not found in test database, skipping...`);
                continue;
            }
            
            // Get document count before operation
            const source_count = await source_coll.countDocuments({});
            const target_count_before = await target_coll.countDocuments({});
            
            console.log(`     Source has ${source_count} documents, target has ${target_count_before} documents`);
            
            if (source_count === 0) {
                console.log(`     ⚠️  No documents in source collection, skipping...`);
                continue;
            }
            
            // Clear the target collection first
            console.log(`     Clearing target collection...`);
            await target_coll.deleteMany({});
            
            // Copy all documents from source to target
            const batch_size = 500;
            let doc_count = 0;
            
            console.log(`     Copying documents...`);
            const cursor = source_coll.find({});
            
            while (await cursor.hasNext()) {
                const batch = [];
                for (let i = 0; i < batch_size && await cursor.hasNext(); i++) {
                    batch.push(await cursor.next());
                }
                
                if (batch.length > 0) {
                    await target_coll.insertMany(batch);
                    doc_count += batch.length;
                    console.log(`     Copied ${doc_count}/${source_count} documents...`);
                }
            }
            
            // Verify the copy
            const target_count_after = await target_coll.countDocuments({});
            console.log(`     ✅ Copied ${doc_count} documents. Target now has ${target_count_after} documents`);
        }

        console.log("✅ All collections processed successfully!");

    } catch (e) {
        console.log(`❌ Error: ${e.message}`);
        console.log("Troubleshooting tips:");
        console.log("1. Check if your MongoDB Atlas cluster is running");
        console.log("2. Verify your username and password in the connection string");
        console.log("3. Check your internet connection");
        console.log("4. Make sure your IP is whitelisted in MongoDB Atlas");
        console.log("5. Check if the database names are correct");
    } finally {
        if (client) {
            await client.close();
        }
    }
}

// Run the function
copyCollections();