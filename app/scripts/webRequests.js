console.log("WEB REQ: ALIVE!!!!");

let victimTabs = [];
let victimRequests = {};

browser.webRequest.onBeforeRequest.addListener(onRequest, {urls: ["<all_urls>"]}, ["blocking", "requestBody"]);
browser.webRequest.onBeforeSendHeaders.addListener(onHeaders, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
browser.runtime.onMessage.addListener(notify);


function setIcon(tabId, icon) {
  browser.pageAction.setIcon({
    path: icon,
    tabId: tabId
  })
}
function setRedIcon(tab) {
  setIcon(tab, {
    "19": "images/redx-19.png",
    "38": "images/redx-38.png"
  })
}
function setBlackIcon(tab) {
  setIcon(tab, {
    "19": "images/blackx-19.png",
    "38": "images/blackx-38.png"
  })
}

function notify(message, sender) {
  switch(message.intent){
    case 'toggleFilterPackets':
      console.log(victimTabs);
      if(victimTabs.includes(sender.tab.id)){
        setBlackIcon(sender.tab.id);
        victimTabs = victimTabs.filter(item => item !== sender.tab.id);
      }
      else{
        setRedIcon(sender.tab.id);
        victimTabs.push(sender.tab.id);
      }
      break;
    case 'meetPkFilter':
      if(victimTabs.includes(sender.tab.id)){
        setRedIcon(sender.tab.id);
      } else {
        setBlackIcon(sender.tab.id);
      }
      break;
  }
}

function isGenderyField(field) {
  field = field.toLowerCase();
  return field.includes('gender') || field.includes('sex');
}


function onRequest(e) {
  if(victimTabs.includes(e.tabId)){ // fair game
    if(!e.url.includes('http://localhost:7754') && e.requestBody && e.requestBody.formData){
      let found = false;
      Object.keys(e.requestBody.formData).forEach((i) => {
        if(isGenderyField(i)){
          console.log(i + " => " + e.requestBody.formData[i]);
          if(e.requestBody.formData[i] !== "X"){
            found = true;
          }
        }
      });
      if(found === true){
        victimRequests[e.requestId] = e.url;
        return {
          redirectUrl: "http://localhost:7754"
        };
      }
    }
    console.log(e);
  }
}

function onHeaders(e) {
  if(victimRequests[e.requestId] != null){
    e.requestHeaders.forEach(function(header){
      if (header.name.toLowerCase() == "referer") {
        console.log("replacing");
        header.value = victimRequests[e.requestId];
      }
    });
    victimRequests[e.requestId] = undefined;
    return {requestHeaders: e.requestHeaders};
  }
}
