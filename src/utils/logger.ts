class Logger {
    private static instance: Logger;

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    info(message: string, ...args: any[]) {
        console.log(`[INFO] ${message}`, ...args);
    }

    warn(message: string, ...args: any[]) {
        console.warn(`[WARN] ${message}`, ...args);
    }

    error(message: string, ...args: any[]) {
        console.error(`[ERROR] ${message}`, ...args);
    }

    debug(message: string, ...args: any[]) {
        if (process.env.NODE_ENV !== "production") {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }
}

export default Logger.getInstance();