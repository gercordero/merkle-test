const parseUnixTime = (time: number): string => {
  // 1000 -> milliseconds
  const parsedDate = new Date(time * 1000).toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return parsedDate;
};

export default parseUnixTime;
