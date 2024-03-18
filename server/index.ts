import fastify from 'fastify';
import startupRoutes from './routes/startup';
import userRoutes from './routes/user';
import favoritosRoutes from './routes/favoritos';
import jwt, { FastifyJwtNamespace } from '@fastify/jwt'
import cors from '@fastify/cors'
import { METHODS } from 'http';


declare module 'fastify' {
    interface FastifyInstance extends 
    FastifyJwtNamespace<{namespace: 'security'}> {}
}

const server = fastify();

server.register(require('@fastify/jwt'),  {
    secret: 'SecretVerySecretKey',
    decoratorName: 'customName'
})

server.register(cors, {
    origin: "*", 
    credentials: true, 
    methods: ['PUT', 'POST', 'GET', 'DELETE'], 
    allowedHeaders: ['username', 'password', 'token', 'nome', 'Content-Type'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
});

startupRoutes(server);
userRoutes(server);
favoritosRoutes(server)

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`http://localhost:8080`)
})

export default server;