import $ from "./jquery";

const GENDERY_LIST = [
  "male",
  "female",
  "m",
  "f",
  "man",
  "woman"
];

function findGenderSelect(){
  let fields = [];
  $('select').each(function (selectIndex, select) {
    let pass = true;
    $(this).find('option').each((optIndex, option) => {
      if(!isGendery($(option).text()) && $(option).attr("hidden") !== "hidden"){
        pass = false;
      }
    });
    if(pass){
      fields.push(select);
    }
  });

  let radios = {};
  $('input:radio').each((radioIndex, radio) => {
    if(radios[$(radio).attr('name')] == null){
      radios[$(radio).attr('name')] = [];
    }
    radios[$(radio).attr('name')].push(radio);
  });

  Object.keys(radios).forEach((name) => {
    let pass = true;
    radios[name].forEach((button) => {
      if (!isGendery($(button).val()) && !isGendery($("label[for='" + $(button).attr('id') + "']").text())) {
        pass = false;
      }
    });
    if (pass) {
      fields.push(name)
    }
  });
  return fields;
}

function isGendery(str) {
  return GENDERY_LIST.includes(str.toLowerCase());
}

function fixGenderFields(list) {
  $.each(list, (i, item)=> {
    if(typeof item === "string") { // this is a radio selection
      // add our new one
      let form = document.getElementsByName(item)[0].form;
      if (form != null) {
        let targetFormId;
        if (form.attributes['id'] != null) {
          targetFormId = form.attributes['id']
        } else {
          targetFormId = "genderXFOREXTMOREOPT65";
          form.setAttribute('id', targetFormId);
        }
      }

      $('input[name=' + item + ']').first().before('<input type="radio" id="genderXFOREXTMOREOPT62" name="' + item + '" value="X"><label for="genderXFOREXTMOREOPT62">Other gender (added by more options)</label>');
      if(form != null) {
        $('#genderXFOREXTMOREOPT62').attr('form', targetFormId);
      }

    }
    else if($.isNumeric($(item).find('option').first().val())){ // If we have some numeric value, we should combat with the like
      $(item).append(new Option("Other gender (added by more options)", "7")); // 7 is just random :-)
    }
    else $(item).append(new Option("Other gender (added by more options)", "X"));
  });
}

export {findGenderSelect, fixGenderFields};
