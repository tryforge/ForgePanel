import { ForgeClient, ForgeExtension } from "forgescript";
import { Panel } from "./core";


export class ForgePanel extends ForgeExtension {
    public static client: ForgeClient

    name: string = 'ForgePanel';
    description: string = 'WIP';
    version: string = '0.0.1';

    constructor(){
        super()
    }

    public init(client: ForgeClient): void {
        const panel = new Panel()
        panel.load('./routes')
        panel.listen(3000)

        ForgePanel.client = client
    }
}