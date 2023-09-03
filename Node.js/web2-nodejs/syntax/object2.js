const f = function() {
    console.log(1+1);
    console.log(1+2);
}
const a = [f];
a[0]();

const o = {
    func: f
}
o.func();