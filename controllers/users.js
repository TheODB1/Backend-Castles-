import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const signUp = asyncHandler(async (req, res) => {
  const {
    body: { name, email, password },
  } = req;
  // const { name, email, password } = req.body;
  if(!name || !email || !password) throw new ErrorResponse(" Name/Email/Password are required", 400);
  const foundUser = await User.findOne({ email });
  //    console.log(found);
  if (foundUser) throw new ErrorResponse("User already exist", 403);

  const hashPassword = await bcrypt.hash(password, 5);
  const { _id, name: username } = await User.create({
    name,
    email,
    password: hashPassword,
  });
  //    a new User is created in database by mongoose method: create
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET);
  // const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: 3600});  //token expires in 1 hour
  res.json({token});
});

export const signIn = asyncHandler(async (req, res) => {
    const {
        body: {  email, password },
      } = req;
      // const { email, password } = req.body;
      if( !email || !password) throw new ErrorResponse(" Email/Password are required", 400); //check if email & passsowrd exists
      const foundUser= await User.findOne({ email }).select('+password');  // in the User model the password is not a selectable field by default, meaning a find() won't return it, that's a security measure. Here we are selecting it explicitly because we need it to compare with the one the user sends during login. + adds that field in that particular query.NOT in the entire model.
      if (!foundUser) throw new ErrorResponse("User does not exist", 404);
      const match = await bcrypt.compare(password, foundUser.password);     // check if password is the same. first 'password' is from req,is not hashed.  hash is the hashed password from existing user in database.  the compare method can tell if the hash the user input would generate is equal to the one in the database.
      // console.log(match);
      if (!match) throw new ErrorResponse("Password is not correct", 404);
      // const token = jwt.sign({  _id: foundUser._id, userName: foundUser.name  }, process.env.JWT_SECRET, { expiresIn: 3600}); // token expires in 1 hour
      const token = jwt.sign({  _id: foundUser._id, userName: foundUser.name  }, process.env.JWT_SECRET); // token expires in 1 hour
      res.json({token});
});

export const getUser = asyncHandler(async (req, res) => {
  res.send(req.user);
});


export const updateUser = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body
  } = req;
  const userToUpdate = await User.findById(id);
  if (!userToUpdate)
    throw new ErrorResponse(`User with id of ${id} not found, could not update`, 404);
  // ??  if (user.id !== postToUpdate.author.toString())
  //  ?? throw new ErrorResponse(`Only the author of the post can modify it. Go away`, 403);
  const updatedUser = await User.findOneAndUpdate({ _id: id }, body, { new: true });
  res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const {
      params: { id }
  } = req;
  const meToUpdate = await User.findById(id);
  if (!meToUpdate)
    throw new ErrorResponse(`User with id of ${id} not found, could not update`, 404);
  // ??if (user.id !== postToUpdate.author.toString())
  //  ? throw new ErrorResponse(`Only the author of the post can modify it. Go away`, 403);
  const deleted = await User.findOneAndDelete({ _id: id });
  if (!deleted) throw new ErrorResponse(`User with id of ${id} not found, could not delete`, 404);
  res.json({ success: `User with id of ${id} was deleted` });
});
// export const getUserInfo = asyncHandler(async (req, res) => {
//     res.send(req.user);
//   });
  
//   export const approvedSession = asyncHandler(async (req, res) => {
//     res.json({ success: 'Valid token' });
//   });