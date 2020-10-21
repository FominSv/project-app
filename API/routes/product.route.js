const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../models/Product');




productRoutes.route('/').get(function (req, res) {
  Product.find(function (err, products){
    if(err){
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});


productRoutes.route('/get/:id').get((req, res)=>{
  let id = req.params.id;
  Product.findById(id, (err, myGetById)=>{
      if(err) return next(err);
      res.json(myGetById);
  });
});


productRoutes.route('/add').post(function(req, res) {
  
  let product = new Product(req.body);
      product.save()
    .then(prod => {
      res.status(200).json({'products': 'Product has been added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


productRoutes.route('/edit/:id' ).get(function (req, res) {
  let id = req.params.id;
  Product.findById(id, function (err, product){
    if(err) return next(err);
    res.json(product);
  });
});


productRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  Product.findById(req.params.id, function(err, product) {
    if (!product)
      res.status(404).send("Record not found");
    else {
      product.ProductName = req.body.ProductName;
      product.ProductDescription = req.body.ProductDescription;
      product.ProductPrice = req.body.ProductPrice;
      product.ProductImage = req.body.ProductImage;
      
      product.save().then(product => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});



productRoutes.route('/delete/:id').get(function (req, res) {
    Product.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});





module.exports = productRoutes;