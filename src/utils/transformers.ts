export type GenericObject = Record<
  string,
  string | number | boolean | null | undefined | Date | Record<string, unknown>
>;

export const mergeObjects = <T>(...args: GenericObject[]) => {
  return Object.assign({}, ...args) as T;
};
