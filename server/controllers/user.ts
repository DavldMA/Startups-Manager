import query from "../db/connection"
import general from "./general"
import server from "../index"
import bcrypt from "bcrypt";



async function login(request:any, reply: any) {
    const { username, password } = request.headers as any;

    try {
        const userSearch: any = await general.getFromTable("Utilizador", `"${username}"`, "username");
        if (Object.keys(userSearch).length === 0) {
            return reply.status(401).send({ message: 'Usuário não encontrado' });
        }

        const result: any = await verifyCredentials(username, password);
        if (Object.keys(result).length === 0) {
            return reply.status(401).send({ message: 'Senha incorreta' });
        }

        const token = server.jwt.sign({ id: result[0].id, username: result[0].username, role: result[0].role})
        

        reply.send({ token })
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Erro ao fazer login' });
    }
}

async function register(request: any, reply: any) {
    try {
        const { username, password } = (request.headers as any);
        let userSearch: any =  await general.getFromTable("Utilizador", `"${username}"`, "username");
        if (Object.keys(userSearch).length !== 0) return reply.status(401).send({ message: 'Username já em uso' });
        const hashedPassword = await bcrypt.hash(password, 10);
        (request.headers as any).password = hashedPassword;
        return await general.addToTable((request.headers as string), "Utilizador");
    } catch (err) {
        console.log(err);
    }
}

async function verifyCredentials(username:string, password: string) {
    try {
        let values = []
        values.push(username)
        let sql = `SELECT * FROM Utilizador where username = ?`;
        const result: any = await query(sql, values);
        if (result.length === 0) {
            return [];
        }

        const match = await bcrypt.compare(password, result[0].password);
        if (!match) {
            return [];
        }

        return result;
    } catch (err) {
        console.log(err);
    }
}

async function profile(request: any, reply: any) {
    try {
        const decoded: any = server.jwt.verify((request.headers as any).token)
        return await general.getFromTable("Utilizador", decoded.id);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Erro ao buscar perfil do usuário' });
    }
}

const functions = {
    register,
    login,
    profile
}

export default functions;