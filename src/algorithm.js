import dayjs from 'dayjs'

function interpolationSearchDate(sortedArray, target) {
  // Need with DayJs
  let [start, end] = [0, sortedArray.length - 1];
  while (start <= end) {
    const [x1, x2, y1, y2, k] = [start, end, sortedArray[start], sortedArray[end], target];
    const m = Math.floor(((k - y1) * (x2 - x1)) / (y2 - y1) + x1);
    if (m > end || m < start) { break; }
    if (target === sortedArray[m]) { return m; }
    if (target > sortedArray[m]) {
      start = m + 1;
    } else {
      end = m - 1;
    }
  }
  return -1;
}

function insertionDate(array)
{
  for(let i = 1; i<array.length; i++)
  {
    let currentVal = array[i];
    let j = 0;
    for (j = i - 1; j > -1; j--) {
      // compare time
      if ( dayjs(currentVal.pubTime).isAfter(array[j].pubTime) ) {
        array[j+1] = array[j]
      } 
      else break;
    }
    array[j+1] = currentVal
  }
  return array;
}

export default {
  insertionDate
}

