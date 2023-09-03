const members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

let i = 0;
while(i < members.length) {
    console.log('array loop', members[i]);
    i = i + 1;
}
const roles = {
    'programmer': 'egoing',
    'designer': 'k8805',
    'manager': 'hoya'
}
console.log(roles.designer);
console.log(roles['designer']);

for(let name in roles) {
    console.log('object =>', name, 'value =>', roles[name]);
}