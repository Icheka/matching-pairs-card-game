export function fisherYatesShuffle<T>(arr: Array<T>): Array<T> {
  for (let i = arr.length - 1; i > 0; i--) {
    const currentElement = arr[i];
    const swapIndex = Math.floor(Math.random() * i);
    arr[i] = arr[swapIndex];
    arr[swapIndex] = currentElement;
  }

  return arr;
}
