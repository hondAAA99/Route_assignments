/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let s = strs[0];
  let cnt = 0;

  let min = s.length;
  for (let e of strs) {
    if (min > e.length) {
      min = e.length;
    }
  }

  let str = "";
  for (let e = 0; e < min; e++) {
    let newChar = strs[0];
    for (let a = 0; a < strs.length; a++) {
      let char = strs[a];
      if (newChar[e] != char[e]) return str;
    }
    str = str.concat(newChar[e]);
  }
  return str;
};

console.log(longestCommonPrefix([""]));
