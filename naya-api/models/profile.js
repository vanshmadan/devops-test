const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({ 
    username: {
        type: String,
        trim: true,
	unique: true,
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

// Force index creation
profileSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("Profile", profileSchema);
