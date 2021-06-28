// дэлгэцтэй ажиллах контроллор
var uiController = (function () {
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value,
      };
    },
    getDOMstring: function () {
      return DOMstring;
    },
  };
})();

// санхүүтэй ажиллах контоллор
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItem: {
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0,
    },
  };
})();

// прогараммыг холбогч контроллор
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log(uiController.getInput());
    //1. textBox хэсгээс хэрэглэгчийн оруулсан өгөгдлийг олж авна.
    //2. олж авсан өгөгдлүүдээ санхүүгийн контролд дамжуулж тэнд хадгална.
    //3. олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт харуулна.
    //4. Төсвийн тооцоолол хийнэ
    //5.Эцсийн үлдэгдэл тооцоог дэлгэцэнд харуулна.
  };
  var setUpEventListener = function () {
    var DOM = uiController.getDOMstring();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log("application started...");
      setUpEventListener();
    },
  };
})(uiController, financeController);
appController.init();
