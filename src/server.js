const mongoose = require('mongoose');
const { app } = require('./app');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('API connected to database.');
}).catch((error) => {
  console.log(`Could not connect to database: ${error}`);
});

app.listen(config.port, () => {
  console.log(`API listening at http://localhost:${config.port}`);
});
