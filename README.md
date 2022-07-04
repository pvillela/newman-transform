# newman-transform

This repo shows how to automate the use of the Newman library for API test execution with the addition of transform functions that can be applied to the API response. This allows the definition and execution of assertions that require complex post-processing of the API response and are not directly executable by Postman just based on the API response.

The source files in the [src](src) directory organize the processing steps. See the comments at the top of each source file.

The [example-data](example-data) directory contains:
- `Hello-World.postman_collection.json` -- the out-of-the-box [Postman](https://learning.postman.com/docs/getting-started/installation-and-updates/) collection that uses the Postman echo service to illustrate simple API testing.
- `Hello-Proxy-Post.postman_collection.json` -- a modification of the above collection to illustrate testing with the proxy server defined in [src/run-proxy.ts](src/run-proxy.ts) and transformation functions in [src/transforms.ts].
- `Hello-Proxy-Put.postman_collection.json` -- same as the above, but to illustrate PUT requests instead of POSTs.

**To run the example**, `cd` to the directory where this repo was downloaded and run `npx ts-node src/run-all.ts` or `npm run example`.
