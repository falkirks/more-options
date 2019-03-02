console.log("WEB REQ: ALIVE!!!!");

browser.webRequest.onBeforeRequest.addListener(onRequest, {urls: ["<all_urls>"]}, ["blocking", "requestBody"]);


function onRequest(e) {
  console.log(e);
}
