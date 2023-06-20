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

  





  
});
