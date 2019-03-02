import $ from './jquery';
import {findGenderSelect, fixGenderFields} from './genderFields'
import {findTitleSelect, fixTitleFields} from './titleFields'


// Notification processing
browser.runtime.onMessage.addListener(notify);

let lastClick = 0;

function notify(message) {
  switch (message.intent) {
    case 'notifyClick':
      if(lastClick + 750 > Date.now()){
        lastClick = 0;
        browser.runtime.sendMessage({intent: "toggleFilterPackets"});
        console.log("toggle");
      }
      else {
        runFixes();
        lastClick = Date.now();
      }
      break;
  }
}

function runFixes() {
  fixTitleFields(findTitleSelect());
  fixGenderFields(findGenderSelect());
}

function checkPageForTargets(){
  console.log("checking");
  if(findGenderSelect().length > 0 || findTitleSelect().length > 0){
    browser.runtime.sendMessage({ intent: "showPage" });
    console.log("found");
  }
}


checkPageForTargets();
setTimeout(checkPageForTargets, 3000);
