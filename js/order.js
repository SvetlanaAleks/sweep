//start scroll

// (function (root) {
var isOn = false;
var scrollbarSize;
var scrollTop;

function getScrollbarSize() {
  if (typeof scrollbarSize !== "undefined") return scrollbarSize;

  var doc = document.documentElement;
  var dummyScroller = document.createElement("div");
  dummyScroller.setAttribute(
    "style",
    "width:99px;height:99px;" + "position:absolute;top:-9999px;overflow:scroll;"
  );
  doc.appendChild(dummyScroller);
  scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth;
  doc.removeChild(dummyScroller);
  return scrollbarSize;
}

function hasScrollbar() {
  return document.documentElement.scrollHeight > window.innerHeight;
}

function on(options) {
  if (typeof document === "undefined" || isOn) return;
  var doc = document.documentElement;
  scrollTop = window.pageYOffset;
  if (hasScrollbar()) {
    doc.style.width = "calc(100% - " + getScrollbarSize() + "px)";
  } else {
    doc.style.width = "100%";
  }
  doc.style.position = "fixed";
  doc.style.top = -scrollTop + "px";
  doc.style.overflow = "hidden";
  isOn = true;
}

function off() {
  if (typeof document === "undefined" || !isOn) return;
  var doc = document.documentElement;
  doc.style.width = "";
  doc.style.position = "";
  doc.style.top = "";
  doc.style.overflow = "";
  window.scroll(0, scrollTop);
  isOn = false;
}

function toggle() {
  if (isOn) {
    off();
    return;
  }
  on();
}

var noScroll = {
  on: on,
  off: off,
  toggle: toggle,
};

//   if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
//     module.exports = noScroll;
//   } else {
//     root.noScroll = noScroll;
//   }
// })(window);

//end scroll

