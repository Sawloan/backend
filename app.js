const express = require('express');
const database = require('./database/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path');
const accountRoute = require('./routes/accountRoute');
const productRoute = require('./routes/productRoute');
const bookingRoute = require('./routes/bookingRoute');
const ratingRoute = require('./routes/ratingRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use('/images', express.static(path.join(__dirname , '/images')));



app.use(accountRoute);
app.use(productRoute);
app.use(bookingRoute);
app.use(ratingRoute);


app.listen(90);