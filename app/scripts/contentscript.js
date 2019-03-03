import $ from './jquery';
import {findGenderSelect, fixGenderFields} from './genderFields'
import {findTitleSelect, fixTitleFields} from './titleFields'

import { tween, styler, easing } from 'popmotion'


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
  let titles = findTitleSelect();
  let genders = findGenderSelect();

  runAnims(titles);
  runAnims(genders);

  fixTitleFields(titles);
  fixGenderFields(genders);
}

function runAnims(list) {
  list.forEach(function (item) {
    if(typeof item !== "string"){ // We wont animate radio buttons this way
      const styled = styler(item);
      tween({
        from: {scale: 1, rotate: 0 },
        to: {scale: 1.5, rotate: 360 },
        ease: easing.easeInOut,
        duration: 500,
        flip: 1,
      }).start(v => styled.set(v));
    }
  });
}

function checkPageForTargets(){
  console.log("checking");
  if(findGenderSelect().length > 0 || findTitleSelect().length > 0){
    browser.runtime.sendMessage({ intent: "showPage" });
    console.log("found");
  }
}


checkPageForTargets();
browser.runtime.sendMessage({intent: "meetPkFilter"});
setTimeout(checkPageForTargets, 3000);
