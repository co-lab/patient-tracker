// @flow

export function promisify(callback: Function, ...params: any[]): Promise<any> {
  return new Promise((resolve, reject) =>
    process.nextTick(() =>
      callback(...params, (error, result) =>
        (error ? reject(error) : resolve(result)))));
}
