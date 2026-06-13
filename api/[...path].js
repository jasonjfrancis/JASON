const app = require('../server/index');

// Export the Express app as the handler. Vercel will call this for any /api/* path.
module.exports = (req, res) => app(req, res);
