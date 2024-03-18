import { FastifyInstance } from 'fastify';
import general from '../controllers/general';
import user from '../controllers/user';

export default function userRoutes(server: FastifyInstance) {
    server.get('/utilizadores', async (request, reply) => {
        return await general.getAllFromTable("Utilizador");
    });

    server.get('/profile', { preHandler: general.authenticateTokenVerifier }, async (request, reply) => {
        return await user.profile(request, reply)
    });

    server.post('/login', async (request, reply) => {
        return await user.login(request, reply);
    });

    server.post('/register', async (request, reply) => {
        return await user.register(request, reply);
    });
}
