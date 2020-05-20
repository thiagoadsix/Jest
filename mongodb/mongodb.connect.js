const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://thiago:123456.com@cluster0-roxzt.mongodb.net/test',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

module.exports = { connect };
