export const sanitazeBody = (input: string) => {
  try {
    JSON.parse(input);
    return true;
  } catch (e) {
    return false;
  }
};
