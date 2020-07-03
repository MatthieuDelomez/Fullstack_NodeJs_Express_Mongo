const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.post('/', auth, multer, stuffCtrl.createThing);

  
router.put('/:id', auth, multer, stuffCtrl.modifieStuff);

  
router.delete('/:id', auth, multer, stuffCtrl.deleteStuff);

  
router.get('/:id', auth, stuffCtrl.getOneStuff);

  
router.get('/', auth, stuffCtrl.getAllStuff);



module.exports = router;
