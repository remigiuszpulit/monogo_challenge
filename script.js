const https = require("https");
const fs = require("fs");

const file = fs.createWriteStream("data.txt");

https.get("https://www.monogo.pl/competition/input.txt", response => {
  const stream = response.pipe(file);
  stream.on("finish", function() {
    const data = fs.readFileSync('data.txt', "utf-8" )

    
    const dataObject = JSON.parse(data)
    const groupedProducts = dataObject.products.map((product) => {
      const color = dataObject.colors.filter((color) => color.id === product.id)
      
      const size = dataObject.sizes.filter((size) => parseInt(size.id, 10) === product.id)
      
      return {
        ...product, color: color[0].value, size: size[0].value
      }
      
    })
    const filteredProducts = groupedProducts.filter((product) => dataObject.selectedFilters.colors.includes(product.color) && dataObject.selectedFilters.sizes.includes(product.size) && product.price > 200 )
    const prices = filteredProducts.map(product => product.price)
    const maxMinMultiplied = Math.round(Math.max(...prices) * Math.min(...prices))
    const digitArr = Array.from(String(maxMinMultiplied), Number);
    const multipliedArr = []
    
    for (let i = 1; i < digitArr.length; i++) {
      if (i % 2 !== 0) {
        multipliedArr.push(digitArr[i] + digitArr[i-1])
      }
      
    }

    const monogoName = "Monogo"
    const monogoBuilding = 14
    const monogoBuildingIndex = multipliedArr.indexOf(monogoBuilding)

    const solution = monogoName.length * monogoBuildingIndex * maxMinMultiplied
  

    console.log(solution);

  });
});