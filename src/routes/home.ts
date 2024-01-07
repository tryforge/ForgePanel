import { RouteOptions } from 'fastify'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { ForgePanel } from '..'

export default {
    url: '/',
    method: 'get',
    handler: async function(request, reply) {
        let file = await readFile(join(__dirname, '..','..', './html/main.html'), { encoding: 'utf-8' })
        file = file.replaceAll(`{client.avatarURL}`, ForgePanel.client.user.avatarURL() ?? '')
        file = file.replaceAll(`{client.id}`, ForgePanel.client.user.id)
        file = file.replaceAll(`{client.username}`, ForgePanel.client.user.username)
        file = file.replaceAll(`{client.ping}`, `${ForgePanel.client.ws.ping}`)
        file = file.replaceAll(`{client.token}`, ForgePanel.client.token.substring(0, ForgePanel.client.token.indexOf('.')) + '*'.repeat(ForgePanel.client.token.length - ForgePanel.client.token.indexOf('.')))
        file = file.replaceAll(`{client.uptime}`, `${new Date().getTime() - ForgePanel.client.uptime}`)
        file = file.replaceAll(`{client.guildSize}`, `${await ForgePanel.client.guilds.fetch().then(s => s.size)}`)
        file = file.replaceAll(`{client.memberSize}`, `${ForgePanel.client.guilds.cache.map(g=>g.memberCount ?? 0).reduce((a, b) => a + b)}`)

        reply.code(200).type('text/html').send(file)
    }
} as RouteOptions