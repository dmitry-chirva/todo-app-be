import pino, {Logger as PinoLogger, LoggerOptions} from "pino";
import asyncLocalStorage from '../storage/async-storage';
import { AsyncLocalStorage } from 'async_hooks';
import { LOGGER } from './constants';

class Logger {
    private readonly logger: PinoLogger;

    constructor(private asyncLocalStorage: AsyncLocalStorage<Map<Symbol | string, PinoLogger>>) {
        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        });
    }

    init(traceId: string) {
        const store = this.asyncLocalStorage.getStore();

        const childLogger = this.logger.child({
            traceId
        });

        store?.set(LOGGER, childLogger);
    }

    get() {
        const store = this.asyncLocalStorage.getStore();
        const childLogger = store?.get(LOGGER);
        const logger = this.logger;

        return !!childLogger ? childLogger : logger;
    }
}

const logger = new Logger(asyncLocalStorage as AsyncLocalStorage<Map<Symbol | string, PinoLogger>>);

export default logger
