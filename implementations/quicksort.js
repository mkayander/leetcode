function partition(items, left, right) {
    const mid = left + Math.floor((right - left) / 2);
    const pivot = items[mid];
    while (left <= right) {
        while (items[left] < pivot) {
            left++;
        }
        while (items[right] > pivot) {
            right--;
        }
        if (left <= right) {
            [items[left], items[right]] = [items[right], items[left]];
            left++;
            right--;
        }
    }
    return left;
}

function quickSort(items, left, right) {
    const index = partition(items, left, right);
    if (left < index - 1) {
        quickSort(items, left, index - 1);
    }
    if (index < right) {
        quickSort(items, index, right);
    }
    return items;
}

const items = [5, 3, 7, 6, 2, 9];
const sortedArray = quickSort(items, 0, items.length - 1);
console.log(sortedArray);
