/*
    Runs the entire automated transformation and testing process by launching
    the proxy server and running Newman when the proxy server is ready to accept
    requests.
    See https://2ality.com/2018/05/child-process-streams.html#reading-from-a-child-process.
    See https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917.
 */

import { fork } from "child_process";
import { runNewmanP } from "./run-newman";
import { Readable } from "stream";
import { chunksToLinesAsync, chomp } from "@rauschma/stringio";

async function main() {
  // Launch proxy server in child process.
  const proxyServer = fork("./src/run-proxy",
    {stdio: [ "pipe", "pipe", "pipe", "ipc" ]});

  // Awaits until the proxy server is ready to receive requests.
  await waitUntilReady(proxyServer.stdout as Readable, "Application is running");

  try {
    await runNewmanP();
  } catch (e) {
    console.log("!!!!!!!!!! ERROR in Newman execution:", e);
  }

  proxyServer.kill("SIGHUP");

  console.log("### DONE");
}

main().catch((err) => {console.log(err)});

async function waitUntilReady(readable: Readable, readyMarker: string) {
  for await (const line of chunksToLinesAsync(readable)) {
    console.log("LINE: "+chomp(line))
    if (line.startsWith(readyMarker)) break;
  }
}