var Popup = (function () {
  var popUpBlock = $(".js-popup");
  var overlay = $(".js-overlay");
  var linkShowPopUp = $(".js-show-popup");

  var srcProductPlace = $(".js-src-product-place");
  var nameProductPlace = $(".js-name-product-place");
  var descProductPlace = $(".js-desc-product-place");
  var priceValueProductPlace = $(".js-price-value-product-place");
  var priceCurrencyProductPlace = $(".js-price-currency-product-place");

  function calculatePrice(target) {
    var valueDelivery = target.find(".js-price-value-delivery").text();
    var valueProduct = target.find(".js-price-value-product-place").text();
    var price = parseInt(valueDelivery) + parseInt(valueProduct);
    target.find(priceValueProductPlace).text(price);

    $(`input[name="delivery_price"]`).val(valueDelivery);
    $(`input[name="price"]`).val(price);
  }

  return {
    initPopup: function initPopup() {
      linkShowPopUp.click(function (e) {
        e.preventDefault();
        var _this = $(this);

        var target = $(_this.data("target"));
        var parent = _this.parents(".js-product-cart");
        noScroll.on();

        //id
        var idProduct = parent.data("id");
        target.find(`input[name="product_id"]`).val(idProduct);

        var srcProduct = parent.find(".js-src-product").attr("src");
        var nameProduct = parent.find(".js-name-product").text();
        var descProduct = parent.find(".js-desc-product").text();
        var priceValueProduct = parent.find(".js-price-value-product").text();
        var priceCurrencyProduct = parent
          .find(".js-price-currency-product")
          .text();

        target.find(srcProductPlace).attr("src", srcProduct);
        target.find(nameProductPlace).text(nameProduct);
        target.find(descProductPlace).text(descProduct);
        target.find(priceValueProductPlace).text(priceValueProduct);
        target
          .find(priceValueProductPlace)
          .attr("data-price", priceValueProduct);
        target.find(priceCurrencyProductPlace).text(priceCurrencyProduct);

        calculatePrice(target);

        target.toggleClass("active");
        overlay.addClass("active");
      });
    },
    closePopup: function closePopup() {
      $(".js-close").click(function (e) {
        e.preventDefault();
        noScroll.off();
        popUpBlock.removeClass("active");
        overlay.removeClass("active");
      });
      $(document).mouseup(function (e) {
        var div = $(".popup");
        if (div.is(e.target) && div.has(e.target).length === 0) {
          noScroll.off();
          popUpBlock.removeClass("active");
          overlay.removeClass("active");
        }
      });
    },
    init: function init() {
      Popup.initPopup();
      Popup.closePopup();
    },
  };
})();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Slider = (function () {
  return {
    initProductSlider: function initProductSlider() {
      $(".js-product-cart").each(function () {
        var _$$slick;

        $(".js-product-slider", this).slick(
          ((_$$slick = {
            asNavFor: $(".js-product-slider-desc", this),
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }),
          _defineProperty(_$$slick, "infinite", false),
          _defineProperty(
            _$$slick,
            "prevArrow",
            '<button class="prev"><svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4521 3.15615C13.1826 2.43414 13.1826 1.26352 12.4521 0.541509C11.7216 -0.180503 10.5372 -0.180503 9.80673 0.541509L0.547878 9.69274C-0.182626 10.4148 -0.182626 11.5854 0.547878 12.3074C1.27838 13.0294 2.46276 13.0294 3.19327 12.3074L12.4521 3.15615Z" fill="#FF7122"/><path d="M9.80671 21.4585C10.5372 22.1805 11.7216 22.1805 12.4521 21.4585C13.1826 20.7365 13.1826 19.5659 12.4521 18.8439L3.19324 9.69261C2.46274 8.9706 1.27838 8.97073 0.547878 9.69274C-0.182626 10.4148 -0.182626 11.5854 0.547878 12.3074L9.80671 21.4585Z" fill="#FF7122"/></svg></button>'
          ),
          _defineProperty(
            _$$slick,
            "nextArrow",
            '<button class="next"><svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.547878 18.8439C-0.182625 19.5659 -0.182625 20.7365 0.547878 21.4585C1.27838 22.1805 2.46276 22.1805 3.19327 21.4585L12.4521 12.3073C13.1826 11.5852 13.1826 10.4146 12.4521 9.69262C11.7216 8.9706 10.5372 8.9706 9.80673 9.69262L0.547878 18.8439Z" fill="#FF7122"/><path d="M3.19329 0.541512C2.46278 -0.1805 1.2784 -0.1805 0.547898 0.541512C-0.182606 1.26353 -0.182606 2.43414 0.547898 3.15615L9.80675 12.3074C10.5373 13.0294 11.7216 13.0293 12.4521 12.3073C13.1826 11.5852 13.1826 10.4146 12.4521 9.69262L3.19329 0.541512Z" fill="#FF7122"/></svg></button>'
          ),
          _$$slick)
        );
        $(".js-product-slider-desc", this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: $(".js-product-slider", this),
          infinite: false,
          draggable: false,
        });
      });
    },
    init: function init() {
      Slider.initProductSlider();
    },
  };
})();

function func() {
  $(`[data-mask="phone"]`).attr("autocomplete", "new-password");
  Slider.init();
  Popup.init();
}

if (document.documentElement.clientWidth < 480) {
  window.addEventListener(
    "scroll",
    function () {
      return setTimeout(func, 1000);
    },
    {
      once: true,
    }
  );
} else {
  func();
}

$(document).ready(function () {
  const location = window.location.href;
  const anchor = location.split("#")[1];
  if (anchor) {
    const block = $("#" + anchor);
    if (block.length) {
      const offset = block.offset();
      const top = offset.top;
      $("html, body").animate(
        {
          scrollTop: top - 30,
        },
        500
      );
    }
  }
});

//imask

