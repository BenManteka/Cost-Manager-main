const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action:  { type: String, required: true },    
  at:      { type: Date,   default: Date.now },  // If no date is provided, the current date is used by default  
  userid:  { type: Number }, 
  payload: { type: Object } // צילום מצב של מה שנשמר/נכשל
}, { versionKey: false });

module.exports = mongoose.model('Log', logSchema);
