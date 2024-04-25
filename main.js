const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {sequelize} = require('./database/models/');
sequelize.sync({force : false});

const reviewRouter = require('./routers/reviewRouter.js');

app.use('/db/review', reviewRouter);

app.listen(port, () => {
  console.log(`Review DB app listening on port ${port}`)
})