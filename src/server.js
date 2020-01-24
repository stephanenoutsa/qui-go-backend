// Third party modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Private modules
const sequelize = require('./utils/sequelize');

// Routes
const V0IndexRouter = require('./services/v0/index.router');
const {get404} = require('./services/v0/error.router');

// Models
require('./services/v0/model.index');

(async() => {
  try {
    await sequelize.sync();

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // CORS Should be restricted
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE, HEAD');

      next();
    });
    app.options('*', cors());

    // V0 Endpoints
    app.use('/api/v0/', V0IndexRouter);

    // Root Endpoint
    // Displays a simple message to the user
    app.get('/', (req, res) => {
      res.send('/api/v0/');
    });

    // Resource not found
    app.use(get404);

    // Start the Server
    app.listen(port, () => {
      console.log(`server running http://localhost:${port}`);
      console.log('press CTRL+C to stop server');
    });
  } catch (e) {
    console.log(e);
  }
})();
