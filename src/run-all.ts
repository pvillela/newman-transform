// See https://2ality.com/2018/05/child-process-streams.html#reading-from-a-child-process.
// See https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917.

import { fork } from "child_process";
import { runNewman } from "./run-newman";
import { Readable } from "stream";
import { chunksToLinesAsync, chomp } from "@rauschma/stringio";

async function main() {
  const source = fork("./src/run-proxy",
    {stdio: [ "pipe", "pipe", "pipe", "ipc" ]});

  await echoReadable(source.stdout as Readable);

  runNewman();

  console.log("### DONE");
}

main().catch((err) => {console.log(err)});

async function echoReadable(readable: Readable) {
  for await (const line of chunksToLinesAsync(readable)) { // (C)
    console.log("LINE: "+chomp(line))
    if (line.startsWith("Application is running")) break;
  }
}
