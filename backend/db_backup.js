const { MongoClient } = require('mongodb');
require('dotenv').config();

// Your MongoDB Atlas connection string
const remote_url = process.env.MONGODB_URI;
const destination_url = "mongodb://localhost:27017/";

async function copyCollections() {
    let client;
    let destinationClient;
    try {
        // Connect to MongoDB Atlas
        console.log("Connecting to MongoDB Atlas...");
        client = new MongoClient(remote_url, { serverSelectionTimeoutMS: 30000 });
        destinationClient = new MongoClient(destination_url, { serverSelectionTimeoutMS: 30000 });
        await client.connect();
        await destinationClient.connect();
        
        // Test the connection
        await client.db("admin").command({ ping: 1 });
        await destinationClient.db("admin").command({ ping: 1 });
        console.log("✅ Successfully connected to MongoDB Atlas and local MongoDB");
        
        console.log("Getting collections from fishery_college database...");

        // Get the databases from the remote server
        const source_db = client.db("fishery_college");  // Source database (MongoDB Atlas)
        const target_db = destinationClient.db("fishery_college");  // Target database (Local MongoDB)

        // Get all collection names from fishery_college
        const collections_to_copy = await source_db.listCollections().toArray();
        const collectionNames = collections_to_copy.map(coll => coll.name).filter(name => 
            !['system.indexes', 'system.views', 'system.profile'].includes(name)
        );

        console.log(`Found ${collectionNames.length} collections in fishery_college:`, collectionNames);

        console.log("Backing up collections from MongoDB Atlas to local MongoDB...");

        for (const coll_name of collectionNames) {
            console.log(`  -> Processing collection: ${coll_name}`);
            
            const source_coll = source_db.collection(coll_name);
            const target_coll = target_db.collection(coll_name);
            
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
        if (destinationClient) {
            await destinationClient.close();
        }
    }
}

// Run the function
copyCollections();