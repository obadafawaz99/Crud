let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btn = document.getElementById("btn");
let btnsearcht = document.getElementById("btnsearcht");
let btnsreachc = document.getElementById("btnsreachc");
let deletAll = document.getElementById("deletAll");
let search = document.getElementById("search");
let mood = "create";
let tmp;
let moodSearch = title;

// total of price
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}
let newPro = [];

if (localStorage.getItem("product")) {
  newPro = JSON.parse(localStorage.getItem("product"));
  showData();
}
/////////Create an object
btn.onclick = function () {
  let pro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood === "create") {
      if (pro.count > 1) {
        for (let i = 0; i < pro.count; i++) {
          newPro.push(pro);
        }
      } else {
        newPro.push(pro);
      }
    } else {
      newPro[tmp] = pro;
      mood = "create";
      btn.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(newPro));
  showData();
};
////////Clear after creat an object
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "red";
}
/////Show All Data
function showData() {
  let tabel = "";
  for (let i = 0; i < newPro.length; i++) {
    tabel += `
              <tr>
                <td>${i}</td>
                <td>${newPro[i].title}</td>
                <td>${newPro[i].price}</td>
                <td>${newPro[i].taxes}</td>
                <td>${newPro[i].discount}</td>
                <td>${newPro[i].ads}</td>
                <td>${newPro[i].total}</td>
                <td>${newPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletData(${i})" id="delete">delete</button></td>
              </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = tabel;
  let deletAl = document.getElementById("deletAll");
  if (newPro.length > 0) {
    deletAl.innerHTML = `<button onclick="deletA()">deleteAll( ${newPro.length} )</button>`;
  } else {
    deletAl.innerHTML = "";
  }
  console.log("hY");
}
////Delete an object
function deletData(i) {
  newPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(newPro));
  showData();
}
/////Delet All object
function deletA() {
  newPro = [];
  localStorage.removeItem("product");
  showData();
}
//// UpDate The object
function updateData(i) {
  title.value = newPro[i].title;
  price.value = newPro[i].price;
  taxes.value = newPro[i].taxes;
  ads.value = newPro[i].ads;
  discount.value = newPro[i].discount;
  category.value = newPro[i].category;
  mood = "update";
  getTotal();
  count.style.display = "none";
  btn.innerHTML = "upDate";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//// type of search
function getid(id) {
  let search = document.getElementById("search");
  if (id == "btnsreachc") {
    moodSearch = "category";
  } else {
    moodSearch = "title";
  }
  search.focus();
  search.placeholder = "search by " + moodSearch;
  search.value = "";
  showData();
}
//// searching
function searchdata(value) {
  let tabel = "";
  for (let i = 0; i < newPro.length; i++) {
    if (moodSearch === "category") {
      {
        if (newPro[i].category.toLowerCase().includes(value.toLowerCase())) {
          {
            {
              tabel += `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${newPro[i].title}</td>
                      <td>${newPro[i].price}</td>
                      <td>${newPro[i].taxes}</td>
                      <td>${newPro[i].discount}</td>
                      <td>${newPro[i].ads}</td>
                      <td>${newPro[i].total}</td>
                      <td>${newPro[i].category}</td>
                      <td><button onclick="updateData(${i})" id="update">update</button></td>
                      <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                      </tr>
          `;
            }
          }
        }
      }
    } else {
      {
        if (newPro[i].title.toLowerCase().includes(value.toLowerCase())) {
          tabel += `
                          <tr>
                            <td>${i + 1}</td>
                            <td>${newPro[i].title}</td>
                            <td>${newPro[i].price}</td>
                            <td>${newPro[i].taxes}</td>
                            <td>${newPro[i].discount}</td>
                            <td>${newPro[i].ads}</td>
                            <td>${newPro[i].total}</td>
                            <td>${newPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                          </tr>
                `;
        }
      }
    }
    document.getElementById("tbody").innerHTML = tabel;
  }
}
