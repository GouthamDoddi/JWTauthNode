const pool = require('./connectDB');

async function insertUser (userdata) {
    const query = {
        text: `INSERT INTO  "user"(user_id, user_name, mobile_no,
             email, password, last_updated) VALUES($1, $2, $3, $4, $5, $6)`,

        values: [
            userdata.userId,
            userdata.userName,
            userdata.mobileNo,
            userdata.email,
            userdata.password,
            userdata.lastUpdated,
        ],
    };
    // the above query object contains the sql query and it's values
    // the values are passed trough the fuction parameter

    try {
        const response = await pool.query(query);

        return response;
    } catch (e) {
        const response = e;

        return response;
    }
    // using try catch as it reduces side effects copared to
    // promise. We return the response which could be either
    // sucess message or error
}

module.exports = insertUser;
