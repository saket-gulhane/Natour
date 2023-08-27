const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! ⚠️  Shutting down!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}.local`,
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const app = require('./app');

mongoose
  // to connect local DB
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! ⚠️  Shutting down!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
