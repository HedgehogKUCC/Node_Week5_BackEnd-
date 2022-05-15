const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(
    {
        path: './config.env',
    }
)

mongoose
    .connect(process.env.MongoDB)
    .then(() => console.log('mongodb is connecting...'))
    .catch((err) => console.log(err.message));
