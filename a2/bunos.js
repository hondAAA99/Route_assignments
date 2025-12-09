/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
    let cnt = 0 ;
    let ArrCnt = 0 ;
    for ( let i = 1 ; true ; i++ ){
        // console.log(i,arr.indexOf(i));
        if (arr.indexOf(i) == -1 ) cnt++ ;
        if ( cnt === k ) return i ;
        
    }
};



// console.log(findKthPositive( [2,3,4,7,11],  5 ));
