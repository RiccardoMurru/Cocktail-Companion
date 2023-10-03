
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import UserModel from './models/user';

// export async function register(req: Request, res: Response): Promise<void> {
//   try {
//     const { username, password } = req.body;
//     const user = await UserModel.findOne({ username });
//     if (!user) {
//       const hashedPassword = bcrypt.hashSync(password, 10);

//       UserModel.create({ username, password: hashedPassword });

//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
//         expiresIn: '1h' // Token expires in 1 hour, you can adjust this as needed
//       } as SignOptions);

//       res.status(201).json({ message: 'User registered successfully' }, token);
//     } else {
//       res.status(400).json({ message: 'Registration failed' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// }

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await UserModel.create({
        username,
        password: hashedPassword
      });

      const token = jwt.sign(
        { username: newUser.username },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1h'
        }
      );

      res.status(201).json({ token });
    } else {
      res.status(400).json({ message: 'Registration failed, username already exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user || !password) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h'
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { username } = req.body;
    const user = await UserModel.findOne({ username: username });
    res.status(200).send(user);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
}

export async function addFavourite(req: Request, res: Response) {
  try {
    const { username, faveId } = req.body;
    const user = await UserModel.findOne({ username: username });
    user.favourites.push(faveId);
    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
}

export async function removeFavourite(req: Request, res: Response) {
  try {
    const { username, faveId } = req.body;
    const user = await UserModel.findOne({ username: username });
    const indexToRemove = user.favourites.indexOf(faveId);
    user.favourites.splice(indexToRemove, 1);
    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
}