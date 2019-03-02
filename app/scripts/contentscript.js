import $ from './jquery';


console.log(`'Allo 'Allo! Content script`);

// Notification processing
browser.runtime.onMessage.addListener(notify);
function notify(message) {

}

