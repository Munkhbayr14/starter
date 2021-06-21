// дэлгэцтэй ажиллах контроллор
var uiController = (function () {})();

// санхүүтэй ажиллах контоллор
var financeController = (function () {})();

// прогараммыг холбогч контроллор
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log("sds");
    //1. textBox хэсгээс хэрэглэгчийн оруулсан өгөгдлийг олж авна.
    //2. олж авсан өгөгдлүүдээ санхүүгийн контролд дамжуулж тэнд хадгална.
    //3. олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт харуулна.
    //4. Төсвийн тооцоолол хийнэ
    //5.Эцсийн үлдэгдэл тооцоог дэлгэцэнд харуулна.
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
