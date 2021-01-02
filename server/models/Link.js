const mongoose = require("mongoose");
const { Schema } = mongoose;

const LinkSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  shortLink: {
    type: String,
    required: true
  },
  urlCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  totalClickCount: {
    type: Number,
    default: 0
  },
  clicks: [{ type: Schema.Types.ObjectId, ref: 'Click' }],
  session: { type: String, ref: 'Session' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Link", LinkSchema);