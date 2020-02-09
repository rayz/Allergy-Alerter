var API_KEY = "a6453cb8045340ee83dd24c23f3d7505"

function query(){
  var productInput = document.getElementById("product");
  product = productInput.value;

  var products = search_products(product);
  var product_data = JSON.parse(products).results;
  
  console.log(product_data);
  if(!product_data){
    console.log("500!")
    return
  }
  //var display_data = [];
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
  for(i=0;i<product_data.length&&i<5; i++){
    var info = product_info(product_data[i].sku);
    var parsedInfo = JSON.parse(info)

    var brand = parsedInfo.brand;
    var name = parsedInfo.name;
    var ingredients = parsedInfo.ingredients;

    /*display_data.push(parsedInfo.brand+", "+
      parsedInfo.name+" </br>"+
      parsedInfo.ingredients+" </br></br>");

    /*display_data.push(parsedInfo.brand+" ")
    display_data.push(parsedInfo.name+" ")
    display_data.push("</br>")
    display_data.push(parsedInfo.ingredients+" ")
    display_data.push("</br></br>")*/
    
    var allergenInput = document.getElementById("allergen");
    allergen = allergenInput.value;
    
    var indiv_ing = ingredients[0].split(", ");
    if(indiv_ing.includes(allergen)){
      outputDiv.innerHTML = outputDiv.innerHTML+
        "<div class='allergen'>"+
        brand+", "+
        name+" </br>"+
        ingredients+"</br></br>"
    }else{
      outputDiv.innerHTML = outputDiv.innerHTML+
        "<div>"+
        brand+", "+
        name+" </br>"+
        ingredients+"</br></br>"
    }
  }
  var outputDiv = document.getElementById("output");
  //outputDiv.innerHTML = display_data;
}

function search_products(term){
  var searchURL = `https://api.wegmans.io/products/search?query=${term}&api-version=2018-10-18&subscription-key=${API_KEY}`;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", searchURL, false);
  xmlHttp.send();
  return xmlHttp.responseText;
}

function product_info(sku){
  var searchURL = `https://api.wegmans.io/products/${sku}?api-version=2018-10-18&Subscription-Key=${API_KEY}`;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", searchURL, false);
  xmlHttp.send();
  return xmlHttp.responseText;
}