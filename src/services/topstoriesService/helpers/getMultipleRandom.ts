const getMultipleRandom = <T = any>(arr: T[], limit: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, limit);
};

export default getMultipleRandom;
