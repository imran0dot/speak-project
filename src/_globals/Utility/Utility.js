import moment from 'moment';

export function uuid() {
  var buf = new Uint32Array(4);
  window.crypto.getRandomValues(buf);
  var idx = -1;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      idx++;
      var r = (buf[idx>>3] >> ((idx%8)*4))&15;
      var v = c === 'x' ? r : ((r&0x3)|(0x8));
      return v.toString(16);
  });
}

export function redirectUrl(url){
  document.location.href = url;
}

export function isOdd(num) { 
  return num % 2;
}

export function capitalize(string) {
  let string2 = string.toLowerCase();
  return string2.charAt(0).toUpperCase() + string2.slice(1);
}

export function replaceUnderscoresWithSpace(string) {
  return string.replace(/_/g," ");
}

export function toTitleCase(string) {
  return string.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function convertKeyToTitle(string) {
  return string? toTitleCase(replaceUnderscoresWithSpace(string)): "";
}

export function filterArray(arr) {
  return arr.filter(function(item, pos){
    return arr.indexOf(item) === pos; 
  });
}

export function uniqueArray(arr) {
  return arr.filter(function(item, pos, self){
    return self.indexOf(item) === pos; 
  });
}

export function truncate(input, maxLength) {
  if (input.length > maxLength) {
    return input.substring(0, maxLength) + '...';
  }
  return input;
}

export function chunks(array, size) {
  //splits an array into chunks
  return Array.apply(0,{length: Math.ceil(array.length / size)}).map((_, index) => array.slice(index*size, (index+1)*size))
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function typeAnimation(text, timing, callback) {
  let concatStr = "";
  for (const char of text) {
    concatStr += char;
    await sleep(timing);
    const shouldStop = callback(concatStr);
    if (shouldStop) break;// stop the loop
  }
}

export function invokeAnimation(referenceInput, placeholderText) {
  if(referenceInput){
    typeAnimation(placeholderText, 100, function (msg) {
      if (document.activeElement !== referenceInput) {
        referenceInput.setAttribute("placeholder", msg);
      } else {
        return true;//stop typings
      }
    });
  }
}

export function stripHtml(html) {
   let tmp = document.createElement("div");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

export function sortArrayByDateAsc(array, fieldName) {
  return array.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b[fieldName]) - new Date(a[fieldName]);
  });
}  

export function sortArrayByDateDesc(array, fieldName) {
  return array.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a[fieldName]) - new Date(b[fieldName]);
  });
}

/* intersperse: Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > _([1,2,3]).intersperse(0)
 * [1,0,2,0,3]
 */
export function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(function(xs, x, i) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}

export function getMin(array, fieldName) {
  return array.reduce((a, b) => a[fieldName] < b[fieldName] ? a : b)
}

export function getMax(array, fieldName) {
  return array.reduce((a, b) => a[fieldName] > b[fieldName] ? a : b)
}

export function isUrlValid(value) {
  return !(value !== undefined && !new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi, 'i').test(value));
}

export function isPhoneValid(value) {
  return !(value !== undefined && !/^([0-9\s\-+()]*)$/i.test(value));
}

