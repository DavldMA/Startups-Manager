import { FastifyInstance } from 'fastify';
import general from '../controllers/general';
import favorito from '../controllers/favoritos';

export default function favoritosRoutes(server: FastifyInstance) {
    server.get('/utilizadores/:id_utilizador/favoritos', { preHandler: general.isUserAuthorizedToTakeAction }, async (request, reply) => {
        return await general.getFromTable("Favoritos", (request.params as any).id_utilizador, "id_utilizador");
    });

    server.post('/utilizadores/:id_utilizador/favoritos/:id_startup', { preHandler: general.isUserAuthorizedToTakeAction }, async (request, reply) => {
        return await general.addToTable((request.params as any), "Favoritos");
    });

    server.delete('/utilizadores/:id_utilizador/favoritos/:id_startup', { preHandler: general.isUserAuthorizedToTakeAction }, async (request, reply) => {
        return await favorito.deleteFromTable(request);
    });
}
