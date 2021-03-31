const express = require('express');
// const { route } = require('.');
const router = express.Router();
const koneksi = require('../Controllers/uniController');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await koneksi.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* POST programming lenguage */
router.post('/', async function(req, res, next) {
  try {
    res.json(await koneksi.create(req.body));
  } catch (err) {
    console.error(`Error post`, err.message);
    next(err);
  }

});

/**
 * PUT programming language
 */

router.put('/:id', async function (req, res, next) {

  try {
    res.json(await koneksi.update(req.params.id, req.body));
  } catch(err) {
    console.error(`Error Update`, err.message);
    next(err);
  }

});

router.delete('/:id', async function(req, res, next) {

  try {
     res.json(await koneksi.remove(req.params.id));
  } catch (err) {
    console.error(`Error delete`, err.message);
    next(err)
  }

});

module.exports = router;