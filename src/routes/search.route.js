import SearchController from '../controllers/searchController';

const express = require('express');

const router = express.Router();

console.log(SearchController);
router.get('/', SearchController.returnClosestMatches);

module.exports = router;
