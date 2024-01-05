/**
 * Represents a panel server.
 */
export declare class Panel {
    private app;
    /**
     * Load all routes inside a folder.
     * @param dir Route path.
     */
    load(dir: string): Promise<void>;
    /**
     * Register Assets Folder
     * @param dir Assets Path
     * @param dir Assets Path
     */
    setAssets(dir: string, prefix: string): void;
    /**
     * Listen to the API server.
     * @param port Server port.
     * @param host Server host.
     */
    listen(port: number, host?: string): void;
}
//# sourceMappingURL=fastify.d.ts.map