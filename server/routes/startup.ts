import { FastifyInstance } from 'fastify';
import general from '../controllers/general';
import startup from '../controllers/startup';

export default function startupRoutes(server: FastifyInstance) {
    server.get('/startups', { preHandler: general.authenticateTokenVerifier }, async (request, reply) => {
        return await general.getAllFromTable("Startup");
    });

    server.get('/startups/:id', { preHandler: general.authenticateTokenVerifier }, async (request, reply) => {
        return await general.getFromTable("Startup", (request.params as any).id);
    });

    server.post('/startups', { preHandler: general.isUserAdmin }, async (request, reply) => {
        return await general.addToTable((request.headers as any), "Startup");
    });

    server.delete('/startups/:id', { preHandler: general.isUserAdmin },async (request, reply) => {
        return await general.deleteFromTable("Startup", (request.params as any).id);
    });

    server.put('/startups/:id', { preHandler: general.isUserAdmin }, async (request, reply) => {
        return await startup.updateTable(request);
    });
}