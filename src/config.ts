/*
    Set configuration properties required by other modules. The examples below hard-code
    the configuration properties but also indicate how they can be pulled from the
    environment.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Collection } from "postman-collection";

process.env.PROXY_PORT = "8000";
process.env.SVC_BASE_URL = "https://postman-echo.com";

export const proxyPort = Number(process.env.PROXY_PORT);
export const svcBaseUrl = process.env.SVC_BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const collection: Collection = require("../example-data/Hello-Proxy-Post.postman_collection.json");
