var express = require('express');
var router = express.Router();
var optionsController = require('../controllers/options_controller');
var requireAuth = require('../middleware/requireAuth');

router.get('/categories', requireAuth, optionsController.getCategories);
router.get('/PaymentMethods', requireAuth, optionsController.getPaymentMethod);

module.exports = router;