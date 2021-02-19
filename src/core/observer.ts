import { Observer } from './types';
export const empty: Observer<any> = {
  closed: true,
  next(value: any): void {
    /* noop */
  },
  error(err: any): void {},
  complete(): void {
    /*noop*/
  },
};
