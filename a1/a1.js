// 1
let s = "123";
console.log(parseInt(s)+7);

// 2

let x = false ;

if ( x === false ){
    console.log("invalid");
}

// 3 

for ( let i = 1 ; i<=10 ; i++ ){
    if ( i%2 == 0 ) continue ;
    else console.log(i);
}

// 4

const arr = [1,2,3,4,5,6,7,8,9,10];

const fil = arr.filter( (e)=> e%2 == 0 );

console.log(fil);

// 5 

const arr1 = [1,3,5,7];
const arr2 = [1,3,5,7];

const arr3 = [...arr1 , ...arr2];
console.log(arr3);


// 6 

let day = 2 ;

switch (day){
    case 1 :
        console.log("sunday");
        break ;
    case 2 :
        console.log("monday");
        break ;
    case 3 :
        console.log("tuesday");
        break ;
    case 4 :
        console.log("wednesday");
        break ;
    case 5 :
        console.log("thursday");
        break ;
    case 6 :
        console.log("friday");
        break ;
    case 7 :
        console.log("saterday");
        break ;
}

// 7 

const arr4 = ['a','abc','adcs'];

const arr5 = arr4.map(function(num){
    return num.length ;
});

console.log(arr5);

// 8

let num = 15 ;

function is_div(num){
    if ( num%3 == 0 && num%5 == 0){
        return "Divisible by both";
    }

    else return "not Divisible by both";
}

console.log(is_div(num));

// 9 

let arrow = 5 ;

let sqr = (arrow) => arrow*arrow ;

console.log(sqr(arrow));

// 10

const obj = { name: "mohanad" , age : 20 };

const print = function(obj){
                return `${obj.name} is ${obj.age} years old`;
            }

console.log(print(obj));

// 11

let sum = function (...arr6){
    let sum = 0 ;
    for ( e of arr6 ){
        sum += e ;
    }
    return sum ;
}

console.log(sum(1,2,3));

// 12 

function success() {
    return Promise.resolve(setTimeout(() => {
        console.log("success");
    }, 3000))
}

success();

// 13 

let max = function(...nums){
    let m = 0 ;
    for ( e of nums ){
        if ( m < e ) m = e ;
    }

    return m ;
}

console.log(max(1,2,3,4));

// 14 

let o = { name : "mohanad" , age : "20" , city : "sohag" };

const key = function(o){
    return Object.keys(o);
}

console.log(key(o));

// 15

let str = "The quick brown fox" ;

const arr7 = str.split(" ");

console.log(arr7);


