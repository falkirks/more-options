import $ from "./jquery";

const TITLE_LIST = [
  "mr",
  "ms",
  "mrs",
  "dr",
  "rev",
  "mme"
];
const MORE_TITLE_LIST = [
  "mx",
  "other",
  "custom",
  "no title",
  "none"
];


function findTitleSelect(){
  let fields = [];
  $('select').each(function (selectIndex, select) {
    let countTrue = 0;
    let foundMoreTitle = false;
    $(this).find('option').each((optIndex, option) => {
      if(isTitley($(option).text())){
        countTrue++
      } else if(isMoreTitle($(option).text())){
        foundMoreTitle = true;
      }
    });
    if(countTrue >= 2 && !foundMoreTitle){ // Titles can be weird and vary, lets just find two :P
      fields.push(select);
    }
  });
  return fields;
}

function fixTitleFields(list) {
  list.forEach((item) => {
    $(item).append(new Option("Mx (added by more options)", "Mx"));
  });
}

function isTitley(str) {
  return TITLE_LIST.includes(str.toLowerCase());
}

function isMoreTitle(str) {
  return MORE_TITLE_LIST.includes(str.toLowerCase());
}

export {findTitleSelect, fixTitleFields};
