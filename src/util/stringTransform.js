export const addArticle = (word) => {
  return /^[aeiouAEIOU]/.test(word) ? `an ${word}` : `a ${word}`;
};
