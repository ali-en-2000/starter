

$(document).ready(function () {
  $(".habergure").click(function () {
    $(".right-side").toggleClass("is-active");
  });


  $.ajax({
      url: "https://fakestoreapi.com/products/categories",
      method: "GET",
      dataType: "json",
      success: function (res) {
        res.forEach((item) => {
          $(".filter select").append(
            $("<option>").text(item).attr("value", item)
          );
        });
      },
      error: function (err) {
        alert("مشکلی به وجو آمده است");
      },
    });
  

var size = 5;
function getData(size) {


  $.ajax({
    url: "https://fakestoreapi.com/products?limit=" + size,
    method: "GET",
    dataType: "json",
    success: function (res) {
      var row = "";
      var recordNumber = 1;
      res.forEach((item) => {
        row += `
                  <tr>
                  <td>${recordNumber}</td>
                  <td><img src="${item.image}" alt="${item.title}"></td>
                  <td>${item.title}</td>
                  <td>${item.price} هزار تومان</td>
                  <td>${item.category}</td>
                  <td class='delete' id='${item.id}'>حذف</td>
                  </tr>
                  `;

        recordNumber += 1;
      });

      $(".content").find("tbody").html(row);
    },
    error: function (err) {
      alert("مشکلی به وجو آمده است");
    },
  });


  
}
getData(size);


});
