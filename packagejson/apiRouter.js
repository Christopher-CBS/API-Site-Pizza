// Imports //
var express = require("express");
var pizzaCtrl = require("./Route/pizzaCtrl");
var usersCtrl = require("./Route/usersCtrl");

//Router

exports.router = (function() {
  var apiRouter = express.Router();

  //Pizza routes
   apiRouter.route('/pizzas/add/').post(pizzaCtrl.addPizza);
   apiRouter.route('/pizzas/getPizza/').get(pizzaCtrl.getPizza);
   apiRouter.route('/pizzas/updatePizza/').put(pizzaCtrl.updatePizza);
   apiRouter.route('/pizzas/deletePizza/').delete(pizzaCtrl.deletePizza);
   apiRouter.route('/pizzas/getAllPizza/').get(pizzaCtrl.getAllPizza);
   apiRouter.route('/users/register/').post(usersCtrl.addRegister);
   
   
  return apiRouter;
})();




