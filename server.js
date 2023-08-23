const dotenv = require('dotenv');
dotenv.config({ path: './.env.development.local' });

const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.....`);
});
