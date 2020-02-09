var API_KEY = "a6453cb8045340ee83dd24c23f3d7505"

function query(){
  var inputBar = document.getElementById("input");
  var input = inputBar.value;
  console.log(input);

  var products = JSON.parse(search_products(input));
  var product_data = products.results;

  var display_data = [];
  for(i=0;i<product_data.length&&i<10; i++){
    var info = JSON.parse(product_info(product_data[i].sku));
    display_data.push(info.brand+" ");
    display_data.push(info.name+" ")
    display_data.push("</br>")
    display_data.push(info.ingredients+" ")
    display_data.push("</br></br>")
  }
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = display_data;
}

function search_products(term){
  var searchURL = `https://api.wegmans.io/products/search?query=${term}&api-version=2018-10-18&subscription-key=${API_KEY}`;

  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", searchURL, false );
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function product_info(sku){
  var searchURL = `https://api.wegmans.io/products/${sku}?api-version=2018-10-18&Subscription-Key=${API_KEY}`;
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", searchURL, false );
  xmlHttp.send(null);
  return xmlHttp.responseText;
}