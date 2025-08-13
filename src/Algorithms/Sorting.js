export const bubbleSort = (array) => {
  const size = array.length;
  const SortingAnimation = []; // Use array instead of object

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      const current = {};
      current.comparison = [j, j + 1]; // store comparison indexes

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        current.swap = [j, j + 1]; // store swap indexes
      }

      SortingAnimation.push(current);
    }
  }

  return SortingAnimation;
};

export const insertionSort = (array) => {
  const size = array.length;
  const SortingAnimation = [];

  for (let i = 1; i < size; i++) {
    let key = array[i];
    let j = i - 1;

    // Compare and shift
    while (j >= 0) {
      SortingAnimation.push({ comparison: [j, j + 1], swap: null });
      if (array[j] > key) {
        array[j + 1] = array[j];
        SortingAnimation.push({ comparison: [j, j + 1], swap: [j, j + 1] });
        j--;
      } else {
        break;
      }
    }

    array[j + 1] = key;
  }

  return SortingAnimation;
};

export const selectionSort = (array) => {
  const size = array.length;
  const SortingAnimation = [];
  for (let i = 0; i < size; i++) {
    let min = i;
    for (let j = i + 1; j < size; j++) {
      SortingAnimation.push({ comparison: [min, j], swap: null });
      if (array[j] < array[min]) min = j;
    }
    if (min !== i) {
      [array[min], array[i]] = [array[i], array[min]];
      SortingAnimation.push({ comparison: [min, i], swap: [min, i] });
    }
  }
  return SortingAnimation;
};

//wip {fix code}
export const mergeSort = (array) => {
  const SortingAnimation = [];

  const merge = (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = [];
    const R = [];

    for (let i = 0; i < n1; i++) L.push(arr[left + i]);
    for (let j = 0; j < n2; j++) R.push(arr[mid + 1 + j]);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      SortingAnimation.push({
        comparison: [left + i, mid + 1 + j],
        swap: null,
      });
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        SortingAnimation.push({
          comparison: [k, left + i],
          swap: [k, left + i],
        });
        i++;
      } else {
        arr[k] = R[j];
        SortingAnimation.push({
          comparison: [k, mid + 1 + j],
          swap: [k, mid + 1 + j],
        });
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      SortingAnimation.push({ comparison: [k, left + i], swap: [k, left + i] });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      SortingAnimation.push({
        comparison: [k, mid + 1 + j],
        swap: [k, mid + 1 + j],
      });
      j++;
      k++;
    }
  };

  const mergeSortRecursive = (arr, left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSortRecursive(arr, left, mid);
    mergeSortRecursive(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  mergeSortRecursive(array, 0, array.length - 1);
  return SortingAnimation;
};

// wip {add sortingAnimation logic}
QuickSort = (array, SortingAnimation, low, high) => {
  if (low >= high) return;

  let s = low,
    e = high,
    mid = (s + e) / 2;
  let pivot = array[mid];

  while (s <= e) {
    while (array[s] < pivot) s++;
    while (array[e] > pivot) e--;

    if (s <= e) {
      [array[s], array[e]] = [array[e], array[s]];
      s++;
      e--;
    }
  }
  QuickSort(array, SortingAnimation, low, e);
  QuickSort(array, SortingAnimation, s, high);
};

export const callQuickSort = (array) => {
  const SortingAnimation = [];
  const size = array.length - 1;
  QuickSort(array, SortingAnimation, 0, size);

  return SortingAnimation;
};
