export const isMulti = () => {
  const Multi = process.argv.filter((el) => el.startsWith('--isMulti'))[0];
  return Multi ? Multi.replace(/^--isMulti=/, '') : false;
};
