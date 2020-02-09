function query(){
  var productInput = document.getElementById("product");
  product = productInput.value;

  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "Searching...";

  var products = search_products(product);
  var product_data = JSON.parse(products).results;
  
  if(!product_data){
    console.log("500!")
    outputDiv.innerHTML = "Your query received a 500 Server error from the request. </br> Please try again later. </br> (Note: case-sensitive)";
    //setTimeout("query()", 10);
    //setTimeout("document.location.reload()", 3000)
    return
  }
  
  outputDiv.innerHTML = "";
  for(i=0;i<product_data.length&&i<10; i++){
    var info = product_info(product_data[i].sku);
    var parsedInfo = JSON.parse(info)

    var brand = parsedInfo.brand;
    var name = parsedInfo.name;
    var ingredients = parsedInfo.ingredients[0];
    if(ingredients){
      ingredients = ingredients.substring(0,ingredients.length-1);
      
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