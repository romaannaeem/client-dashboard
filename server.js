const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('./passport');
const app = express();

mongoose.connect(
  'mongodb+srv://romaan:passwordpassword@cluster0.ucqso.mongodb.net/db?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const auth = require('./routes/authRoutes');

app.use(cors());

app.use(
  session({
    secret: 'ayy-lmao', //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false, //required
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

// For deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
