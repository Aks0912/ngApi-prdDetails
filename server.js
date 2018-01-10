
/***************Fecth data using mongodb where its is realted to model***********/
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var app = express();

var port = process.env.PORT||3300; 
var commanRouter = express.Router();

commanRouter.route('/getProductDetails')
    .get(function(req,res){
    	let prdId = req.params.ProductId;
    	console.log(prdId);

    	let query = {"ProductId": '"'+ prdId + '"'};
    	var url = 'mongodb://root:admin@ds127536.mlab.com:27536/dbsansmercy'
    	mongodb.connect(url, (err, db) => {  
			  if (err) {
			    return console.log(err);
			  }
			  db.collection('products').find(query).toArray(
            	function(err,data){
					if(err)
					   
					   res.status(500).send(err);
					else
						console.log(prdId);
						res.setHeader('Access-Control-Allow-Origin','*')
		    		    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
						res.json(data);
		})
		})
		
});

app.use('/api', commanRouter);

app.get('/',function(req,res){
	console.log("app.get method:....", req);
	res.send("Working")
});
app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
	console.log("running");
});
