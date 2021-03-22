import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js'

dotenv.config();

const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
console.log("process", process.env.COLLECTION)
mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@cluster0.gwgp8.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch(error => console.log("MongoDB Error : ", error));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next)=> {
    res.status(500).send({message:err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});