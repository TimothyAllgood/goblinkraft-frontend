export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export const stringToGradient = (str) => {
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    hash1 = str.charCodeAt(i) + ((hash1 << 5) - hash1);
    hash2 = str.charCodeAt(i) + ((hash2 << 7) - hash2);
  }
  let color1 = "#";
  let color2 = "#";
  for (let i = 0; i < 3; i++) {
    const value1 = (hash1 >> (i * 8)) & 0xff;
    const value2 = (hash2 >> (i * 8)) & 0xff;
    color1 += ("00" + value1.toString(16)).substr(-2);
    color2 += ("00" + value2.toString(16)).substr(-2);
  }
  return `linear-gradient(0deg, ${color1}, ${color2})`;
};
