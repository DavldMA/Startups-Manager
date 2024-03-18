import query from "../db/connection"

async function deleteFromTable(request: any) {
    let value = (request.params as any);
    return await deleteFromFavorite(value);
}

async function deleteFromFavorite(value: any) {

    try {
        let values = []
        values.push(value.id_startup)
        values.push(value.id_utilizador)
        let sql = `DELETE FROM Favoritos WHERE id_startup = ? and id_utilizador = ?`;
        return await query(sql, values);
    } catch (err) {
        console.log(err);
    }
}

const functions = {
    // addToTable,
    deleteFromTable
}

export default functions;