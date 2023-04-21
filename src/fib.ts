declare namespace console {
    function log(str: string): void;
} 

export function add(a: i32, b: i32): i32 {
    console.log("AnubhavGupta");
    return a + b;
}

export function fib(n: i32): i32 {
    console.log(n.toString());
    var a = 0;
    var b = 1;
    if (n > 0) {
        console.log(n.toString());
        while (--n) {
            console.log(n.toString());
            let t = a + b;
            a = b;
            b = t;
        }
        return b;
    }
    return a;
}
