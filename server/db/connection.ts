import * as mysql from 'mysql2';
import db from "../config/db_config"

const connection = {
    host: db.HOST,
    database: db.DB,
    user: db.USER,
    password: db.PASSWORD
};

export default async function query(sql: string, values: (number|string|undefined)[] = []) {
    var con = mysql.createConnection(connection);
    con.connect();
    let promise = new Promise((resolve, reject) => {
        con.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        
    });
    con.end();
    return promise;
}