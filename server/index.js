const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const router = require('./router')
const secret = 'abc123'
const port = 3001
const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsConfig))
app.use(express.json())
app.use(router)
// app.use(session({
//   name: 'cocktail-making-session',
//     saveUninitialized: false,
//     resave: false,
//     secret: secret,
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//       sameSite: true,
//       httpOnly: false,
//       secure: false
//     }
// }))
app.listen(port, (err)=>{
  if (err) console.log('Meep Maap')
  else console.log('Our server is running successfully sire')
})
