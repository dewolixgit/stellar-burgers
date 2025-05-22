export const swap = (array: unknown[], index1: number, index2: number) => {
  [array[index1], array[index2]] = [array[index2], array[index1]];
};
