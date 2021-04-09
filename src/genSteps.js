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

const bubbleSort = (nums, steps) => {
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
      colors[i] = "green";
      colors[i + 1] = "green";

      if (nums[i] > nums[i + 1]) {
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
    steps.push(["c", j - 1, "orange", colors[j - 1]]);
    colors[j - 1] = "orange";

    if (noSwaps) {
      steps.push([]);
      for (i = 0; i < j - 1; i++) {
        steps[steps.length - 1].push(["c", i, "orange", colors[i]]);
        colors[i] = "orange";
      }
      break;
    }
  }
  console.log(steps);
  return steps;
};

const quickSort = `async (nums, steps) => {
  async function quickSort(arr, left = 0, right = arr.length - 1) {
    // blocks = document.querySelectorAll(".block");
    let temp = arr.slice(left, right + 1);
    if (temp.length === 1) {
      // blocks.forEach((i) => {
      //   if (+i.children[0].textContent === temp[0]) {
      //     i.style.backgroundColor = "orange";
      //   }
      // });
    }
    // await wait();
    // console.log("pivot =>", arr.slice(left, right + 1));
    // if (arr.slice(left, right + 1)) blocks[left].style.backgroundColor = "orange";

    if (left < right) {
      let pivotIndex = await pivot(arr, left, right); //3
      await quickSort(arr, left, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
  }
};`;

module.exports.bubbleSort = bubbleSort;
module.exports.insertionSort = insertionSort;
module.exports.selectionSort = selectionSort;
