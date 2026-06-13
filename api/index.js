const app = require('../server/index');
const serverless = require('serverless-http');

// Wrap the Express app with serverless-http for better lambda compatibility
module.exports = serverless(app);
