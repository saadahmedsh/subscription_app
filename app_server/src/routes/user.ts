import { Router } from "express";
import User from "../schema/user";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

const router = Router();

const handleAuthentication=(req:Request, res:Response, next:NextFunction)=>{

  let token=req.headers['authorization']
  token=token?.split(' ')[1]
  try {
    jwt.verify(token as string, 'subscriptionapp')
    next()
    
  } catch (error) {
    
      res.send(error)
  }  
  
}

router.post(
  "/register",

  body("email").isEmail(),
  body("password").isLength({ min: 5 }),

  (req, res) => {
    // validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors);
    }

    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.findOne({ email: email }, function (err: string, user: object) {
      if (err) {
        res.json({
          error: err,
        });
      }

      if (user) {
        res.json({
          exists: true,
        });
      } else {
        User.create({
          email: email,
          password: hashedPassword,
        });

        res.json({
          exists: false,
        });
      }
    });
  }
);

router.get("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, function (err: string, user: User) {
    if (err) {
      res.json({
        user: err,
      });
    }

    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (match) {
        const token = jwt.sign(
          { email: user.email },
          'subscriptionapp',
          {
            expiresIn: 360000,
          }
        );

        res.json({ user, token });
      } else {
        res.json({ user: "Password did not match!" });
      }
    } else {
      res.json({
        user: "User does not exist",
      });
    }
  });
});

router.get('/authorize', handleAuthentication, (req,res)=>{

  let token=req.headers['authorization']
  const {email, password} =req.body
  token=token?.split(' ')[1]
  res.json({
    token, email, password
  })
  

})

export default router;
