require('dotenv').config();
const express = require('express');
const authRouter = require("./routes/authRouter");
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(express.json());

app.use(globalErrorHandler);

app.use('api/v1/auth', authRouter);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});