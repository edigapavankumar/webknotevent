
const express = require('express');
const { connectMongoDB } = require('./config/db.config');
const app = express();
const cookieParser = require('cookie-parser');
require("dotenv").config();

connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users",require("./routes/user-route"));
app.use("/api/events",require("./routes/event-route"));
const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})