console.log("WEB REQ: ALIVE!!!!");

let victimTabs = [];

browser.webRequest.onBeforeRequest.addListener(onRequest, {urls: ["<all_urls>"]}, ["blocking", "requestBody"]);
browser.runtime.onMessage.addListener(notify);


function notify(message, sender) {
  switch(message.intent){
    case 'toggleFilterPackets':
      if(victimTabs.includes(sender.tab.id)){
        victimTabs = victimTabs.filter(item => item !== sender.tab.id);
      }
      else victimTabs.push(sender.tab.id);
      break;
  }
  console.log(victimTabs)
}


function onRequest(e) {

  if(victimTabs.includes(e.tabId)){ // fair game

    console.log(e);
  }
}
