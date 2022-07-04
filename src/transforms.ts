/*
    Transformation functions.
    See https://github.com/pvillela/ts-json-proxy-transform.
 */

/* eslint-disable @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access */

import { ReqTransformIn, ReqTransformOut, ResTransformIn, ResTransformOut } from "json-proxy-transform";

export function reqTransform(input: ReqTransformIn): ReqTransformOut {
  const origReqBody = input.data as any;
  console.log("********* origReqBody:", JSON.stringify(origReqBody));
  const msg = origReqBody.message;
  if (msg) {
    const trfmReqBody = { ...origReqBody };
    trfmReqBody.message = (origReqBody.message as string) + " - by proxy";
    console.log("********* trfmReqBody:", JSON.stringify(trfmReqBody));
    const reqHeaders = input.headers;
    // Set a custom header.
    reqHeaders.foo = "bar";
    console.log("********* reqHeaders:", reqHeaders);
    return { data: trfmReqBody, headers: reqHeaders };
  }
  throw new Error("Unable to transform request.");
}

export function resTransform(input: ResTransformIn): ResTransformOut {
  const origResData = input.data as any;
  console.log("********* origResData:", origResData);
  const msg = origResData.data.message;
  if (msg) {
    const result = {
      result: msg,
    };
    const trfmResData = { ...origResData };
    trfmResData.data = result;
    console.log("********* trfmResData:", trfmResData);
    const resHeaders = input.headers;
    console.log("********* resHeaders:", resHeaders);
    console.log("********* Manual computation of content-length header value:", JSON.stringify(trfmResData).length);
    // Notice below headers are not returned so input headers will be used.
    return { data: trfmResData };
  }
  throw new Error("Unable to transform response.");
}
