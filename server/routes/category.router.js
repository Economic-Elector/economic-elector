//this router will be for adding and removing categories from an election
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

});

/**
 * POST route template
 */
router.post('/add/:election_id', (req, res) => {
    console.log(req.body, req.params.election_id);
    ; (async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryText = `INSERT INTO "budget_categories"("name", "past_allocation", "election_id")
                            VALUES ($1, $2, ${req.params.election_id}) RETURNING id`;;
            let results = await client.query(queryText, [req.body.name, req.body.amount]);
            let budget_category_id = results.rows[0].id;
            let candidates = req.body.candidates
            for (let i = 0; i < candidates.length; i++) {
               queryText = `INSERT INTO "budget_allocation" ("candidate_id", "budget_category_id", "amount")
                            VALUES ($1, $2, 0)`
                await client.query(queryText, [candidates[i].id, budget_category_id])
           } 
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

router.delete('/delete/:election_id', (req, res) =>{
    console.log(req.body);
    // ; (async () => {
    //     const client = await pool.connect()
    //     try {
    //         await client.query('BEGIN')
    //         let queryText = `INSERT INTO "budget_categories"("name", "past_allocation", "election_id")
    //                         VALUES ($1, $2, ${req.params.election_id}) RETURNING id`;;
    //         let results = await client.query(queryText, [req.body.name, req.body.amount]);
    //         let budget_category_id = results.rows[0].id;
    //         let candidates = req.body.candidates
    //         for (let i = 0; i < candidates.length; i++) {
    //             queryText = `INSERT INTO "budget_allocation" ("candidate_id", "budget_category_id", "amount")
    //                         VALUES ($1, $2, 0)`
    //             await client.query(queryText, [candidates[i].id, budget_category_id])
    //         }
    //         await client.query('COMMIT')
    //     } catch (error) {
    //         await client.query('ROLLBACK')
    //         throw error
    //     } finally {
    //         res.sendStatus(200)
    //         //must release the client at the end
    //         //or else the client will remain unavailable if you
    //         //want to use it again?
    //         client.release()
    //     }
    // })().catch(e => console.error(e.stack))
})
module.exports = router;