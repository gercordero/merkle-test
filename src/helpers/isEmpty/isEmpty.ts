const isEmpty = (value: any): boolean =>
  [Object, Array].includes((value || {})?.constructor) &&
  Object.entries(value || {}).length === 0;

export default isEmpty;
