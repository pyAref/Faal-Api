'use strict';

// import npm modules
const hapi = require('@hapi/hapi');
const faal = require('./json/faals.json');
const config = require('./json/config.json');

// create server

const init = async () => {
    // object 
    const server = hapi.server({
        // port number
        port: config.port || 3000,
        // hostname
        host: config.host || 'localhost'  
    });

    server.route({
        // methods 
        method: ['GET', 'POST'],
        // path 
        path: '/rfaal/{count?}',
        // handler 
        handler: (request, reply) => {
            // count parameter
            
            let count = request.params.count || 1;
            // if count is not a number
            if (isNaN(count)) {
                // return error
                return reply.response({
                    error: 'count must be a number'
                }).code(400);
            }
            // if count is less than 1
            if (count < 1) {
                // return error
                return reply.response({
                    error: 'count must be greater than 0'
                }).code(400);
            }

            // faal array
            let faals = [];
            // for loop
            for (let i = 1  ; i <= count; i++) {
                // push faal to faal array
                let index = Math.floor(Math.random() * faal.data.length);
                faals.push(faal.data[index]);
            }
            // return faal array to client
            return faals;
        }
    });

    server.route({
        // methods
        method: ['GET', 'POST'],
        // path
        options: {
            log: {
                collect: true
            }
        },
        path: '/faal/{id}',
        handler:  (request, reply) =>  {
            // id parameter
            for (let i = 0; i < faal.data.length; i++) { 
                // if id is equal to faal id
                if (faal.data[i].id === request.params.id) {
                    // return faal
                    return faal.data[i];
                }
            }
            // return error 
            return { 
                status: 404,
                message: 'Faal not found with this ID'
            }
        }
    });
    // start server
    await server.start();

    console.log('Server running on %s', server.info.uri);
};

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    // log error
    console.log(err);
    // exit process
    process.exit(1);
});

// run init function
init();