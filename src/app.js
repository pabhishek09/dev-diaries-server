import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './routes/index';
import errorResponses from './common/errorResponses';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('open', () => console.log('Db connection is active'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions =
  process.env.NODE_ENV === 'prod' ? { origin: 'https://dev-diaries.netlify.com' } : {};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(errorResponses.NotFound);
// });

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  console.log('Error Handler');
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(err.status || 500).send('Something broke!');
});

export default app;
