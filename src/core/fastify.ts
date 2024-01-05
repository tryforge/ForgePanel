import * as F from 'fastify'
import { join } from 'path'
import * as fs from 'fs'

/**
 * Check if the provided file name is importable.
 * @param file Fila name.
 * @returns {boolean}
 */
const isValidFile = (file: string) => file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts'))

/**
 * Represents a panel server.
 */
export class Panel {
    private app: F.FastifyInstance = F.fastify()
    /**
     * Load all routes inside a folder.
     * @param dir Route path.
     */
    async load(dir: string) {
        const root = join(__dirname, '..'), files = fs.readdirSync(join(root, dir))
        for (const file of files) {
            const stat = fs.lstatSync(join(root, dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file))
            } else if (isValidFile(file)) {
                const route = require(join(root, dir, file)).default as F.RouteOptions
                if (!route) continue
                console.log(
                    'Endpoint loaded: "' + route.url + '"',
                    '>> Type: "' + route.method.toString().toUpperCase() + '"'
                )
                this.app.route(route)
            }
        }
    }

    /**
     * Register Assets Folder
     * @param dir Assets Path
     * @param dir Assets Path
     */
    setAssets(dir:string, prefix:string){
        this.app.register(require('@fastify/static'), {
            root: join(__dirname, '..', dir),
            prefix: prefix,
        });
    }
        
    /**
     * Listen to the API server.
     * @param port Server port.
     * @param host Server host.
     */
    listen(port: number, host?: string) {
        this.app.listen({
            port,
            host: host ?? '0.0.0.0'
        })
    }
}