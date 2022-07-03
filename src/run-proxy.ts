/*
    Run proxy.
 */

import { proxy } from "json-proxy-transform";
import { reqTransform, resTransform } from "./transforms";
import { proxyPort, svcBaseUrl } from "./config";

proxy(
  proxyPort,
  svcBaseUrl,
  { reqTransform, resTransform }
);
