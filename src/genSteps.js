let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

const selectionSort = (nums, steps) => {
  let i, temp;
  let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

  let lowest;
  for (let j = 0; j < nums.length; j++) {
    lowest = j;

    steps.push(["c", lowest, "red", colors[i]]);
    colors[i] = "red";

    for (let i = j + 1; i < nums.length; i++) {
      steps.push(["c", i, "green", colors[i]]);
      colors[i] = "green";

      if (nums[i] < nums[lowest]) {
        steps.push(
          ["c", lowest, "#cffaff", colors[lowest]],
          ["c", i, "red", colors[i]]
        );
        colors[lowest] = "#cffaff";
        colors[i] = "red";
        lowest = i;
      } else {
        steps.push(["c", i, "#cffaff", colors[i]]);
        colors[i] = "#cffaff";
      }
    }
    steps.push(
      ["c", j, "red", colors[j]],
      ["c", lowest, "red", colors[lowest]]
    );
    colors[j] = "red";
    colors[lowest] = "red";
    if (lowest !== j) {
      steps.push(["s", lowest, j]);
      temp = nums[j];
      nums[j] = nums[lowest];
      nums[lowest] = temp;
      steps.push(
        ["c", j, "orange", colors[j]],
        ["c", lowest, "#cffaff", colors[lowest]]
      );
      colors[j] = "orange";
      colors[lowest] = "#cffaff";
    } else {
      steps.push(["c", lowest, "orange", colors[lowest]]);
      colors[lowest] = "orange";
    }
  }

  return steps;
};

const insertionSort = (nums, steps) => {
  let temp;
  let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

  steps.push(["c", 0, "green", colors[0]]);
  colors[0] = "orange";
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j > 0; j--) {
      steps.push(["c", j, "red", colors[j]]);
      colors[j] = "red";
      steps.push(["c", j - 1, "green", colors[j - 1]]);
      colors[j - 1] = "green";
      if (nums[j] < nums[j - 1]) {
        steps.push(["s", j, j - 1]);
        temp = nums[j];
        nums[j] = nums[j - 1];
        nums[j - 1] = temp;
        temp = colors[j];
        colors[j] = colors[j - 1];
        colors[j - 1] = temp;
        steps.push(["c", j, "orange", colors[j]]);
        colors[j] = "orange";
      } else {
        steps.push([
          ["c", j - 1, "orange", colors[j - 1]],
          ["c", j, "orange", colors[j]],
        ]);
        colors[j - 1] = "orange";
        colors[j] = "orange";
        break;
      }
    }
    steps.push(["c", i, "orange", colors[i]]);
    colors[i] = "orange";
  }
  steps.push(["c", 0, "orange", colors[0]]);
  colors[0] = "orange";
  return steps;
};

const bubbleSort = (nums, steps, textBoxes = []) => {
  let noSwaps;
  let i, j, temp;
  let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

  for (j = nums.length; j > 0; j--) {
    noSwaps = true;
    for (i = 0; i < j - 1; i++) {
      if (i !== 0) {
        steps[steps.length - 1].push(["c", i, "green", colors[i]]);
        steps[steps.length - 1].push(["c", i + 1, "green", colors[i + 1]]);
      } else {
        steps.push([
          ["c", i, "green", colors[i]],
          ["c", i + 1, "green", colors[i + 1]],
        ]);
      }
      textBoxes.push(`Comparing ${nums[i]} & ${nums[i + 1]}`);
      colors[i] = "green";
      colors[i + 1] = "green";

      if (nums[i] > nums[i + 1]) {
        textBoxes.push(`Swapping ${nums[i]} & ${nums[i + 1]}`);
        temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        steps.push(["s", i, i + 1]);
        noSwaps = false;
        temp = colors[i];
        colors[i] = colors[i + 1];
        colors[i + 1] = temp;
      }

      steps.push([
        ["c", i, "#cffaff", colors[i]],
        ["c", i + 1, "#cffaff", colors[i + 1]],
      ]);
      colors[i] = "#cffaff";
      colors[i + 1] = "#cffaff";
    }
    textBoxes.push(`${nums[j - 1]} is now sorted`);
    steps[steps.length - 1].push(["c", j - 1, "orange", colors[j - 1]]);
    colors[j - 1] = "orange";

    if (noSwaps) {
      textBoxes.push(`As there was no swaps, array is sorted`);
      steps.push([]);
      for (i = 0; i < j - 1; i++) {
        steps[steps.length - 1].push(["c", i, "orange", colors[i]]);
        colors[i] = "orange";
      }
      break;
    }
  }
  console.log(steps.length, textBoxes.length);
  for (let i = 0; i < textBoxes.length; i++) {
    console.log(steps[i]);
    console.log(textBoxes[i]);
    console.log("===========");
  }

  return { steps, textBoxes };
};

