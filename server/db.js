const mongoose = require('mongoose')

async function connect() {
 try {
   await mongoose.connect('mongodb://127.0.0.1:27017/cocktail-companion',{ useNewUrlParser: true, useUnifiedTopology: true })
   console.log('Connected to DB')
 } catch (err) {
  console.log('database connection error')
 }
}
connect()

module.exports = mongoose