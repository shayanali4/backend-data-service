import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import data from '../data.js'


const userRouter = express.Router();

userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send({ users });    
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id);
    console.log("user==>",user)
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not Found' });
    }
}));

// userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
   
// }));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log("user",user)
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                bio: user.bio,
                accessLevel: user.accessLevel,
                token: generateToken(user),
            });
        return;
        }
    }
    res.status(401).send({
        message: 'Invalid email or password'});
    })
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        bio: req.body.bio,
        accessLevel: req.body.accessLevel
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        bio: createdUser.bio,
        accessLevel: createdUser.accessLevel,
        token: generateToken(createdUser),
    });
}));

userRouter.put('/update/:id', expressAsyncHandler(async (req, res) => { 
    User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        User.findOne({ _id: req.params.id }).then(function (updatedUser) {
            res.send(updatedUser);
        }).catch(() => {
            res.send({ message: 'User not Updated' });
        });
    }).catch(() => {
        res.send({ message: 'User not Found' });
    });
}));

userRouter.delete('/delete/:id', expressAsyncHandler(async (req, res) => { 
    User.findByIdAndDelete({ _id: req.params.id }).then(function () {
        res.status(200).send({
        message: 'User Deleted'});
    }).catch(() => {
        res.status(400).send({ message: 'User not Found' });
    });
}));

export default userRouter;