const mongoose = require('mongoose');

const sketchSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
      },

      base64: {
        type: String,
        required: true
      },

      userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Profile'
      }],
})

module.exports = mongoose.model("Sketch", sketchSchema);