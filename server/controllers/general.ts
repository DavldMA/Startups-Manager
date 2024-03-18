import query from "../db/connection"
import server from "../index"

async function getAllFromTable(table: string) {
    try {
        let sql = `SELECT * FROM ${table}`;
        return await query(sql);
    } catch (err) {
        console.log(err);
    }
}


async function getFromTable(table: string, id: string | number, param: string = "id") {
    try {
        let sql = `SELECT * FROM ${table} WHERE ${param} = ${id}`;
        return await query(sql);
    } catch (err) {
        console.log(err);
    }
}

async function addToTable(value: string, tableName: string) {
    try {
        const tableColumns: any = {
            Favoritos: ['id_utilizador', 'id_startup'],
            Utilizador: ['username', 'password'],
            Startup: ['nome']
        };
        let valueObj = typeof value === 'string' ? JSON.parse(value) : value;
        const values: any[] = tableColumns[tableName].map((column: any) => valueObj[column]);
        const sql = `INSERT INTO ${tableName} (${tableColumns[tableName].join(', ')}) VALUES (${Array(tableColumns[tableName].length).fill('?').join(', ')})`;
        return await query(sql, values);
    } catch (err) {
        console.log(err);
    }
}

async function deleteFromTable(table: string, id: number) {
    try {
        let sql = `DELETE FROM ${table} WHERE id = ${id}`;
        if (table === 'Startup') {

            const deleteFavoritosSql = `DELETE FROM Favoritos WHERE id_startup = ${id}`;
            await query(deleteFavoritosSql);
        }
        return await query(sql);
    } catch (err) {
        console.log(err);
    }
}

function authenticationHandler(condition: (decoded: any, request: any) => boolean, errorMessage: string) {
    return async (request: any, reply: any) => {
        const token = request.headers.token;
        if (!token) return reply.status(401).send({ message: 'Token não fornecido' });

        try {
            const decoded: any = server.jwt.verify(token);
            if (decoded.id == undefined) return reply.status(401).send({ message: 'Token inválido' });
            if (condition(decoded, request)) {
                return;
            } else {
                return reply.status(403).send({ message: errorMessage });
            }
        } catch (error) {
            console.error(error);
            return reply.status(401).send({ message: 'Token inválido' });
        }
    };
}

const authenticateTokenVerifier = authenticationHandler((decoded: any) => true, 'Token inválido');
const isUserAdmin = authenticationHandler((decoded: any) => decoded.role === "admin", 'Falta de Permissões, tu não és um administrador');
const isUserAuthorizedToTakeAction = authenticationHandler((decoded: any, request: any) => decoded.id == (request.params as any).id_utilizador, 'Falta de Permissões, tu não podes fazer esta ação na sua conta atual');

const functions = {
    getAllFromTable,
    getFromTable,
    deleteFromTable,
    authenticateTokenVerifier,
    isUserAdmin,
    isUserAuthorizedToTakeAction,
    addToTable
}

export default functions;