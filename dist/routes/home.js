"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const __1 = require("..");
exports.default = {
    url: '/',
    method: 'get',
    handler: async function (request, reply) {
        let file = await (0, promises_1.readFile)((0, path_1.join)(__dirname, '..', '..', './html/main.html'), { encoding: 'utf-8' });
        file = file.replaceAll(`{client.avatarURL}`, __1.ForgePanel.client.user.avatarURL() ?? '');
        file = file.replaceAll(`{client.id}`, __1.ForgePanel.client.user.id);
        file = file.replaceAll(`{client.username}`, __1.ForgePanel.client.user.username);
        file = file.replaceAll(`{client.ping}`, `${__1.ForgePanel.client.ws.ping}`);
        file = file.replaceAll(`{client.token}`, __1.ForgePanel.client.token.substring(0, __1.ForgePanel.client.token.indexOf('.')) + '*'.repeat(__1.ForgePanel.client.token.length - __1.ForgePanel.client.token.indexOf('.')));
        file = file.replaceAll(`{client.uptime}`, `${new Date().getTime() - __1.ForgePanel.client.uptime}`);
        reply.code(200).type('text/html').send(file);
    }
};
//# sourceMappingURL=home.js.map