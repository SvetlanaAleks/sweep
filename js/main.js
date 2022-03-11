(function () {
  const urlName = document.querySelectorAll(".url-name");
  const urlSname = document.querySelectorAll(".url-sname");
  const urlMname = document.querySelectorAll(".url-mname");
  const inputWfiid = document.querySelector('input[name*="instance_id"]');

  inputWfiid.value =
    "" || new URLSearchParams(window.location.search).get("wfiid");

  for (let i = 0; i < urlName.length; i++) {
    urlName[i].innerHTML =
      "" || new URLSearchParams(window.location.search).get("fn");
  }
  for (let i = 0; i < urlSname.length; i++) {
    urlSname[i].innerHTML =
      "" || new URLSearchParams(window.location.search).get("sn");
  }
  for (let i = 0; i < urlMname.length; i++) {
    urlMname[i].innerHTML =
      "" || new URLSearchParams(window.location.search).get("mn");
  }
  //обновление линков
  localStorage.setItem("inputWfiid", inputWfiid.value);

	const months=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],monthMin = ['','','','','','','','','','','',''],days = ['วันอาทิตย์','วันจันทร์','วันอังคาร','วันพุธ','วันพฤหัส','วันศุกร์','วันเสาร์'],daysMin = ['','','','','','',''],seasons = ['ฤดูหนาว','วสันต์','หน้าร้อน','ฤดูใบไม้ร่วง'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 180;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear() + 543; const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","dayFull","monthFull","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, dayFull: getDaysName(_day, _month, _year, daysName, false), monthFull: getMonthName(_month, monthsName, false), year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getDaysName(_day, _month, _year, daysName, bigFirstLetter) {return changeFirstLetter(bigFirstLetter, daysName[new Date(_year, _month - 1, _day).getDay()])} function getMonthName(_month, monthsName, bigFirstLetter, counter) { const monthCounter = !!counter ? counter : 0; let month; _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter; _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter; return changeFirstLetter(bigFirstLetter, monthsName[month - 1]) } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}
	
  var scrollSmooth = function () {
    $(document).on("click", 'a[href^="#"]', function (event) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top,
        },
        500
      );
    });
  };

  var blank = function () {
    $(".js-form").submit(function (e) {
      e.preventDefault();
      $(".blank__input-text-date").html($(".blank__input").val() + " г.");
      $(".blank__checkbox-custom").attr("disabled", "");

      setTimeout(() => {
        $(".js-form").addClass("confirmed");
        $("html, body").animate(
          { scrollTop: $("#order").offset().top - 0 },
          "slow"
        );
      }, 700);
    });
  };

  function main() {
    scrollSmooth();
    blank();
  }

  if (document.documentElement.clientWidth < 480) {
    window.addEventListener(
      "scroll",
      function () {
        return setTimeout(main, 1000);
      },
      {
        once: true,
      }
    );
  } else {
    main();
  }
})();
