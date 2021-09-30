const AWS = require("aws-sdk");
const express = require("express");
const { nanoid } = require('nanoid');
const app = express();
const cors=require('cors');
require('dotenv').config();
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.DB_accessKeyId,
  secretAccessKey: process.env.DB_secretAccessKey,
});
app.use(cors());
app.use(express.json());
app.get("/product/:id", async (req, res) => {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "border-free-products",
    Key: {
      id: req.params.id,
    },
  };
  try {
    const data = await docClient.get(params).promise();
    res.json(data.Item);
  } catch (err) {
    res.json(err);
  }
});

app.post('/cart/products',async (req, res) => {
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName:"border-free-cart",
        Item:{
            cartId:nanoid(10),
           product:req.body.prodid
        }
    };
    try{
        const data = await docClient.put(params).promise();
        res.json({"status":"ok"});
    }
    catch(err){
        res.json(err);
    }

})

app.get('/cart/products',async (req, res) => {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName:"border-free-cart",
    }
    var itemArray=[];
    try{
    
        const data = await docClient.scan(params).promise();
       
           for(item of data.Items) {
            let data1=await docClient.get({TableName:"border-free-products",Key:{id:item.product}}).promise();
            console.log(data1);
           itemArray.push(data1.Item);  
          
     
           }
        res.json(itemArray);        
        
    }
    catch(err){
        res.json(err);
    }
})
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port");
});
