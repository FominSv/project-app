const express = require('express');
const cartRoutes = express.Router();

let AdvancedCart = require('../models/AdvancedCart');
let Product = require('../models/Product');



function getProd(productId, globalProducts) {
  for (let i = 0; i < globalProducts.length; i++) {
    let elementObject = globalProducts[i].toObject();
    if (productId === elementObject._id.toString()) {
      return elementObject;
    }
  };
  console.log('Didnt found necessary prod');
  return {};
};


cartRoutes.route('/').get(function (req, res) {
  console.log('cartRoutes log: Getting all produts in Cart');
  cartProducts = [];
  AdvancedCart.find(function (err, products){
    if(err){
      console.log('cartRoutes log: Cart.find error...');
      console.log(err);
    }
    else {
      Product.find(function (prodFinderr, globalProducts){
        if(prodFinderr){
          console.log('cartRoutes log: Product.find error...');
          console.log(err);
        }
        else {
          products.forEach(element => {
            let elementObject = element.toObject();
            console.log('Finding product with id: ' + elementObject.ProductId);
            var prod = getProd(elementObject.ProductId, globalProducts);
            prod.ProductQuantity = elementObject.ProductQty;
            cartProducts.push(prod);
          });
          console.log('\n\n\ncartRoutes log: Printing cart products: ');
          console.log(cartProducts);
          res.json(cartProducts);
        }
      });
    }
  });
});


cartRoutes.route('/updateCart2').post(function(req, res) {
  console.log('updateCart2: Trying to update/add product in cart:');
  let advancedCart = new AdvancedCart({userId: 12345, ProductId: req.body.ProductId, ProductQty: req.body.ProductQty});

  console.log('Advanced Cart Product id: ' + advancedCart.ProductId);
  console.log('Advanced Cart Product quantity: ' + advancedCart.ProductQty);

  const advancedCartObject = advancedCart.toObject();
  delete advancedCartObject._id;

  AdvancedCart.updateOne({ProductId: req.body.ProductId}, advancedCartObject, {upsert: true})
  .then(result => {
    console.log(result);
    if(result.n > 0) {
      console.log('updateCart2: Product inside cart has been updated succesfully');
      res.status(200).json({'carts': 'New order'});
    }
  })
  .catch(error => {
    console.log("updateCart2: Updating product Error: " + error);
    res.status(400).send("unable to save to database");
  });
});



cartRoutes.route('/deleteCart/:id').get(function (req, res) {
  console.log('deleteCart server: Trying to delete Cart Product with id: ' + req.params.id);
  AdvancedCart.findOneAndRemove({ProductId: req.params.id}, function(err, product){
      if(err) {
        console.log('deleteCart log: Error deleting item from cart: ' + err);
        res.json(err);
      } else {
        res.json('Successfully removed');
      }
  });
});



module.exports = cartRoutes;

