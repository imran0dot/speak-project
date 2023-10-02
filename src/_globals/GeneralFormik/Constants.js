export function getCheckboxOrMultipleLimit() {
  return 5;//current limit is 5 to convert it from checkbox to multiple field type
}

export function getLabelVisibility(item) {
    let showLabel = true;

    if(
        //item.type === "decrement_increment" ||
        item.type === "text" ||
        item.type === "email" ||
        item.type === "password" ||
        item.type === "comment" ||
        item.type === "file" ||
        item.type === "hidden" ||
        item.type === "date"
    ){
        showLabel = false;
    }

    return showLabel;
}

export function getHelperVisibility(values, item) {
    let showHelper = true;
    if(
      //(values[item.name] && values[item.name].length > 0 && item.type === "date") ||
      item.type === "range_date" ||
      item.type === "range_text" || 
      item.type === "combo_select_knob" || 
      item.type === "geo_map"
    ){
        showHelper = false;
    }

    return showHelper;
}