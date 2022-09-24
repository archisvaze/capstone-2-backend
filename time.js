let h1 = 0;
let h2 = 0;
let m1 = 0;
let m2 = 30
let i = 0;
let time = [];
while (i < 48) {
    time.push(`${h1}:0${m1}-${h1}:${m2}`);
    h2 += 1;
    i += 1;
    time.push(`${h1}:${m2}-${h2}:0${m1}`);
    h1 += 1;
    i += 1;
}

console.log(time)

// let date  = "2022-10-01"

// let newDate = new Date(date)
// console.log(newDate.getDay())

