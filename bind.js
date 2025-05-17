// output for the bind 
var foo=1;
const change=()=>{
    this.foo=2;
    console.log(this.foo);
    console.log(this);
}

const obj={
    foo:3
}

const bundler= change.bind(obj);




// printing the output
console.log(foo);
console.log(change());
console.log(foo);
console.log(obj.foo);
console.log(bundler());
console.log(foo);