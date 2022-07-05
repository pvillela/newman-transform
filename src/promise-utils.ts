/*
    Utilities to promisify Newman run function call.
 */

import { NewmanRunOptions, NewmanRunSummary, run } from "newman";
import EventEmitter from "events";

// Newman `run` function returning a promise.
export function newmanP(
  options: NewmanRunOptions,
  ee: { emitter: EventEmitter | undefined },
): Promise<NewmanRunSummary> {
  return  new Promise((resolve, reject) => {
    console.log("***** newmanP");
    function cb(error: Error | null, value?: NewmanRunSummary) {
      if (error) reject(error);
      else resolve(value as NewmanRunSummary);
    }
    ee.emitter = run(options, cb);
  });
}
