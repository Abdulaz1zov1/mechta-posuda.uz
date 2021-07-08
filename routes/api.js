const express = require('express');
const router = express.Router();
const commentRouter = require('./comment')
const authRouter = require('./auth')
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./order')
const searchRouter = require('./search');
const statisticsRouter = require('./statistic');
const regionController = require('./region');
const app = express();


app.use('/', authRouter);
app.use('/', categoryRouter);
app.use('/', productRouter);
app.use('/',orderRouter);
app.use('/',searchRouter);
app.use('/',statisticsRouter);
app.use('/',commentRouter);
app.use('/',regionController);
module.exports = app;
