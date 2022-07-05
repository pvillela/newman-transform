/*
    Utilities to promisify newman call.
 */

// Type of Node.js callbacks
import { NewmanRunOptions, NewmanRunSummary, run } from "newman";
import EventEmitter from "events";

type Callback<T> = (error: Error | null, value?: T) => void;

// Type of resolve function
type Resolve<T> = (value: T) => void;

// Type of reject function
type Reject = (error: Error) => void;

// Transforms a resolve and a reject to a callback
function rrToCb<T>(resolve: Resolve<T>, reject: Reject): Callback<T> {
  return (error: Error | null, value?: T): void => {
    if (error) reject(error);
    else resolve(value as T);
  };
}

// Transforms a void function taking 2 arguments and a callback to
// a funcction taking 2 arguments and returning a promise
function promisify2<S1, S2, T>(
  fcb: (x1: S1, x2: S2, cb: Callback<T>) => void
): (x1: S1, x2: S2) => Promise<T> {
  return (x1: S1, x2: S2): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const cb = rrToCb(resolve, reject);
      fcb(x1, x2, cb);
    });
  };
}

function newmanV(
  options: NewmanRunOptions,
  ee: { emitter: EventEmitter | undefined },
  callback?: (err: Error | null, summary: NewmanRunSummary,
) => void): void {
  console.log("***** newmanV");
  ee.emitter = run(options, callback);
}

/**
 * Promisified version of Newman run function.
 */
export const newmanP: (
  options: NewmanRunOptions,
  ee: { emitter: EventEmitter | undefined },
) => Promise<NewmanRunSummary> = promisify2(newmanV);
