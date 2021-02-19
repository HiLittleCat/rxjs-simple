import { UnaryFunction } from '../types';

export function pipeFromArray<T, R>(
  fns: Array<UnaryFunction<any, any>>,
): UnaryFunction<any, any> {
  if (!fns) {
    return function () {} as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: any): any {
    return fns.reduce(
      (prev: any, fn: UnaryFunction<any, any>) => fn(prev),
      input as any,
    );
  };
}
