const express = require('express')
const app = express();
var scrap = require('scrap');

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get('/search', (req, res) => {
	var tosearch = "leche"
	scrap('https://bodegaaurrera.net/busqueda/?search='+tosearch, function(err, $) {
		console.log("success")
		console.log($('.co-inicio-int').find('.row'))
        var rowItems = $('.co-inicio-int').find('.row')[1]
        console.log("rowItems: "+rowItems);        
		var items = $(rowItems).find('.thumbnail')
        
		var toPrint = []
		for (var i = 0; i < items.length; i++) {
			console.log("THUMBNAIL " + $(items[i]).find('.caption').find('.title-producto'))
			var producto = $(items[i]).find('.caption').find('.title-producto').text()
			var precio = $(items[i]).find('.caption').find('.title-precio').text()
			toPrint.push({producto:producto, precio:precio})
		}
  		
  		res.send(toPrint)
	});
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});