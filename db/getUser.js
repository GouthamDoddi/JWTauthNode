const pool = require('./connectDB');

async function getUser (username) {
    // the parameter has userId of the user we want to
    // select
    const query = {
        name: 'fetch-user',
        text: 'SELECT * FROM "user" WHERE user_name = $1 ',
        values: [ username ],
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
