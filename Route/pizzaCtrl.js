var models = require('../models');
var asyncLib = require('async');


// Constants //


// Routes //
module.exports = {

	addPizza : (req, res) => {
        var ingredient = req.body.ingredient;
        var prix = req.body.prix;
        var nom = req.body.nom;

        asyncLib.waterfall([
            (done) => {            
                models.Pizza.findOne({
                    attributes: ['nom'],
                    where: { nom: nom }
                  })
                  .then((pizzaFound) => {
                    done(null, pizzaFound);
                  })
                  .catch((err) => {
                      console.log(err)
                    return res.status(500).json({ 'error': 'unable to verify pizza' });
                  });
              },
              (pizzaFound, done) => {
                if (!pizzaFound) {
                      done(null, pizzaFound);
                } else {
                    return res.status(409).json({ 'error': 'pizza already exists'});
                }
            },
            (pizzaFound, done) => {
                var newPizza = models.Pizza.create({
                    nom : nom,
                    ingredient : ingredient,
                    prix : prix,

                })
                .then((newPizza) => {
                  done(newPizza);
                })
                .catch((err) => {
                    console.log(err, 'iciiiiiii')
                  return res.status(500).json({ 'error': 'cannot add Pizza' });
                });
              }
            ], (newPizza) => {
                if (newPizza) {
                  return res.status(201).json({
                    'id': newPizza.id,
                    'message': 'Pizza successfully created',
                  });
                } else {
                console.log(err, 'laaaaaaa')
                  return res.status(500).json({ 'error': 'cannot add Pizza' });
                }
            });
    },
getPizza: (req, res) => {
  models.Pizza.findOne({
      attributes: [ 'id', 'nom', 'prix', 'ingredient' ],
      where: { id: req.query.id }
  }).then((pizzaFound) => {
      if (pizzaFound) {
        res.status(201).json(pizzaFound);
      } else {
        res.status(404).json({ 'error': 'pizza not found' });
      }
  }).catch((err) => {
      console.log(err)
      res.status(500).json({ 'error': 'cannot fetch pizza' });
  });
},
deletePizza: (req, res) => {


  asyncLib.waterfall([

      (done) => {

          models.Pizza.findOne({

              where : {id: req.query.id}

          })

          .then((pizzaFound) => {

              done(null, pizzaFound);

          })

          .catch(function(err) {

              return res.status(500).json({ 'error' : 'unable to verify pizza'});

          });

      },

      (pizzaFound, done) => {

          if(pizzaFound){

              pizzaFound.destroy({

              })

              .then((pizzaFound) => {

                  done(null, pizzaFound);

              })

              .catch((err) => {

                console.log(err)

                  return res.status(500).json({ 'error' : 'unable to destroy pizza'});

              });

          } else {

              res.status(404).json({ 'error' : 'pizza not found'});

          }

      }

  ],

  (pizzaFound) => {

      if(!pizzaFound){

          return res.status(200).json({ 'message' : 'pizza successfully deleted'});

      } else {

          return res.status(500).json({ 'error' : 'cannot delete pizza'});

      }

  });

},

updatePizza: (req, res) => {
 
  var ingredient = req.body.ingredient;
  var prix = req.body.prix;
  var nom = req.body.nom;
  

  asyncLib.waterfall([
    (done) => {
      models.Pizza.findOne({
        attributes: ['id', 'nom', 'prix', 'ingredient'],
        where: { id: req.query.id }
      }).then((pizzaFound) => {
        done(null, pizzaFound);
      })
      .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify pizza' });
      });
    },
    (pizzaFound, done) => {
      if(pizzaFound) {
        pizzaFound.update({
          nom: (nom ? nom : pizzaFound.nom),
          prix: (prix ? prix : pizzaFound.prix),
          ingredient: (ingredient ? ingredient : pizzaFound.ingredient)
        }).then(() => {
          done(pizzaFound);
        }).catch((err) =>{
          res.status(500).json({ 'error': 'cannot update pizza' });
        });
      } else {
        res.status(404).json({ 'error': 'pizza not found' });
      }
    },
  ], (pizzaFound) => {
    if (pizzaFound) {
      return res.status(201).json(pizzaFound);
    } else {
      return res.status(500).json({ 'error': 'cannot update pizza' });
    }
  });
},

getAllPizza: (req, res) => {
        
  models.Pizza.findAll({
      attributes: [ 'id','nom', 'prix', 'ingredient' ]
  }).then((pizzaFound) => {
      if (pizzaFound) {
        res.status(201).json(pizzaFound);
      } else {
        res.status(404).json({ 'error': 'pizza not found' });
      }
  }).catch((err) => {
      console.log(err)
      res.status(500).json({ 'error': 'cannot fetch pizza' });
  });
},


}