const quickSort = (nums, steps) => {
  let numsDup = nums.map((nums) => nums);

  console.log(numsDup);
  function pivot(nums, start = 0, end = nums.length - 1) {
    const swap = (nums, idx1, idx2) => {
      [nums[idx1], nums[idx2]] = [nums[idx2], nums[idx1]];
    };
    let pivot = nums[start];
    let swapIdx = start;
    steps.push(["c", start, "orange", colors[start]]);
    colors[start] = "orange";

    for (let i = start + 1; i <= end; i++) {
      if (i > 1 && colors[i - 1] !== "green") {
        // blocks[i - 1].style.backgroundColor = "purple";
      }
      // blocks[i].style.background = "red";
      steps.push(["c", i, "red", colors[i]]);
      colors[i] = "red";
      // await wait();
      if (pivot > nums[i]) {
        swapIdx++;
        // swap(nums, swapIdx, i);
        // await swapp(swapIdx, i);
        steps.push([
          ["s", swapIdx, i],
          ["c", swapIdx, "green", colors[swapIdx]],
        ]);
        swap(numsDup, i, swapIdx);
        colors[swapIdx] = "green";
        // blocks = document.querySelectorAll(".block");
        // blocks[swapIdx].style.background = "green";
        // await wait();
      }
    }

    steps.push(["s", start, swapIdx]);
    console.log("==============");
    swap(numsDup, start, swapIdx);
    console.log("swapped", numsDup[start], numsDup[swapIdx]);
    console.log(numsDup);
    // steps[steps.length - 1] = [];
    for (let i = 0; i < nums.length; i++)
      if (colors[i] !== "orange") {
        steps.push(["c", i, "#cffaff", colors[i]]);
        colors[i] = "#cffaff";
      }

    // blocks[swapIdx].style.backgroundColor = "orange";
    steps.push(["c", swapIdx, "orange", colors[swapIdx]]);
    colors[swapIdx] = "orange";

    return swapIdx;
  }

  function quick(nums, left = 0, right = nums.length - 1) {
    let temp = nums.slice(left, right + 1);
    if (temp.length === 1) {
      nums.forEach((i, j) => {
        if (i === temp[0]) {
          steps.push(["c", j, "orange", colors[j]]);
          colors[j] = "orange";
        }
      });
    }
    if (left < right) {
      let pivotIndex = pivot(nums, left, right); //3
      quick(nums, left, pivotIndex - 1);
      quick(nums, pivotIndex + 1, right);
    }
    return nums;
  }

  quick(nums);
  console.log(steps);
};

