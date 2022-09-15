// A simple utility for conditionally joining classNames together.
const cx = (...args: any[]): string => args.filter(Boolean).join(" ");

export default cx;
