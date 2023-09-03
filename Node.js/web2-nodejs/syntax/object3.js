const o = {
    v1: 'v1',
    v2: 'v2',
    f1: function () {
        console.log(this.v1);
    },
    f2: function () {
        console.log(this.v2);
    }
}
const p = {
    v1: 'v1',
    v2: 'v2',
    f1: () => {
        this.v1 = 'heellele';
        console.log(this);
        console.log(this.v1);
        return this.v1;
    },
    f2: () => {
        console.log(this);
        console.log(this.v2);
    }
}

const q = {
    v1: 'hello',
    result: p.f1()
}
var v1 = 'fooo';
o.f1();
o.f2();
p.f1();
p.f2();
console.log(q);