const { Pool } = require('pg');

const { credentials } = require('./connectDB');

const pool = new Pool(credentials);


async function getUser (userId) {
    // the parameter has userId of the user we want to
    // select
    const query = {
        name: 'fetch-user',
        text: 'SELECT * FROM nodeapp.user WHERE user_id = $1',
        values: [ userId ],
    };
    // name is a name given to the query. I can be anything
    // you want it to be

    try {
        const result = await pool.query(query);

        return result;
    } catch (error) {
        const result = error;

        return result;
    }
    // using try catch we return the response of the query which
    // could be the response from the sql query or error
}

module.exports = getUser;
