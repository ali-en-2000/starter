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

  $(".setting-form").submit(function (e) {
    e.preventDefault();
    const username = $("#name");
    const email = $("#email");
    const password = $("#password");
    const confirmPassword = $("#confirmPassword");

    var errorCount = 0,
      errorContent = "";

    if (username.val().trim() === "") {
      username.addClass("error");
      errorContent += "<p>فیلد اسم را پر کنید</p>";
      errorCount++;
    } else {
      username.removeClass("error");
    }

    if (email.val().trim() === "") {
      email.addClass("error");
      errorContent += "<p>فیلد ایمیل را پر کنید</p>";
      errorCount++;
    } 
    // else if (!validateEmail(email.val())) {
    //   email.addClass("error");
    //   errorContent += "<p>فیلد ایمیل به درستی وارد نشده است</p>";
    //   errorCount++;
    // }
     else {
      email.removeClass("error");
    }

    if (password.val().trim() === "") {
      password.addClass("error");
      errorContent += "<p>فیلد رمز عبور را پر کنید</p>";
      errorCount++;
    } else {
      password.removeClass("error");
    }

    if (confirmPassword.val().trim() === "") {
      confirmPassword.addClass("error");
      errorContent += "<p>فیلد تکرار رمز عبور را پر کنید</p>";
      errorCount++;
    } else if (confirmPassword.val().trim() !== password.val().trim()) {
      confirmPassword.addClass("error");
      errorContent += "<p>عدم تطابق پسورد</p>";
      errorCount++;
    } else {
      confirmPassword.removeClass("error");
    }
    $("#formErrors").html(errorContent);

    if (errorCount === 0) {
      $(".main-content").addClass("shadowSucces");
      $(".main-content").removeClass("shadowError");
    } else {
      $(".main-content").addClass("shadowError");
      $(".main-content").removeClass("shadowSucces");
    }
  });

  // function validateEmail(email) {
  //   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   return regex.test(email);
  // }
});
