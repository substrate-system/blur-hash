"use strict";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { encode } from "blurhash";
import fs from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sizeOf from "image-size";
export const encodeImageToBlurhash = async (filepath, width, height) => {
  console.log("the width and height.....", width, height);
  const data = await fs.readFile(filepath);
  const arr = Uint8ClampedArray.from(data);
  console.log("arrrrrrrrrrrrrrr", arr.length);
  return encode(arr, width, height, 4, 4);
};
const pathToThisFile = resolve(fileURLToPath(import.meta.url));
const pathPassedToNode = resolve(process.argv[1]);
const isThisFileBeingRunViaCLI = pathToThisFile.includes(pathPassedToNode);
if (isThisFileBeingRunViaCLI) {
  const args = yargs(hideBin(process.argv)).demandCommand(1).command("filename", "the local filename to read").example(
    "`npx blur my-fiile.jpg`",
    "Create a small placeholder string from a local file"
  ).usage("Usage: blur <filename>").argv;
  const filename = args._[0];
  const { width, height } = sizeOf(filename);
  const hash = await encodeImageToBlurhash(filename, width, height);
  process.stdout.write(hash + "\n");
}
