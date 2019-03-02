import $ from './jquery';
import {findGenderSelect, fixGenderFields} from './genderFields'
import {findTitleSelect, fixTitleFields} from './titleFields'


// Notification processing
browser.runtime.onMessage.addListener(notify);
function notify(message) {
  switch (message.intent) {
    case 'notifyClick':
      runFixes();
      break;
  }
}

function runFixes() {
  fixTitleFields(findTitleSelect());
  fixGenderFields(findGenderSelect());
}

function checkPageForTargets(){
  console.log(findGenderSelect());
  if(findGenderSelect().length > 0 || findTitleSelect().length > 0){
    browser.runtime.sendMessage({ intent: "showPage" });
  } else {
    browser.runtime.sendMessage({ intent: "hidePage" });
  }
}


checkPageForTargets();