const mergeSort = (nums, steps) => {
  let animCount = 0;
  function merge(arr1, arr2) {
    console.log(colors);
    let primary = colors[nums.indexOf(arr1[0])];
    console.log(colors[0]);
    animCount = nums.indexOf(arr1[0]);
    let result = [];
    let newNums = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr2[j] > arr1[i]) {
        result.push(arr1[i]);
        // await move(nums.indexOf(arr1[i]), animCount);
        // blocks[nums.indexOf(arr1[i])].style.backgroundColor = primary;
        steps.push([
          ["m", nums.indexOf(arr1[i]), animCount],
          ["c", nums.indexOf(arr1[i]), primary],
        ]);
        newNums[animCount] = nums[animCount];
        colors[nums.indexOf(arr1[i])] = primary;
        animCount++;
        i++;
      } else {
        result.push(arr2[j]);
        // await move(nums.indexOf(arr2[j]), animCount);
        // blocks[nums.indexOf(arr2[j])].style.backgroundColor = primary;
        steps.push([
          ["m", nums.indexOf(arr2[j]), animCount],
          ["c", nums.indexOf(arr2[j]), primary],
        ]);
        newNums[animCount] = nums[animCount];
        colors[nums.indexOf(arr2[j])] = primary;
        animCount++;
        j++;
      }
    }
    while (i < arr1.length) {
      result.push(arr1[i]);

      // await move(nums.indexOf(arr1[i]), animCount);
      // blocks[nums.indexOf(arr1[i])].style.backgroundColor = primary;
      steps.push([
        ["m", nums.indexOf(arr1[i]), animCount],
        ["c", nums.indexOf(arr1[i]), primary],
      ]);
      newNums[animCount] = nums[animCount];
      colors[nums.indexOf(arr1[i])] = primary;
      i++;
      animCount++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);

      // await move(nums.indexOf(arr2[j]), animCount);
      // blocks[nums.indexOf(arr2[j])].style.backgroundColor = primary;
      steps.push([
        ["m", nums.indexOf(arr2[j]), animCount],
        ["c", nums.indexOf(arr2[j]), primary],
      ]);
      newNums[animCount] = nums[animCount];
      colors[nums.indexOf(arr2[j])] = primary;
      j++;
      animCount++;
    }
    let start = nums.indexOf(arr1[0]);
    let end = nums.indexOf(arr2[arr2.length - 1]) + 1;
    // swpping nms n current newNums
    steps.push(["k", start, end]);
    // for (j = start; j < end; j++) {
    //   let ary = Array.from(document.querySelectorAll(".block")).map((i) => {
    //     return +i.children[0].textContent;
    //   });
    //   swapNodes(ary.indexOf(nums[j]), j);
    // }
    for (i = 0; i < newNums.length; i++) {
      // moving all nums up
      // blocks[i].style.transform = `translate(${114 * i}px,0px)`;
      steps.push(["b", i]);
    }
    return result;
  }

  // function myMerge(nums) {
  //   const mixColors = [
  //     "green",
  //     "blue",
  //     "purple",
  //     "violet",
  //     "red",
  //     "orange",
  //     "yellow",
  //   ];
  //   let merged = nums.map((l) => [l]);
  //   let i = 0;
  //   let j = 0;
  //   let temp;
  //   steps[0] = [];
  //   merged.forEach((l, j) => {
  //     // blocks[j].style.backgroundColor = colors[j];
  //     steps[0].push(["c", j, mixColors[j], colors[l]]);
  //     colors[j] = mixColors[j];
  //   });
  //   let k = j + 1;
  //   while (merged.length !== 1) {
  //     if (i < merged.length - 1) {
  //       if (merged[i].length === merged[i + 1].length) {
  //         temp = merge(merged[i], merged[i + 1]);
  //         merged[i] = temp;
  //         merged.splice(i + 1, 1);
  //         i = 0;
  //       } else {
  //         i++;
  //       }
  //     } else {
  //       temp = merge(merged[i - 1], merged[i]);
  //       merged[i - 1] = temp;
  //       merged.splice(i, 1);
  //       i = 0;
  //     }
  //     j++;
  //   }
  // }

  console.log(steps);
  return steps;
};

module.exports.bubbleSort = bubbleSort;
module.exports.insertionSort = insertionSort;
module.exports.selectionSort = selectionSort;
module.exports.quickSort = quickSort;
module.exports.mergeSort = mergeSort;
