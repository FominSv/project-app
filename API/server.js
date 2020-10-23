
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');
config = require('./DB');
cors = require('cors');
const path = require('path')

const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Svetik:Sv5335970Mx@cluster0.ydzjy.mongodb.net/MyProduct?retryWrites=true&w=majority",
   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/products', productRoute);
app.use('/carts', cartRoute);

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log('Listening to port ' + port);
});

if (process.env.NODE_ENV === "production") {
 app.use(express.static(__dirname + './../dist/myProject'));  
 app.all('*', (req, res) => {  
 res.status(200).sendFile(path.resolve(__dirname + './../dist/myProject/index.html'));  
  });  
}

 
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });
