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
    console.log('getting election,', req.params.election_id);
    
    const queryText = `SELECT * FROM elections WHERE id = ${req.params.election_id};`
    pool.query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log('Error completing GET query', err);
            res.sendStatus(500);
        });
});

router.post('/newElection', (req, res) => {
    console.log(req.body);
    let id = 0;
    const queryText = 'INSERT INTO "elections" (name, date, location) VALUES($1, $2, $3) RETURNING *'
    pool.query(queryText, [req.body.office, req.body.date, req.body.location])
        .then(result => {
            res.send(result);
            // console.log('this is election result.rows[0].id', result.rows[0].id);
            id = result.rows[0].id;
            const queryTextTwo = `INSERT INTO "budget_categories" ("name", "past_allocation", "election_id") VALUES
                ('Parks and Rec', $1, ${id}),
                ('Law Enforcement', $2, ${id}),
                ('Education', $3, ${id}),
                ('First Responders', $4, ${id}),
                ('Public Works', $5, ${id}),
                ('Administration', $6, ${id}),
                ('Community Development', $7, ${id})`;
            pool.query(queryTextTwo, [req.body.parksRec, req.body.lawEnforcement, req.body.education, req.body.firstResponders,
            req.body.publicWorks, req.body.administration, req.body.communityDev])
        })
        .catch((err) => {
            console.log('Error completing INSERT query', err);
            res.sendStatus(500);
        });
    });

router.get('/budget/:id', (req, res) => {
    const queryText = `SELECT * FROM "budget_categories" WHERE "election_id" = $1;`
    pool.query(queryText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
        console.log('Error completing GET query', err);
        res.sendStatus(500);
      });
});

router.delete('/deleteElection/:id', (req, res) => {

    console.log('in deleteElection, req.params.id', req.params.id);

    ; (async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryText = 'DELETE FROM "budget_categories" WHERE election_id=$1';
            await client.query(queryText, [req.params.id]);
            queryText = 'DELETE FROM "elections" WHERE id=$1';
            await client.query(queryText, [req.params.id]);
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            res.sendStatus(200)
            //must release the client at the end
            //or else the client will remain unavailable if you
            //want to use it again?
            client.release()
        }
    })().catch(e => console.error(e.stack))
});

module.exports = router;