export function isEmailValid(value) {
  return !(value !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
}

export function makeUL(options){
    var a = '<ul class="list">',
        b = '</ul>',
        m = [];

    // Right now, this loop only works with one
    // explicitly specified array (options[0] aka 'set0')
    for (let i = 0; i < options.length; i += 1){
        m[i] = '<li>' + options[i] + '</li>';
    }

    return (a + m.join("") + b);
    //document.getElementById('foo').innerHTML = a + m + b;
}

export function getShortPostcode(postcode){
  //console.log("postcode", postcode);

  if(postcode) {
    //let short_postcode = postcode.split(" ")[0];
    //console.log("short_postcode", short_postcode);
    // Check for an end section and then if present, remove it
    //var regex = '^[A-Z0-9]{3}([A-Z0-9](?=\s*[A-Z0-9]{3}|$))?';
    //var matches = postcode.match(regex);
    //console.log("matches", matches);

    /*
    if(preg_match('/ ?([0-9])[ABD-HJLNP-UW-Z]{2})$/i', postcode, $match, PREG_OFFSET_CAPTURE)) {
      short_postcode = substr(postcode, 0, $match[0][1]);
    }*/

    return postcode.substring(0, postcode.length - 3);
    //return short_postcode;
  }

}

export function round(num){
  //console.log("num", num);
  return Math.round(num * 100) / 100;
}

export function capitalizeFirstChar(string){
  if(string){
    string = string.toLowerCase();
    string = string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  return string;
}

export function maybePluralize(count, noun, suffix = 's') {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`;

  //maybePluralize(0, 'turtle'); // 0 turtles
  //maybePluralize(1, 'turtle'); // 1 turtle
  //maybePluralize(2, 'turtle'); // 2 turtles
  //maybePluralize(3, 'fox', 'es'); // 3 foxes
}

export function renderNewLineAsBreakTags(string){
  return string.replace(/\\n|\\r\\n|\\n\\r|\\r/g, '<br />');
}

export function hasExactWord(needle, string){
  let re = new RegExp(`\\b${needle}\\b`, 'gi');    
  return re.test(string);
}

export function isEmpty(v) {
    let type = typeof v;
    if (type === 'undefined') {
        return true;
    }
    if (type === 'boolean') {
        return !v;
    }
    if (v === null) {
        return true;
    }
    if (v === undefined) {
        return true;
    }
    if (v instanceof Array) {
        if (v.length < 1) {
            return true;
        }
    } else if (type === 'string') {
        if (v.length < 1) {
            return true;
        }
        if (v === '0') {
            return true;
        }
    } else if (type === 'object') {
        if (Object.keys(v).length < 1) {
            return true;
        }
    } else if (type === 'number') {
        if (v === 0) {
            return true;
        }
    }
    return false;
}

export function getDistanceFromLatLngInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

  let unit = "km";
  return d.toFixed(1) + " " + unit;
}

export function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export function convertKmToMiles(kilometers){
  // conversion factor
  const factor = 0.621371;

  // calculate miles
  const miles = kilometers * factor;

  return miles;
}

export function differenceWithTodayInDays(compareDate){
  let compareDateMoment = moment(compareDate, 'DD-MM-YYYY');
  return moment().diff(compareDate, 'days');
}

export function differenceWithTodayInMinutes(compareDate){
  let compareDateMoment = moment(compareDate, 'DD-MM-YYYY');
  return moment().diff(compareDate, 'minutes');
}

export function differenceWithTodayGranular(compareDate){
  let compareDateMoment = moment(compareDate, 'DD-MM-YYYY');

  if(moment().diff(compareDate, 'seconds') < 60){
    return moment().diff(compareDate, 'seconds') + " seconds";
  } else if(moment().diff(compareDate, 'minutes') < 60){
    return moment().diff(compareDate, 'minutes') + " minutes";
  } else if(moment().diff(compareDate, 'hours') < 24){
    return moment().diff(compareDate, 'hours') + " hours";
  } else if(moment().diff(compareDate, 'days') < 7){
    return moment().diff(compareDate, 'days') + " days";
  } else if(moment().diff(compareDate, 'weeks') < 4){
    return moment().diff(compareDate, 'weeks') + " weeks";
  } else if(moment().diff(compareDate, 'months') < 12){
    return moment().diff(compareDate, 'months') + " months";
  } else {
    return moment().diff(compareDate, 'years') + " years";
  }
}

export function daysUntilBirthday(date) {
  let birthday = moment(date);
  
  // uncomment this line to simulate it is your birthday and comment the next one to test it.
  // var today = moment("2017-03-25");
  let today = moment().format("YYYY-MM-DD");
  
  // calculate age of the person
  let age = moment(today).diff(birthday, 'years');
  moment(age).format("YYYY-MM-DD");
  //console.log('person age', age);
  
  let nextBirthday = moment(birthday).add(age, 'years');
  moment(nextBirthday).format("YYYY-MM-DD");
  
  /* added one more year in case the birthday has already passed to calculate date till next one. */
  if (nextBirthday.isSame(today)) {
    return "Cake";
  } else {
    nextBirthday = moment(birthday).add(age + 1, 'years');
    return parseInt(nextBirthday.diff(today, 'days'));
  }
}

export function getDateInYears(date) {
  return moment.duration({ years: moment(Date.now()).diff(date, "years", false), }).humanize().replace(/\D+/g, "");
}

export function getLabelFromVal(obj, key, val)  {

  if(val){
    //console.log("**HAS val", typeof val)
    //console.log("**val instanceof Array", (val instanceof Array))
    //console.log("**!val instanceof Array", (!val instanceof Array))

    if(typeof val === "string") {
    //if(!val instanceof Array){
      //console.log("**not array - good val", val)
      //console.log("**review obj", obj[key])

      let filteredObj = obj[key].find((e) => e.value === val);
      //console.log("filteredObj1", filteredObj)
      if(filteredObj){
        //console.log("filteredObj2", filteredObj)
        return filteredObj.label;
      } else{
        return "";
      }
    } else {

      let labels = [];
      for (let i=0; i< val.length; ++i) {
        let s = val[i];
        let filteredObj = obj[key].find((e) => e.value === s);

        if(filteredObj){
          labels.push(filteredObj.label);
        }
      }

      return labels.join(', ');

    }
  } else{
    return "";
  }
}

export function getDisctrict(locality){
  //console.log("xxxxxxxxthis.state.user?.location?.locality", locality)

  /*
    street_number                    -> address street number
    route                            -> the street name
    locality                         -> the city/town    
    administrative_area_level_3      -> the city/town
    administrative_area_level_1      -> the state
    postal_code                      -> zip/postal code
  */

  let district = "";

  if(locality?.locality) {
    district = locality?.locality;
  }

  if(locality?.postalTown) {
    district = locality?.postalTown;
  }

  if(locality?.route) {
    district = locality?.route;
  }

  if(locality?.administrative_area_level_1) {
    district = locality?.administrative_area_level_1;
  }  

  if(locality?.administrative_area_level_3) {
    district = locality?.administrative_area_level_3;
  }          

  return district;
}

export function getCity(locality){
  let city = "";

  if(locality?.postalTown) {
    city = locality?.postalTown;
  }

  return city;
}

export function countObject(arr){
  //const arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}

export function stringResourceHandler(resources, needle, countObj){
  // string handler
  let string = "";
  var keys = Object.keys(countObj)
  for(var i= 0; i < keys.length;i++){
    //console.log("resources", resources);
    //console.log("needle", needle);
    //console.log("keys[i]", keys[i]);
    //console.log("getLabelFromVal(resources, needle, keys[i])", getLabelFromVal(resources, needle, keys[i]))
    //console.log("getLabelFromVal(resources, countries, FR)", getLabelFromVal(resources, "countries", "FR"))
    //console.log("getLabelFromVal(resources, eyeColor, 1)", getLabelFromVal(resources, "eyeColor", "1"))
    //console.log("getLabelFromVal(resources, build, 1)", getLabelFromVal(resources, "build", "1"))

    string += getLabelFromVal(resources, needle, keys[i]) + "("+ countObj[keys[i]] +"), ";
  }
  //console.log("string", string.slice(0,-2));
  // string handler
  return string.slice(0,-2);
}

export function dataResourceHandler(resources, needle, countObj){
  // chart data handler
  let data = [];
  var keys = Object.keys(countObj)
  for(var i= 0; i < keys.length;i++){
    
    let obj = {
      "label" : getLabelFromVal(resources, needle, keys[i]),
      "value" : countObj[keys[i]]
    }

    data.push(obj);
  }

  //console.log("data", data);
  // chart data handler
  return data; 
}

export function dataForeignHandler(countObj){
  // chart data handler
  let data = [];
  var keys = Object.keys(countObj)
  for(var i= 0; i < keys.length;i++){
    
    let obj = {
      "label" : keys[i],
      "value" : countObj[keys[i]]
    }

    data.push(obj);
  }

  //console.log("dataForeignHandler data", data);
  // chart data handler
  return data; 
}
