/*
    Run Newman to execute test collection.
    See https://www.kimsereylam.com/js/postman/2020/05/29/using-newman-in-nodejs.html.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-argument */

import * as fs from "fs";
import { NewmanRunOptions, NewmanRunSummary } from "newman";
import { newmanP } from "./promise-utils";
import { config } from "./config";

const results: string[] = [];

// Runs Newman for the test collection.
// This function only needs to be async if the await code to illustrate the race condition is
// uncommented.
export async function runNewmanP(): Promise<NewmanRunSummary> {
  const { emitter, pSummary } = newmanP(
    {
      reporters: "cli",
      collection: config.collection,
      // abortOnFailure: true // uncomment to abort on test script errors or assertion failures
    } as NewmanRunOptions, // type assertion required if abortOnFailure is used because it is not in types file
  );

  // There is a race condition in Newman. If the below line is uncommented, the event handlers
  // below will not execute. If it is uncommented but the timeout is set to 100, the event
  // handlers will execute.
  // await new Promise(resolve => setTimeout(resolve, 5000));

  emitter
    .on("request", function (err, args) {
      if (!err) {
        // here, args.response represents the entire response object
        const rawBody = args.response.stream; // this is a buffer
        const body = rawBody.toString(); // stringified JSON

        results.push(JSON.parse(body)); // this is just to aggregate all responses into one object
      }
      console.log("********** event handler for `request` executed");
    })
    .on("done", function (err, summary) {
      // write the details to any file of your choice. The format may vary depending on your use case
      fs.writeFileSync(
        "./out/migration-report.json",
        JSON.stringify(results, null, 4)
      );
      console.log("********** event handler for `done` executed");
    });

  return pSummary;
}
