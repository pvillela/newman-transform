/*
    Run proxy.
    See https://github.com/pvillela/ts-json-proxy-transform.
 */

import { proxy } from "json-proxy-transform";
import { reqTransform, resTransform } from "./transforms";
import { config } from "./config";

proxy(
  config.proxyPort,
  config.svcBaseUrl,
  { reqTransform, resTransform }
);
