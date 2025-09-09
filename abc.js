

// console.log("Hello World");
// const a = 10;
// const b = 20;
// console.log(a + b);
// console.log("Sum is: " + (a + b));
// const user =NaN;  
// console.log(typeof user);
// if (user) {
//   console.log("User is logged in");
// } else {
//   console.log("User is not logged in");
// }
 
// // falsy values (when this come in if condition then it will be considered as false)
// undefined typeof undefined is undefined
// null typeof null is object
// 0 typeof 0 is number
// "" typeof "" is string
// NaN typeof NaN is number
// false typeof false is boolean
// null
// 0
// ""
// NaN
// false


// function lecture
 // function without return keyword  we cannot store the value in variable then it can be used later and if we try to store the value in variable it will be undefined
 function  Hellow(name){
    console.log(`my name is ${name} `)
 }
//  Hellow("kairm");
//  Hellow("ikram")
//  Hellow("inam")
//  Hellow("ijaz")

// const MyName=Hellow("kairm");
// console.log(MyName); // undefined
// console.log(typeof MyName); // undefined

 // function with return keyword we can store the value in variable then it can be used later
 function Greetng(){
    return "Good Morning"
 }
 
//  Greetng();
//  console.log(Greetng());
//     // console.log(Greetng);
//    console.log(  typeof Greetng);
//     console.log(Greetng() + " " + "kairm");
const greet=Greetng();
console.log(greet);
console.log(typeof greet);

 