import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<Symbol | string, unknown>>();

export default asyncLocalStorage;
