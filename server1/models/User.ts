import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  age: number;
  gender: "male" | "female";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      unique: true,
      maxLength: [30, "Your username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    gender: {
      type: String,
      required: [true, "Please enter your gender"],
      enum: {
        values: ["male", "female"],
        message: "Please select appropriate gender",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
