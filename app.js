// дэлгэцтэй ажиллах контроллор
var uiController = (function () {
  // html css-ийн class болон ID-ийг нэг object-д хийсэн
  // private data
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  // public function
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value, // income or expense
        description: document.querySelector(DOMstring.inputDescription).value, // description тайлбар авах хэсэг
        value: document.querySelector(DOMstring.inputValue).value, // value буюу мөнгөн дүнг авах
      };
    },
    //html css-ийн class болон ID-ыг public type-тай буцааж байна
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
  // орлого зарлагийг нэг объектэд хадаглаж байна.
  var data = {
    Item: {
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    // public data
    addItem: function (type, desc, val) {
      var item, id;
      // массив доторх урт нь 0 байвал id-ийн 1 ээр өгч байгаа
      if (data.Item[type].length === 0) id = 1;
      // массив дотороос элетэнт устагаж байгаа тохиолдолд массивийн уртас хасанж ID-г 1 ээр нэмнэ.
      else {
        id = data.Item[type][data.Item[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        // type === exp
        item = new Expense(id, desc, val);
      }
      data.Item[type].push(item);
    },
  };
})();

// прогараммыг холбогч контроллор
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. textBox хэсгээс хэрэглэгчийн оруулсан өгөгдлийг олж авна.
    var input = uiController.getInput();
    //2.0 олж авсан өгөгдлүүдээ санхүүгийн контролд дамжуулж тэнд хадгална.
    //2.1 input дотор манай гараас авсан утгууд байгаа. тэрийгээ санхүүгийн [addItem] руу хийж байгаа
    financeController.addItem(input.type, input.description, input.value);
    //3. олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт харуулна.
    //4. Төсвийн тооцоолол хийнэ
    //5.Эцсийн үлдэгдэл тооцоог дэлгэцэнд харуулна.
  };
  // бүх event-ийг нэг функц дотор хийсэн
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
  // setUpEventListener функц маань private төрөлтэй байгаа учир түүнийг [public] төрөлтэй appcontroller- руу буцааж байна
  return {
    init: function () {
      console.log("application started...");
      setUpEventListener();
    },
  };
})(uiController, financeController);
appController.init();
