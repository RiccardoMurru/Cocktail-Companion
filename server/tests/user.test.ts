import express from 'express';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import mongoose, { ConnectOptions } from 'mongoose';
import UserModel from '../models/user';
import { authMiddleware } from '../middleware/auth';
import * as controller from '../controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('GET /user-profile', () => {
  const app = express();
  app.use(express.json());

  app.get('/user-profile', authMiddleware, controller.getUser);

  const request = supertest(`http://localhost:${process.env.PORT}`);
  const user = {
    username: 'user1',
    password: '123'
  };

  let validToken: string;

  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions
    );

    const registerResponse = await request.post('/register').send(user);
    validToken = registerResponse.body.token;
  });

  afterAll(async () => {
    await UserModel.deleteMany();
    await mongoose.connection.close();
  });

  it('should retrieve a user profile when authenticated', async () => {
    jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() => ({ username: user.username }));

    const response = await request
      .get('/user-profile')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(200);

    const userInDb = await UserModel.findOne({ username: user.username });

    expect(response.body._id).toEqual(userInDb._id.toString());
    expect(response.body.username).toEqual(user.username);

    const isPasswordValid = await bcrypt.compare(
      user.password,
      response.body.password
    );
    expect(isPasswordValid).toBe(true);

    expect(response.body.favourites).toEqual([]);
    expect(response.body.ingredients).toEqual([]);
  });

  it('should return an error when not authenticated', async () => {
    const req = getMockReq();
    const { res } = getMockRes();

    authMiddleware(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(403);
  });
});