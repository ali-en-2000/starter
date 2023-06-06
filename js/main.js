$('.habergure').click(function () {
    $('.right-side').toggleClass('is-active');
    $('.left-side').toggleClass('is-active');
})


$(document).ready(function () {
    var skip = 0;
    function getData(skip) {
      $.ajax({
        url: 'https://dummyjson.com/products?limit=10&skip='+skip+'&select=title,price',
        method: "GET",
        dataType: "json",
        success: function (res, status, jqXHR) {
          var row = "";
          res.products.forEach((item) => {
            row += `
                    <tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.price} هزار تومان</td>
                    <td class='delete' id='${item.id}'>حذف</td>
                    </tr>
                    `;
          });
  
          $(".content").find("tbody").html(row);
        },
        error: function (err) {
          alert("مشکلی به وجو آمده است");
        },
      });
    }
    getData(skip);
  
    $(".next").click(function () {
      if (skip <= 80) {
        skip += 10;
        getData(skip);
      }
    });
    $(".prev").click(function () {
      if (skip >= 10) {
        skip -= 10;
        getData(skip);
      }
    });
  
    $(document).on("click", ".delete", function () {
      if (confirm("آیا از حذف مطمئن هستید؟")) {
        var id = $(this).attr("id");
        $.ajax({
          url: 'https://dummyjson.com/products/' + id,
          method: "DELETE",
          success: function (res, status, jqXHR) {
            if (res.isDeleted == true) {
              alert("با موفقیت حذف شد");
            } else {
              alert("حذف نشد");
            }
          },
          error: function (err) {
            alert("مشکلی به وجو آمده است");
          },
        });
      }
    });
  
    $(document).on("click", ".search-btn", function () {
      var searchValue = $('input[type="search"]').val();
      if (searchValue) {
        $.ajax({
          url: 'https://dummyjson.com/products/search?q='+searchValue,
          method: "GET",
          dataType: "json",
          success: function (res, status, jqXHR) {
            var row = "";
            res.products.forEach((item) => {
              row += `
                                  <tr>
                                  <td>${item.id}</td>
                                  <td>${item.title}</td>
                                  <td>${item.price} هزار تومان</td>
                                  <td class='delete' id='${item.id}'>حذف</td>
                                  </tr>
                                  `;
            });
            $(".content").find("tbody").html(row);
          },
          error: function (err) {
            alert("مشکلی به وجو آمده است");
          },
        });
      } else {
        getData(0);
      }
    });
  
    $(document).on("change", ".filter select", function () {
      var filterValue = $(this).val();
      if (filterValue) {
        $.ajax({
          url: 'https://dummyjson.com/products/category/'+filterValue,
          method: "GET",
          dataType: "json",
          success: function (res, status, jqXHR) {
            var row = "";
            res.products.forEach((item) => {
              row += `
                                  <tr>
                                  <td>${item.id}</td>
                                  <td>${item.title}</td>
                                  <td>${item.price} هزار تومان</td>
                                  <td class='delete' id='${item.id}'>حذف</td>
                                  </tr>
                                  `;
            });
            $(".content").find("tbody").html(row);
          },
          error: function (err) {
            alert("مشکلی به وجو آمده است");
          },
        });
      } else {
        getData(0);
      }
    });
  });