const parseUnixTime = (time: number): string => {
  const parsedDate = new Date(time).toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return parsedDate;
};

export default parseUnixTime;
