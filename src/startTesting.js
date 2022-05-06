const reverseName = (name) => {
  const iter = (acc, idx) => {
    if (idx < 0) {
      return acc;
    }
    return iter(`${acc}${name[idx]}`, idx - 1);
  };
  return iter('', name.length - 1);
};

export default reverseName;
