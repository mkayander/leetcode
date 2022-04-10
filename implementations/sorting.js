function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}

function optimizedBubbleSort(array) {
    let swapped = true;
    do {
        swapped = false;
        for (let j = 0; j < array.length; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return array;
}

const numbersToSort = [9, 3, 2, 11];
const sortedList = bubbleSort(numbersToSort);
console.log(sortedList);

const numbersToSort2 = [9, 3, 2, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const sortedList2 = optimizedBubbleSort(numbersToSort2);
console.log(sortedList2);
