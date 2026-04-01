import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import userRolesRouter from './routes/userRoles.js';
import profilesRouter from './routes/profiles.js';
import membersRouter from './routes/members.js';
import convertsRouter from './routes/converts.js';
import mediaRouter from './routes/media.js';
import visitorsRouter from './routes/visitors.js';
import meetingsRouter from './routes/meetings.js';
import convertEventsRouter from './routes/convertEvents.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/user_roles', userRolesRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/members', membersRouter);
app.use('/api/converts', convertsRouter);
app.use('/api/media', mediaRouter);
app.use('/api/visitors', visitorsRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/convert_events', convertEventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
res.status(404).json({
    message: `A rota '${req.originalUrl}' não foi encontrada.`
  });
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: res.locals.error
    })  ;
});

export default app;
