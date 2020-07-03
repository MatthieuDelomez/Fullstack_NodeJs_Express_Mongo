const Objet = require('../models/Objet');
const fs = require('fs');

/**
 * Middleware pour la methode post
 * qui va nous servir a enregistrer un objet
 */
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const objet = new Objet({
      ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    objet.save() // La méthode save renvoie une Promise que nous devons retourner et catch
    .then(()=> res.status(201).json({message:  'Objet enregistré !'}))
    .catch(() => res.status(400).json({error}));
  };


  /**
   * Méthode qui va servir à modifier un objet
   */
  exports.modifieStuff = (req, res, next) => {
      /**
       * on crée un objet thingObject qui regarde si req.file existe ou non.
       * S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant.
       * On crée ensuite une instance Thing à partir de thingObject , puis on effectue la modification.
       */
      const thingObject = req.file ?
          {
            ...JSON.parse(req.body.thing),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : {...req.body};
    // Recup du corp de la requête pour la soumettre avec le comparateur
    //Ancien objet comparé avec le nouvel objet
    Objet.updateOne({ _id : req.params.id}, {...req.body, _id: req.params.id}) 
      .then(() => res.status(200).json({message: 'Objet a bien été modifié !'}))
      .catch(error => res.status(400).json({error}));
  };


  /**
   * Middleware qui va nous permettre de supprimer un objet
   */
exports.deleteStuff = (req, res, next) => {
    Objet.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Objet.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

  /**
   * Route dynamique qui va nous permettre d'intéragir avec la base
   * en fonction de l'objet choisi
   */
  exports.getOneStuff = (req, res, next) => {
    Objet.findOne({_id: req.params.id})
    .then(objet => res.status(200).json( objet ))
    .catch(error => res.status(404).json({ error }));
};


/**
   * Méthode middleware GET pour afficher les Objets JSON
   */
exports.getAllStuff = (req, res, next) => {
    Objet.find()
    .then(objets => res.status(200).json( objets )) //Le tableau d'objet prend le nom du model au pluriel !
    .catch(error => res.status(400).json({ error }));
     
 };