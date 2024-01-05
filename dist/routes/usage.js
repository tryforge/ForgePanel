"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pidusage_1 = __importDefault(require("pidusage"));
exports.default = {
    url: '/usage',
    method: 'get',
    handler: async function (request, reply) {
        const stats = await (0, pidusage_1.default)(process.pid);
        reply.status(200).send({
            cpu: stats.cpu,
            ram: stats.memory,
            maxRam: require('os').totalmem()
        });
    }
};
//# sourceMappingURL=usage.js.map