#!/usr/bin/env node

import process from 'node:process';

import { customAlphabet, nanoid } from '../index.js';

function print(msg: string) {
	process.stdout.write(msg + '\n');
}

function error(msg: string) {
	process.stderr.write(msg + '\n');
	process.exit(1);
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
	print(`
  Usage
    $ nanoid [options]
  Options
    -s, --size       Generated ID size
    -a, --alphabet   Alphabet to use
    -h, --help       Show this help
  Examples
    $ nano --s 15
    S9sBF77U6sDB8Yg
    $ nano --size 10 --alphabet abc
    bcabababca`);
	process.exit();
}

let alphabet: string | undefined;
let size: number | undefined;
for (let i = 2; i < process.argv.length; i++) {
	const arg = process.argv[i];
	if (arg === '--size' || arg === '-s') {
		size = Number(process.argv[i + 1]);
		i += 1;
		if (Number.isNaN(size) || size <= 0) {
			error('Size must be positive integer');
		}
	} else if (arg === '--alphabet' || arg === '-a') {
		alphabet = process.argv[i + 1];
		i += 1;
	} else {
		error(`Unknown argument ${arg!}`);
	}
}

if (alphabet) {
	const customNanoid = customAlphabet(alphabet, size);
	print(customNanoid());
} else {
	print(nanoid(size));
}
