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
                    <td><img src="${item.image}" class="product_img" alt="${item.title}"></td>
                    <td>${item.title}</td>
                    <td>${item.price} هزار تومان</td>
                    <td>${item.category}</td>
                    <td class="oprations">
                      <a href="/product.html?id=${item.id}"><img src="../img/edit.svg" alt="show"/></a>
                      <img src="../img/trash.svg" alt="delete" class='delete' id='${item.id}'/>
                    </td>
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

  $(document).on("change", ".table_size select", function () {
    var tableSize = $(this).val();
    if (tableSize) {
      getData(tableSize);
    } else {
      getData(5);
    }
  });

  $(document).on("click", ".delete", function () {
    if (confirm("آیا از حذف مطمئن هستید؟")) {
      var id = $(this).attr("id");
      $.ajax({
        url: "https://fakestoreapi.com/products/" + id,
        method: "DELETE",
        success: function (res, status) {
          if (status == "success") {
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

  $(document).on("change", ".filter select", function () {
    var filterValue = $(this).val();
    if (filterValue) {
      $.ajax({
        url: "https://fakestoreapi.com/products/category/" + filterValue,
        method: "GET",
        dataType: "json",
        success: function (res) {
          var row = "";
          var recordNumber = 1;

          res.forEach((item) => {
            row += `
                    <tr>
                      <td>${recordNumber}</td>
                      <td><img src="${item.image}" class="product_img" alt="${item.title}"></td>
                      <td>${item.title}</td>
                      <td>${item.price} هزار تومان</td>
                      <td>${item.category}</td>
                      <td class="oprations">
                        <a href="/product.html?id=${item.id}"><img src="../img/edit.svg" alt="show"/></a>
                        <img src="../img/trash.svg" alt="delete" class='delete' id='${item.id}'/>
                      </td>
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
    } else {
      getData(0);
    }
  });

  
});
