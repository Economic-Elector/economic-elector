const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get all candidates
router.get('/all', (req, res) => {
    const query = "SELECT * FROM candidates"
    pool.query(query)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("Error in cadidate.router GET function", error);
        res.sendStatus(500);
    });
});

//get a specific candidate. so admin can edit it
router.get('/:candidate_id', (req, res) => {
    const query = `SELECT * FROM candidates WHERE id = ${req.params.candidate_id}`
    pool.query(query)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("Error in cadidate.router GET function", error);
        res.sendStatus(500);
    });
});

// post for admin to add a candidate 
router.post('/', (req, res) => {
    const query = "INSERT INTO candidates (election_id, name, running_for, email, incumbent) VALUES ($1, $2, $3, $4, $5)"
    values = [req.params.election_id, req.body.name, req.body.running_for, req.body.email, req.body.incumbent]
    pool.query(query, values)
    .then((result) => {
        res.sendStatus (200);
    }).catch((error) => {
        console.log("Error in cadidate.router POST function", error);
        res.sendStatus(500);
    })
});

module.exports = router;