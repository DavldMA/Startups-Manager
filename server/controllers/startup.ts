import query from "../db/connection"

async function updateTable(request: any) {
    let value = (request.headers as any);
    return await updateStartup(value, (request.params as any).id);
}

async function updateStartup(value: any, id: number) {
    try {
        let values = []
        values.push(value.nome)
        let sql = `UPDATE Startup SET nome = ? WHERE id = ${id}`;
        return await query(sql, values);
    } catch (err) {
        console.log(err);
    }
}

const functions = {
    updateTable
}

export default functions;