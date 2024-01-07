import { RouteOptions } from 'fastify'
import pidusage from 'pidusage';
import { ForgePanel } from '..'

export default {
    url: '/usage',
    method: 'get',
    handler: async function(request, reply) {
        const stats = await pidusage(process.pid)
        reply.status(200).send({
            cpu: stats.cpu,
            ram: stats.memory,
            ping: ForgePanel.client.ws.ping
        })
    }
} as RouteOptions