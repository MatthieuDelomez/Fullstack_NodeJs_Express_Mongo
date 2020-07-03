const mongoose = require('mongoose');

/**
 * Classe de structure des données
 */
const objetSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    imageUrl: {type: String, require: true},
    userId: {type: String, require: true},
    price: {type: Number, require: true},
});

module.exports = mongoose.model('Objet', objetSchema);