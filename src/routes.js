const { Router } = require('express');
const controller = require('./controllers/controller');

const router = Router();

router.get('/', (req, res) => {
    return res.json({"message":"olar"});
});

router.post('/dev', controller.store)

router.get('/dev', controller.index)
router.get('/search', controller.search)

module.exports = router;