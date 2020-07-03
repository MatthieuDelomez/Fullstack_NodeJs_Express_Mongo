/***************************************
 * COMPRENDRE LES BASES DU CRUD AVEC NODEJS
 * 
  create (création de ressources) ;

  read (lecture de ressources) ;

  update (modification de ressources) ;

  delete (suppression de ressources).

 *************************************/


const express = require("express");//Déployer API de façon plus rapide
const bodyParser = require("body-parser"); // recuperer methode post
const mongoose = require("mongoose");
const path = require('path');

const Objet = require('./models/Objet');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

/**
 * Connexion a la base MongoDB
 */
    mongoose.connect('mongodb+srv://MarkoMetro:password@cluster0-9ynco.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/**
 * Autorisation pour envoyer des requêtes
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  /**
   * Méthode middleware pour créer notre nouvel objet
   */
  app.use(bodyParser.json());

/**
 * Gérer l'importation d'images au niveau de la requête
 */
app.use('/images', express.static(path.join(__dirname, 'images')));

  /**
   * Appel de la route pour centraliser url
   */
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);



module.exports = app;