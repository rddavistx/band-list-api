const mongoose = require('mongoose');

const bandSchema = {
  name: String,
  genre: String,
  corruptedByTheSystem: {type: Boolean, default: true}

}

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;
