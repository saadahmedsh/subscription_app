import { Router } from "express";
import User from "../schema/user";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const router = Router();

const handleAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];
  token = token?.split(" ")[1];
  try {
    jwt.verify(token as string, "subscriptionapp");
    next();
  } catch (error) {
    res.send(error);
  }
};

router.post(
  "/register",

  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters"),

  (req, res) => {
    // validation checks
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });

      return res.send(errors);
    }

    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.findOne({ email: email }, function (err: string, user: object) {
      if (err) {
        res.json([{
          msg: err
        }]);
      }

      if (user) {
        res.json([{
          msg: "Email already in use",
        }]);
      } else {
        User.create({
          email: email,
          password: hashedPassword,
        });

        res.json([{
          msg: 'Success',
        }]);
      }
    });
  }
);

router.post("/login", (req, res) => {
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
        const token = jwt.sign({ email: user.email }, "subscriptionapp", {
          expiresIn: 360000,
        });

        res.json([{msg:'success', user, token }]);
      } else {
        res.json([{ user: null, token:null, msg:'Password did not match' }]);
      }
    } else {
      res.json([{ user: null, token:null, msg:'User does not exist' }]);
    }
  });
});

router.get("/authorize", handleAuthentication, (req, res) => {
  let token = req.headers["authorization"];
  const { email, password } = req.body;
  token = token?.split(" ")[1];
  res.json({
    token,
    email,
    password,
  });
});

export default router;
