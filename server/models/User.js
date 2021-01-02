const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  link: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
});

module.exports = mongoose.model("User", UserSchema);