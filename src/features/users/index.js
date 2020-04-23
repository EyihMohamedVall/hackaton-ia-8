const router = require('express').Router();

const { endpoints } = require('./constant');

const { getUser, getUserRecommendations } = require('./controllers');

router.get(endpoints.GET_USER, getUser);

router.get(endpoints.GET_USER_RECOMMENDATIONS, getUserRecommendations);

module.exports = router;
