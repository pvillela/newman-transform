/*
    Run Newman to execute test collection.
    See https://www.kimsereylam.com/js/postman/2020/05/29/using-newman-in-nodejs.html.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-argument */

import * as fs from "fs";
import { NewmanRunSummary } from "newman";
import EventEmitter from "events";
import { newmanP } from "./promise-utils";
import { config } from "./config";

const results: string[] = [];

export function runNewmanP(): Promise<NewmanRunSummary> {
  const ee: { emitter: EventEmitter | undefined } = { emitter: undefined };

  const p = newmanP(
    {
      reporters: "cli",
      collection: config.collection,
    },
    ee
  );

  // This can't happen.
  if (!ee.emitter) throw new Error("newman.run cannot return undefined emitter.");

  ee.emitter
    .on("request", function (err, args) {
      if (!err) {
        // here, args.response represents the entire response object
        const rawBody = args.response.stream; // this is a buffer
        const body = rawBody.toString(); // stringified JSON

        results.push(JSON.parse(body)); // this is just to aggregate all responses into one object
      }
    })
    .on("done", function (err, summary) {
      // write the details to any file of your choice. The format may vary depending on your use case
      fs.writeFileSync(
        "./out/migration-report.json",
        JSON.stringify(results, null, 4)
      );
    });

  return p;
}
