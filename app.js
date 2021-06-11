const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index.router');
const clientesRouter = require('./routes/clientes.router');
const proveedoresRouter = require('./routes/proveedor.router');
const materialesRouter = require('./routes/materiales.router');
const cotizacionesRouter = require('./routes/cotizaciones.router');





const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(`${__dirname}/public`));


app.use('/', indexRouter);
app.use('/clientes', clientesRouter);
app.use('/proveedores', proveedoresRouter);
app.use('/materiales', materialesRouter);
app.use('/cotizaciones', cotizacionesRouter);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
