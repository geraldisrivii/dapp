import { Log } from 'viem';

export interface IContract {
  init: () => Promise<void>;
}

export type ILog<T extends object = Record<string, unknown>>  = {
  args?: T;
} & Log
