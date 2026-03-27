interface ScriptLogger {
    (message: string, ...details: unknown[]): void;
}

interface ScriptLoggerMap {
    info: ScriptLogger;
    step: ScriptLogger;
    success: ScriptLogger;
    warn: ScriptLogger;
    error: ScriptLogger;
}

export const script: ScriptLoggerMap = {
    info: (message: string, ...details: unknown[]) => console.info(`ℹ️ ${message}`, ...details),
    step: (message: string, ...details: unknown[]) => console.log(`⚙️ ${message}`, ...details),
    success: (message: string, ...details: unknown[]) => console.log(`✅ ${message}`, ...details),
    warn: (message: string, ...details: unknown[]) => console.warn(`⚠️ ${message}`, ...details),
    error: (message: string, ...details: unknown[]) => console.error(`❌ ${message}`, ...details),
};
