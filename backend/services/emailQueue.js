const Queue = require('bull');
const nodemailer = require('nodemailer');

// Create email queue
const emailQueue = new Queue('email', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Process email jobs
emailQueue.process(async (job) => {
  const { mailOptions } = job.data;
  
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Bull will retry the job
  }
});

// Event handlers for monitoring
emailQueue.on('completed', (job, result) => {
  console.log(`Email job ${job.id} completed:`, result.messageId);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err.message);
});

emailQueue.on('stalled', (job) => {
  console.warn(`Email job ${job.id} stalled`);
});

// Add email to queue
const queueEmail = async (mailOptions, options = {}) => {
  try {
    const job = await emailQueue.add(
      { mailOptions },
      {
        attempts: 3, // Retry 3 times
        backoff: {
          type: 'exponential',
          delay: 5000 // Start with 5 second delay
        },
        removeOnComplete: true, // Clean up after success
        removeOnFail: false, // Keep failed jobs for inspection
        ...options
      }
    );
    console.log(`Email queued with job ID: ${job.id}`);
    return job.id;
  } catch (error) {
    console.error('Error queueing email:', error);
    throw error;
  }
};

// Graceful shutdown
const closeQueue = async () => {
  await emailQueue.close();
};

module.exports = {
  emailQueue,
  queueEmail,
  closeQueue
};
