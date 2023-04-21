# Embed WASM (Rust) in NodeJS with WASI

## Prerequisites
 * Install Rust
   * https://www.rust-lang.org/tools/install
   * `$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
 * Install wasm32-wasi target
   * `$ rustup target add wasm32-wasi`
 * Install NodeJS
   * https://nodejs.org/en

## Build and run
 * `$ cargo build --target wasm32-wasi --release`
 * `$ npm i`
 * `$ node --experimental-wasi-unstable-preview1 src/run-wasm.js`

## Getting data in and out of WASI modules
https://petermalmgren.com/serverside-wasm-data/

## Links
Augmenting Node.js with WebAssembly
https://www.youtube.com/watch?v=a18YgJg41yQ

Wasm By Example - WASI Hello World
https://wasmbyexample.dev/examples/wasi-hello-world/wasi-hello-world.rust.en-us.html

WebAssembly System Interface (WASI)
https://nodejs.dev/en/api/v18/wasi/

Wasmtime - A fast and secure runtime for WebAssembly
https://wasmtime.dev/