const express = require('express');
const CountryController = require('../controller/CountryController');

const router = express.Router();

router.post('/create-country', CountryController.createCountry);
router.get('find-country-by-id/:id',CountryController.findCountryById);
router.get('find-all-countries',CountryController.findAllCountries);
router.put('update-country/:id',CountryController.updateCountry);
router.delete('delete-country/:id',CountryController.deleteCountryById);

module.exports = router;