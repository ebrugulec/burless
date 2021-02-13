const mongoose = require('mongoose')
const { Schema } = mongoose

const TotalClick = new Schema({
  linkCode: {
    type: String,
    required: true
  },
  totalClickCount: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('TotalClick', TotalClick)
