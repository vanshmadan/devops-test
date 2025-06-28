var express = require('express');
var app = express();
const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "50MB" }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(`DB Connection Error: ${err.message}`));

mongoose.connection.on('error', err => {
  console.log(`DB Connection Error: ${err.message}`);
});

app.get('/', (req, res) => {
  res.status(200).send('API running');
});

const profileRoutes = require('./routes/profile');
const sketchRoutes = require('./routes/sketch');
app.use("/api", profileRoutes);
app.use("/api", sketchRoutes);

module.exports = app;
