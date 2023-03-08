const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars')
const config = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create()

app.use(session(config.sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

config.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
