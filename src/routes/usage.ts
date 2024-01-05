import { RouteOptions } from 'fastify'
import pidusage from 'pidusage';

export default {
    url: '/usage',
    method: 'get',
    handler: async function(request, reply) {
        const stats = await pidusage(process.pid)
        reply.status(200).send({
            cpu: stats.cpu,
            ram: stats.memory,
            maxRam: require('os').totalmem()
        })
    }
} as RouteOptions