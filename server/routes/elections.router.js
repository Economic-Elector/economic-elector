const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    pool.query('SELECT * FROM "elections";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in /all GET', error)
        res.sendStatus(500);
    })
});


router.get('/:election_id', (req, res) => {
    const queryText = 'SELECT * FROM "elections" where "election_id" = $1;'
    pool.query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch(() => res.sendStatus(500));
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const queryText = 'INSERT INTO "elections" (name, date, location) VALUES($1, $2, $3)'
    pool.query(queryText, [req.body.name, req.body.date, req.body.location])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.get('/budget/:id', (req, res) => {
    const queryText = `SELECT * FROM "budget_categories" WHERE "elections_id" = $1;`
    pool.query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
        console.log('Error completing GET query', err);
        res.sendStatus(500);
      });
});

module.exports = router;