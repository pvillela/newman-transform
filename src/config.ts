/*
    Set configuration properties required by other modules. The examples below hard-code
    the configuration properties but also indicate how they can be pulled from the
    environment.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Collection } from "postman-collection";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const collection: Collection = require("../example-data/Hello-Proxy-Post-Mixed.postman_collection.json");

export const config = {
  proxyPort: Number(process.env.PROXY_PORT || "8000"),
  svcBaseUrl: process.env.SVC_BASE_URL || "https://postman-echo.com",
  collection
}