document.addEventListener("DOMContentLoaded", () => {
  function mask(dataValue, options) {
    const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`);
    if (!elements) return;

    if (dataValue === "postal_code") {
      elements.forEach((el) => {
        IMask(el, options).on("accept", function () {
          el.classList.add("error");
          el.previousElementSibling.classList.add("show");
          if (el.value.length === 5 || el.value.length === 0) {
            el.classList.remove("error");
            el.previousElementSibling.classList.remove("show");
          }
        });
      });
    } else {
      elements.forEach((el) => {
        IMask(el, options)
          .on("accept", function () {
            el.classList.add("error");
          })
          .on("complete", function () {
            el.classList.remove("error");
          });
      });
    }
  }

  // Маска для номера телефона
  mask("phone", {
    mask: "{\\0} #@@ @@@ @@@",
    definitions: {
      // <any single char>: <same type as mask (RegExp, Function, etc.)>
      // defaults are '0', 'a', '*'
      "#": /[1-9]/,
      "@": /[0-9]/,
    },
  });

  // Маска для карты
  mask("card", {
    mask: "0000-0000-0000-0000",
  });
  // Маска для имени и фамилии
  mask("name", {
    mask: /^[ก-ฮa-zA-Z_-\s]{0,25}$/,
  });
  // Маска для возраста
  mask("age", {
    mask: Number,
    min: 18,
    max: 100,
    maxLength: 3,
  });
  //Маска для индекса
  mask("postal_code", {
    mask: "00000",
  });

  //Маска для улицы
  mask("street", {
    mask: /^[0-9ก-ฮa-zA-Z-\s]{0,44}$/,
  });
  //Маска для дома
  mask("building", {
    mask: /^[0-9ก-ฮa-zA-Z/-\s]{0,8}$/,
  });
  //Маска для адреса
  mask("address", {
    mask: /^[0-9ก-ฮa-zA-Z/-\s]{0,8}$/,
  });
  //Маска для года рождения
  mask("birthday", {
    mask: "0000",
  });

  //Маска для ФИО
  mask("name_confidant", {
    mask: /^[ก-ฮa-zA-Z-\s]{0,60}$/,
  });

  //Маска для секретного кода
  mask("code", {
    mask: /^[0-9ก-ฮa-zA-Z]{0,6}$/,
  });
});

var inputs = $(".popup-form__input");
$(".popup-form__btn").click(function (e) {
  for (let i = 0; i < inputs.length; i++) {
    const input = $(inputs[i]);
    if (input.hasClass("error")) {
      e.preventDefault();
    } else {
    }
  }
});

//подставляем имя, фамилию в форму заказа
var firstName = document.querySelectorAll(".js-first_name");
var lastName = document.querySelectorAll(".js-last_name");

function writeData(selectop, get) {
  for (let i = 0; i < selectop.length; i++) {
    selectop[i].value =
      "" || new URLSearchParams(window.location.search).get(get);
  }
}

writeData(firstName, "fn");
writeData(lastName, "sn");

// Выводим данные из URL в консоль
function parseUrlData() {
  let str = window.location.search;
  let objURL = {};

  str.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function ($0, $1, $2, $3) {
      objURL[$1] = $3;
    }
  );
  return objURL;
}

parseUrlData();

function fetchData(url, cb = () => {}) {
  $.ajax({
    url: url,
  })
    .done((data) => {
      cb(data);
    })
    .fail((err) => {
      console.error("error get data");
    });
}

//провинции Таиланда
fetchData(`https://geoapi.my-win.ru/th/locations/7`, (data) => {
  $(".select-provinces").select2({
    width: "100%",
    placeholder: "เลือกจังหวัด",
    data: data,
  });
});

//регионы Таиланда
fetchData(`https://geoapi.my-win.ru/th/locations/8`, (data) => {
  $(".select-region").select2({
    width: "100%",
    placeholder: "เลือกเขต",
    data: data,
  });
});

// обнуляем localStorage
localStorage.clear();

// Получаем значения полей формы, записываем их в localStorage
function parseOrderFormInputs() {
  const orderForm = document.querySelector(".x_order_form");
  const formFields = orderForm.querySelectorAll("input");
  const formSelects = orderForm.querySelectorAll("select");
  const formFieldsData = {};

  window.document.location = "./subscribe.html";

  for (let i = 0; i < formFields.length; i++) {
    localStorage.setItem(`${formFields[i].name}`, formFields[i].value);
  }
  for (let i = 0; i < formSelects.length; i++) {
    localStorage.setItem(`${formSelects[i].name}`, formSelects[i].value);
  }

  return formFieldsData;
}

document
  .querySelector(".x_order_form")
  .addEventListener("submit", parseOrderFormInputs);
