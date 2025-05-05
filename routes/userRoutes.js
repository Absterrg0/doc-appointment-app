const express = require('express');
const { loginController, registeController, authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router exports
const router = express.Router();

//routes
//login || POST
router.post('/login', loginController);

//registe || POST
router.post('/register', registeController);

//Auth || POST
router.post('/getUserData', authMiddleware, authController);


module.exports = router;