const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReferrerSchema = new Schema({
  title: {
    type: String,
  },
  _link: { type: Schema.Types.ObjectId, ref: 'Link' },

});

module.exports = mongoose.model("Referrer", ReferrerSchema);