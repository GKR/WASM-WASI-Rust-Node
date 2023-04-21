import { readFile } from 'node:fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// node --experimental-wasi-unstable-preview1 run-wasm.js
console.log(`__dirname: ${__dirname}`);

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    // '/sandbox': '/some/real/path/that/wasm/can/access',
    '/helloworld': './'
  },
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL(`${__dirname}/../target/wasm32-wasi/release/wasi_hello_world.wasm`, import.meta.url)),
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);

const factorial_wasm = fs.readFileSync('./build/factorial.wasm');
const lib = WebAssembly.instantiate(new Uint8Array(factorial_wasm), { env: { consoleLog: console.log }}).
   then(res => {
      for (var i=1;i<=10;i++) {
         console.log("The factorial of "+i+" = "+res.instance.exports.fact(i))
      }
   }
);