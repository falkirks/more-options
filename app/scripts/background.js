browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

browser.tabs.onUpdated.addListener(async (tabId) => {
  //browser.pageAction.show(tabId)
});

browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { intent: "notifyClick" });
});


browser.runtime.onMessage.addListener(notify);

function hidePageAction(message, sender) {
  browser.pageAction.hide(sender.tab.id);
}

function showPageAction(message, sender) {
  browser.pageAction.show(sender.tab.id);
}

function notify(message, sender) {
  switch(message.intent){
    case 'showPage':
      showPageAction(message, sender);
      break;
    case 'hidePage':
      hidePageAction(message, sender);
      break;
  }
}
