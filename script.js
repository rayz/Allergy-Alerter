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
  for(i=0;i<product_data.length&&i<10; i++){
    var info = product_info(product_data[i].sku);
    var parsedInfo = JSON.parse(info)

    var brand = parsedInfo.brand;
    var name = parsedInfo.name;
    var ingredients = parsedInfo.ingredients[0];
    if(ingredients){
      ingredients = ingredients.substring(0,ingredients.length-1);

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

      var indiv_ing = ingredients.split(", ");
      if(indiv_ing.includes(allergen)){
        outputDiv.innerHTML = outputDiv.innerHTML+
          "<div class='allergen'><div class='product'>"+
          brand+", "+
          name+"</div></br><div class = 'ingredients'>"+
          ingredients+"</div></br>";
      }else{
        outputDiv.innerHTML = outputDiv.innerHTML+
          "<div><div class='product'>"+
          brand+", "+
          name+"</div></br><div class = 'ingredients'>"+
          ingredients+"</div></br>";
      }
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