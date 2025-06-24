const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({ 
    username: {
        type: String,
        trim: true, 
        required: true
      },

      password: {
        type: String,
        required: true
      },

      color: {
        type: String,
        trim: true, 
        required: true
      },
})

module.exports = mongoose.model("Profile", profileSchema);