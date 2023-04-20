import { readFile } from 'node:fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'node:process';

// node --experimental-wasi-unstable-preview1 run-wasm.js

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
  await readFile(new URL('./target/wasm32-wasi/debug/wasi_hello_world.wasm', import.meta.url)),
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
