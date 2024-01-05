"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgePanel = void 0;
const forgescript_1 = require("forgescript");
const core_1 = require("./core");
class ForgePanel extends forgescript_1.ForgeExtension {
    static client;
    name = 'ForgePanel';
    description = 'WIP';
    version = '0.0.1';
    constructor() {
        super();
    }
    init(client) {
        const panel = new core_1.Panel();
        panel.load('./routes');
        panel.listen(3000);
        ForgePanel.client = client;
    }
}
exports.ForgePanel = ForgePanel;
//# sourceMappingURL=index.js.map