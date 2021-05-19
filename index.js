const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require("uuid/v1");
const fs = require("fs");
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static('spa'));
function readDatabase(){
    return JSON.parse(fs.readFileSync("db.json"))["products"];
}
function writeDatabase(content){
    fs.writeFileSync("db.json", JSON.stringify({products: content}), "utf8", err => {
        if (err){
            console.log(err);
        }
    });
}
app.post("/products", (req, res) => {
    const productsList = readDatabase();
    const newProduct = req.body;
    newProduct.id = uuidv1();
    const newProductsList = [...productsList, newProduct];
    writeDatabase(newProductsList);
    res.json(newProduct);
});
app.get("/products/:id", (req, res) => {
    const productsList = readDatabase();
    const productID = req.params.id;
    let found = false;
    let foundProduct;
    productsList.forEach(product => {
        if (productID === product.id){
            found = true;
            foundProduct = product;
        }
    });
    if (found){
        res.json(foundProduct);
    } else {
        res.status(404).send(`Product ${productID} was not found`);
    }
});
app.get("/products", (req, res) => {
    const productsList = readDatabase();
    res.json(productsList);
});
app.put("/products/:id", (req, res) => {
    const productsList = readDatabase();
    const productID = req.params.id;
    const newProduct = req.body;
    newProduct.id = productID;
    found = false;
    const newProductsList = productsList.map((product) => {
        if (product.id === productID){
            found = true;
            return newProduct;
        }
        return product;
    });
    writeDatabase(newProductsList);
    if (found){
        res.json(newProduct);
    } else {
        res.status(404).send(`Product ${productID} was not found`);
    }
});
app.delete("/products/:id", (req, res) => {
    const productsList = readDatabase();
    const productID = req.params.id;
    const newProductsList = productsList.filter((product) => product.id !== productID);
    if (productsList.length !== newProductsList.length){
        res.status(200).send(`Product ${productID} was removed`);
        writeDatabase(newProductsList);
    } else {
        res.status(404).send(`Product ${productID} was not found`);
    }
});
app.listen("3000", () => console.log("Server started at: http://localhost:3000"));