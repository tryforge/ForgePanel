"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const F = __importStar(require("fastify"));
const path_1 = require("path");
const fs = __importStar(require("fs"));
/**
 * Check if the provided file name is importable.
 * @param file Fila name.
 * @returns {boolean}
 */
const isValidFile = (file) => file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts'));
/**
 * Represents a panel server.
 */
class Panel {
    app = F.fastify();
    /**
     * Load all routes inside a folder.
     * @param dir Route path.
     */
    async load(dir) {
        const root = (0, path_1.join)(__dirname, '..'), files = fs.readdirSync((0, path_1.join)(root, dir));
        for (const file of files) {
            const stat = fs.lstatSync((0, path_1.join)(root, dir, file));
            if (stat.isDirectory()) {
                await this.load((0, path_1.join)(dir, file));
            }
            else if (isValidFile(file)) {
                const route = require((0, path_1.join)(root, dir, file)).default;
                if (!route)
                    continue;
                console.log('Endpoint loaded: "' + route.url + '"', '>> Type: "' + route.method.toString().toUpperCase() + '"');
                this.app.route(route);
            }
        }
    }
    /**
     * Register Assets Folder
     * @param dir Assets Path
     * @param dir Assets Path
     */
    setAssets(dir, prefix) {
        this.app.register(require('@fastify/static'), {
            root: (0, path_1.join)(__dirname, '..', dir),
            prefix: prefix,
        });
    }
    /**
     * Listen to the API server.
     * @param port Server port.
     * @param host Server host.
     */
    listen(port, host) {
        this.app.listen({
            port,
            host: host ?? '0.0.0.0'
        });
    }
}
exports.Panel = Panel;
//# sourceMappingURL=fastify.js.map