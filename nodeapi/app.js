const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// db connection
// mongodb+srv://priyalulla:pD4VmV8YREtOXiZi@cluster0.efkop.mongodb.net/nodeapi?retryWrites=true&w=majority
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// apiDocs
app.get('/api', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use("/api",postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

//app.use(myOwnMiddleWare); >> IF YOU WANT TO USE YOUR OWN MIDDLEWARE

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
