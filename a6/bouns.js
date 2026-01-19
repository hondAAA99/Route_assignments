/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let cnt = 0;
  let len = nums.length;
  let shifts = 0;
  for (let e = 0; e < len - shifts; e++) {
    if (nums[e] == val) {
      shifts++;
      console.log(e);
      nums.push(val);
      nums.splice(e, 1);
      e = e - 1;
    }
  }

  return len - shifts;
};

let nums = [3, 2, 2, 3];
let val = 3;
let k = removeElement(nums, val);
console.log(k, nums);
