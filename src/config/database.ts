const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://team:vSEinrwcXSAwDoOi@cluster0.okfgn.mongodb.net/KeyReplyChatbot?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connect database successfully!');
  } catch (e) {
    console.log('Connect database failure!');
  }
}

module.exports = { connect };
