const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClickSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  _link: {
    type: Schema.Types.ObjectId,
    ref: 'Link'
  },
  referrer: {
    type: String,
    default: 'Direct'
  },
  country: {
    type: String,
  }
});

module.exports = mongoose.model("Click", ClickSchema);