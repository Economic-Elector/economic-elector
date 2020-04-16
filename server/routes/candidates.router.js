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
        console.log("Error in candidate.router GET function", error);
        res.sendStatus(500);
    });
});
//get all budget allocations from each candidate
router.get('/allBudgets/:election_id', (req, res) => {
    const query = `SELECT DISTINCT budget_allocation.candidate_id, budget_allocation.budget_category_id, budget_allocation.amount 
    FROM budget_allocation 
    JOIN budget_categories ON budget_categories.election_id = 4
    ORDER BY budget_allocation.candidate_id ASC;`
    pool.query(query)
        .then((result) => {            
            let allocations = result.rows;
            console.log(allocations)
            let candidateId = allocations[0].candidate_id
            let candidateAllocations = {};
            let candidateObject = {}
            let amount;
            for(let i =0; i <allocations.length; i++){
                if(allocations[i].candidate_id === candidateId){
                    amount = allocations[i].amount;
                    candidateObject = {
                        ...candidateObject,
                        [allocations[i].budget_category_id]: amount
                    }
                    console.log(candidateObject);
                    candidateAllocations = {
                        ...candidateAllocations,
                        [allocations[i].candidate_id]: candidateObject
                    }
                    
                } else{
                    candidateId = allocations[i].candidate_id;
                    amount = allocations[i].amount;
                    candidateObject = {
                        [allocations[i].budget_category_id]: amount
                    }
                } 
                
            }
            console.log(candidateAllocations);
            res.send(result.rows);
        }).catch((error) => {
            console.log("Error in candidate.router GET allBudgets function", error);
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
        console.log("Error in candidate.router GET function", error);
        res.sendStatus(500);
    });
});

// post for admin to add a candidate 
router.post('/', (req, res) => { 
    //the query returns the candidate_id, so it can be used to make the budget post at /budget
    const query = "INSERT INTO candidates (election_id, name, running_for, email, incumbent) VALUES ($1, $2, $3, $4, $5) RETURNING id"
    values = [req.params.election_id, req.body.name, req.body.running_for, req.body.email, req.body.incumbent]
    pool.query(query, values)
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log("Error in candidate.router POST function", error);
        res.sendStatus(500);
    })
});

//post for admin to add budget for candidate
router.post('/budget', (req, res) => {
    console.log(req.body);
    
    const query = "INSERT INTO budget_allocation (candidate_id, budget_category_id, amount) VALUES ($1, $2, $3)";
    values = [req.body.candidate_id, 1, req.body.amount];
    pool.query(query, values)
    .then((result) => {
        res.sendStatus (200);
    }).catch((error) => {
        console.log("Error in cadidate.router for budget post", error);
        res.sendStatus(500);
    })
});

//i was trying to work on a way to combine these two posts. i'll just leave it here, commented out. doesn't quite work yet.
// router.post('/', (req, res) => { 
//     ;(async () => {
//             const client = await pool.connect()
//             //using transactions to send multiple INSERTS in one post
//             try {
//                 await client.query('BEGIN')
//                 //this query will return the newly created candidate's id
//                 let query = "INSERT INTO candidates (election_id, name, running_for, email, incumbent) VALUES ($1, $2, $3, $4, $5) RETURNING id"
//                 let response = await client.query(query, [1, 'Duncan', 'Chief of Police', '123@gmail.com', false]);
//                 //assign the candidate's id to variable 'candidate_id'
//                 let candidate_id = response.rows[0].id;
//                 console.log(candidate_id, 'this is the canidate id');
//                 let testArray
//                 //[req.params.election_id, req.body.name, req.body.running_for, req.body.email, req.body.incumbent]
//                 query = "INSERT INTO budget_allocation (candidate_id, budget_category_id, amount) VALUES ($1, $2, $3)";
//                 await client.query(query, [candidate_id, 1, 400])
//                 await client.query('COMMIT')
//             } catch (error) {
//                 await client.query('ROLLBACK')
//                 throw error
//             } finally {
//                 res.sendStatus(200)
//                 client.release()
//             }
//         })().catch(e => console.error(e.stack))
//     });

module.exports = router;