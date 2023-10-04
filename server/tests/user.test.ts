import express from 'express';
import router from '../router';
import supertest from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import User from '../models/user';
import jwt from 'jsonwebtoken';

describe('user test', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  const user = {
    username: 'user1',
    password: '123',
  };

  beforeAll(async () => {
    const url = 'mongodb://127.0.0.1:27017/cocktail-companion';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // it('should add a user to the db', async () => {
  //   const addUserResponse = await request.post('/add-user').send(user);
  //   expect(addUserResponse.status).toBe(200);

  //   const userInDB = await User.findOne({ username: user.username });
  //   expect(userInDB).toBeDefined();
  //   expect(userInDB.username).toBe(user.username);
  // });

  // it('should not add a user if already exists', async () => {
  //   const addUserResponse = await request.post('/add-user').send(user);
  //   const secondAddUserResponse = await request.post('/add-user').send(user);

  //   expect(addUserResponse.status).toBe(200);
  //   expect(secondAddUserResponse.status).toBe(401);
  //   expect(secondAddUserResponse.text).toBe('Username already in use');
  // });

  // it('should retrieve a user from the db', async () => {
  //   await request.post('/add-user').send(user);
  //   const retrieveUserResponse = await request.post('/user-profile').send(user);

  //   const userInDB = await User.findOne({ username: user.username });
  //   expect(retrieveUserResponse.status).toBe(200);
  //   expect(retrieveUserResponse.body.username).toBe(userInDB.username);
  // });

  it('should retrieve a user from the db', async () => {
    // Add user to the database
    const addUserResponse = await request.post('/register').send(user);
    expect(addUserResponse.status).toBe(201);
  
    // Generate a JWT token for authentication
    const token = jwt.sign({ username: user.username }, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
  
    // Retrieve user from the database with the JWT token in the headers
    const retrieveUserResponse = await request.post('/user-profile')
      .send(user)
      .set('Authorization', `Bearer ${token}`); // Include the JWT token in the Authorization header
    console.log(retrieveUserResponse.body); // Log the response for debugging
  
    // Get user from the database directly
    const userInDB = await User.findOne({ username: user.username });
    console.log(userInDB); // Log the retrieved user from the database for debugging
  
    // Assertions
    expect(retrieveUserResponse.status).toBe(200);
    expect(retrieveUserResponse.body.username).toBe(userInDB.username);
  });

//   it('should throw an error if the password is wrong', async () => {
//     await request.post('/add-user').send(user);
//     const userToFind = {
//       username: 'user1',
//       password: 'wrong_password',
//     };
//     const retrieveUserResponse = await request
//       .post('/user-profile')
//       .send(userToFind);
//     expect(retrieveUserResponse.status).toBe(400);
//     expect(retrieveUserResponse.body.message).toBe(
//       'User or Password incorrect'
//     );
//   });

//   it('should add to favorites', async () => {
//     await request.post('/add-user').send(user);
//     const favoriteId = '123';
//     const userToUpdate = {
//       username: user.username,
//       faveId: favoriteId
//     }
//     const addFavoriteResponse = await request
//       .put('/addfave')
//       .send(userToUpdate);

//     expect(addFavoriteResponse.status).toBe(200);

//     const userInDb = await User.findOne({ username: user.username });
//     expect(userInDb.favourites[0]).toBe(favoriteId);
//   });

//   it('should remove from favorites', async () => {
//     await request.post('/add-user').send(user);
//     const removeFavoriteResposne = await request.put('/remove-fave').send({ username: user.username });

//     const userInDb = await User.findOne({ username: user.username });

//     expect(removeFavoriteResposne.status).toBe(200);
//     expect(userInDb.favourites).toEqual([]);
//   })

});
