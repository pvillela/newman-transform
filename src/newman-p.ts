/*
    Utilities to promisify Newman run function call.
 */

import { NewmanRunOptions, NewmanRunSummary, run } from "newman";
import EventEmitter from "events";

// Newman `run` function returning a promise.
export function newmanP(
  options: NewmanRunOptions
): { emitter: EventEmitter, pSummary: Promise<NewmanRunSummary> } {
  let emitter: EventEmitter | undefined = undefined;
  const pSummary = new Promise<NewmanRunSummary>((resolve, reject) => {
    console.log("***** newmanP");
    function cb(error: Error | null, value?: NewmanRunSummary) {
      if (error) reject(error);
      else resolve(value as NewmanRunSummary);
    }
    // `emitter` is guaranteed to be assigned below and will never be undefined.
    emitter = run(options, cb);
  });
  return { emitter: emitter as unknown as EventEmitter, pSummary };
}
