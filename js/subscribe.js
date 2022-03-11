function setPosition() {
  var content = document.querySelector(".thanks__container");
  var windowHeight = window.innerHeight;
  var contentHeight = content.offsetHeight;
  if (windowHeight - contentHeight < 50) {
    content.style.marginTop = "25px";
    content.style.paddingBottom = "25px";
  } else {
    content.style.marginTop = (windowHeight - contentHeight) / 2 + "px";
    content.style.paddingBottom = 0;
  }
}

function main() {
  setPosition();
  window.addEventListener("resize", setPosition);
}

setTimeout(main, 100);

// Выводим данные
function showData() {
	let data = {};
	let orderlinessArr = ['instance_id', 'first_name', 'middle_name', 'last_name', 'province', 'district', 'subdistrict', 'street', 'building', 'flat', 'delivery_type', 'price', 'currency', 'country_code'];
	let result;

	for (let i = 0; i < Object.keys(localStorage).length; i++) {
		if (Object.keys(localStorage)[i] === 'campaign_id' || Object.keys(localStorage)[i] === 'es_list_id' ||
				Object.keys(localStorage)[i] === 'goal_id' || Object.keys(localStorage)[i] === 'inputWfiid' ||
				Object.keys(localStorage)[i] === 'landing_id' || Object.keys(localStorage)[i] === 'offsetTop' || 
				Object.keys(localStorage)[i] === 'terms_agree' || Object.keys(localStorage)[i] === 'conditions'){
			continue;
		}
		data[Object.keys(localStorage)[i]] = localStorage.getItem(Object.keys(localStorage)[i]);
	}
	result = sortData(orderlinessArr, data);
	console.table(result);
}

function sortData(params, data) {
  let first = {};
  let second = {};
  for(let i = 0; i < params.length; i++) {
    for(key in data) {
      if (params[i] === key) {
        first[key] = data[key];
      } else {
        second[key] = data[key];
      }
    }
  }  
  let res = Object.assign(first, second);
  return res
}
