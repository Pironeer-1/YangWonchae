var a = function () {
    console.log('A');
}

function slowfunc(callback) {
    callback();
}

slowfunc(a);
