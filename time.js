let h1 = 0;
let h2 = 0;
let m1 = 0;
let m2 = 30
let i = 0;
let time = {};
while (i < 48) {
    time[i] = (`${h1}:0${m1}-${h1}:${m2}`);
    h2 += 1;
    i += 1;
    time[i] = (`${h1}:${m2}-${h2}:0${m1}`);
    h1 += 1;
    i += 1;
}

console.log(time)


