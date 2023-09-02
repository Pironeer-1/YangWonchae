const number = [1, 400, 12, 34, 5, 1000];
let i = 0;
let total = 0;
while(i < number.length) {
    total = total + number[i];
    i = i + 1;
}
console.log(`total: ${total}`);