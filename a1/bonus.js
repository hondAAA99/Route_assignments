/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {

    const obj = {};
    let copy = init

    obj.increment = function () {
        return ++init ;
    }

    obj.decrement = function () {
        return --init ;
    }

    obj.reset = function () {
        return init=copy ;
    }



    return obj ;
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */