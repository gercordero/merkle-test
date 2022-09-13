/* eslint-disable @typescript-eslint/strict-boolean-expressions */

const isEmpty = (value: any): boolean =>
  [Object, Array].includes((value || {})?.constructor) &&
  Object.entries(value || {}).length === 0;

export default isEmpty;
