import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

import pkg from "./package.json";

const input = ["src/index.js"];

export default [
	{
		// UMD
		input,
		output: [
			{
				file: `dist/${pkg.name}.min.js`,
				format: "umd",
				name: "p5State", // this is the name of the global object
				esModule: false,
				exports: "default",
				sourcemap: true,
			},
		],
		plugins: [
			nodeResolve(),
			terser(),
			babel({
				babelHelpers: "bundled",
			}),
		],
	},
	{
		// ESM and CJS
		input,
		output: [
			{
				file: `dist/esm/${pkg.name}.min.js`,
				format: "esm",
				exports: "default",
				sourcemap: true,
			},
			{
				file: `dist/cjs/${pkg.name}.min.js`,
				format: "cjs",
				exports: "named",
				sourcemap: true,
			},
		],
		plugins: [nodeResolve(), terser()],
	},
];