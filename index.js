const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require('body-parser')
const database = require("./connection/connect");
const addUserRouter = require('./routes/addUserRouter')
const loginRouter = require('./routes/loginRouter')
const rankingRouter = require("./routes/rankingRouter")
const modifyPointsRouter = require('./routes/modifyPointsRouter')

app.use(cors({origin:true,credentials:true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/register',addUserRouter)
app.use('/login',loginRouter)
app.use('/ranking',rankingRouter)
app.use('/points',modifyPointsRouter)

app.listen(port, () => console.log(`I'm listening to port ${port}!`));

module.exports = app;