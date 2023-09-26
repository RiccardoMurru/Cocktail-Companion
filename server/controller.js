const User = require('./models/user')
const bcrypt = require('bcrypt')

async function getUser(req,res){
  try {
    console.log('ITS HERE')
    console.log(req.body)
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    const passwordMatches = await bcrypt.compare(password, user.password); 
    if(!passwordMatches) {
      res.status(400).json({error: 400, message: 'User or Password incorrect'})
    }
    // // req.session.uid = user._id;
    res.status(200).send(user)
  } catch(err) {
    res.status(500)
    console.log(err)
  }
}

async function addUser(req,res){
  try {
    const {username, password} = req.body
    const userExists = await User.findOne({username})
    if(userExists) throw new Error()
    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = await User.create({username: username, password: hashedPass})
    res.status(200).send(newUser)
  } catch(err) {
    res.status(401).send('Username already in use')
  }
}

async function addFavourite(req,res){
  try {
    const {username, faveId} = req.body
    const user = await User.findOne({username: username})
    user.favourites.push(faveId)
    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch (err) {
    res.status(500).send('Something went wrong')
  }
}

async function removeFavourite(req,res) {
  try {
    const {username, faveId} = req.body
    const user = await User.findOne({username: username})
    const indexToRemove = user.favourites.indexOf(faveId)
    user.favourites.splice(indexToRemove,1)
    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch (err) {
    res.status(500).send('Something went wrong')
  }
}


module.exports = {getUser,addFavourite,removeFavourite,addUser}