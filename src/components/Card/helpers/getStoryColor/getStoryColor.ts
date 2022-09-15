const storyColors = {
  50: "blue-to-teal-gradient",
  100: "violet-to-blue-gradient",
  200: "orange-to-yellow-gradient",
  9999: "red-to-orange-gradient",
};

const getStoryColor = (score: number): string => {
  let color = "";

  for (const [key, value] of Object.entries(storyColors)) {
    if (score <= parseInt(key)) {
      color = value;
      break;
    }
  }

  return color;
};

export default getStoryColor;
