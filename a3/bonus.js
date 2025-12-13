/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let majority = Math.floor(nums.length/2);
    for ( let e of nums ){
        let cnt = 0 ;
        for ( let a of nums ){
            if ( e==a) cnt++;
        }

        if ( cnt > majority ){
            return e ;
        }
    }
};