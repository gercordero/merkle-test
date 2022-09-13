const { DEV } = import.meta.env;

const logError = (...errorStr: any[]): void => {
  // Print to console?
  if (DEV) {
    console.error(...errorStr); // eslint-disable-line no-console
  }
};

export default logError;
