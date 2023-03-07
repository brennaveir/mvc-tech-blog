const express = require('express');
const session = require('express-session');
const config = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(config.sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(routes);

config.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
