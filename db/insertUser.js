import credentials from './connectDB';
import { Pool } from 'pg';

async function insertUser (userdata) {
    const pool = new Pool(credentials);

    const query = {
        text: `INSERT INTO  user(user, user_id, user_name,
        mobile_no, email, password, last_updated, token_id,
        token_expiry) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,

        values: [ userdata.user,
            userdata.user_id,
            userdata.user_name,
            userdata.mobile_no,
            userdata.email,
            userdata.password,
            userdata.last_updated,
            userdata.token_id,
            userdata.token_expiry ],
    };
    // the above query object contains the sql query and it's values
    // the values are passed trough the fuction parameter

    try {
        const response = await pool.query(query);

        return response;
    } catch (e) {
        const response = e.message;

        return response;
    }
    // using try catch as it reduces side effects copared to
    // promise. We return the response which could be either
    // sucess message or error
}

export default insertUser;
