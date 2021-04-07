const insertionSort = (nums, steps) => {
  let noSwaps;
  let i, j, temp;
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

module.exports.bubbleSort = bubbleSort;
module.exports.insertionSort = insertionSort;
