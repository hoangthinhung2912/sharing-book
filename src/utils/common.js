import { curry } from 'ramda';

export const mapByProp = curry((prop, arr) => arr.reduce((acc, item) => ({
  ...acc,
  [item[prop]]: item
}), {}));

export const mapById = mapByProp('id');

export const renameProp = curry(
  (oldProp, newProp, { [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others,
  }),
);