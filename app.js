// дэлгэцтэй ажиллах контроллор
var uiController = (function () {
  // html css-ийн class болон ID-ийг нэг object-д хийсэн
  // private data
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };
  // public function
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value, // income or expense
        description: document.querySelector(DOMstring.inputDescription).value, // description тайлбар авах хэсэг
        value: parseInt(document.querySelector(DOMstring.inputValue).value), // value буюу мөнгөн дүнг авах
      };
    },

    //html css-ийн class болон ID-ыг public type-тай буцааж байна
    getDOMstring: function () {
      return DOMstring;
    },
    // оруулах утгуудын талбарыг цэвэрлэх
    clearField: function () {
      var fields = document.querySelectorAll(
        DOMstring.inputDescription + ", " + DOMstring.inputValue
      );
      var fieldArr = Array.prototype.slice.call(fields);
      fieldArr.forEach(function (el, index, array) {
        el.value = "";
      });
      fieldArr[0].focus();
      // for (var i = 0; i < fieldArr.length; i++) {
      //   fieldArr[i].value = "";
      // }
    },
    addListItem: function (item, type) {
      // орлого зарлагын харуулсан html-ийг энд бэлтгэнэ
      var html, list;
      if (type === "inc") {
        list = DOMstring.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = DOMstring.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //тэр html дотроо орлого зарлагийн утгийг replace ашиглан өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);
      // бэлтгэсэн html-ээ DOМ-руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
  var calculateTotal = function (type) {
    sum = 0;
    data.Item[type].forEach(function () {
      sum = sum + el.value;
    });
    data.total[type] = sum;
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
    tusuv: 0,

    huvi: 0,
  };
  return {
    // Tusviin tootsooloh function
    TusuvTootsooloh: function () {
      //niit orlogo tootsooloh
      calculateTotal("inc");
      // niit zarlaga tootsooloh
      calculateTotal("exp");
      // niit orlogo zarlaga
      data.tusuv = data.total.inc - data.total.exp;
      // niit orlogos garsan zarlagin huvi
      data.huvi = Math.round((data.total.exp * 100) / data.total.inc);
    },

    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
      };
    },
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
      return item;
    },
  };
})();

// прогараммыг холбогч контроллор
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. textBox хэсгээс хэрэглэгчийн оруулсан өгөгдлийг олж авна.
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      //2.0 олж авсан өгөгдлүүдээ санхүүгийн контролд дамжуулж тэнд хадгална.
      //2.1 input дотор манай гараас авсан утгууд байгаа. тэрийгээ санхүүгийн [addItem] руу хийж байгаа
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3. олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт харуулна.
      uiController.addListItem(item, input.type);
      uiController.clearField();
      //4. Төсвийн тооцоолол хийнэ
      financeController.TusuvTootsooloh();
      //5.Эцсийн үлдэгдэл тооцоо
      var tusuv = financeController.tusviigAvah();
      //6. дэлгэцэнд харуулна.
      console.log(tusuv);
    }
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
