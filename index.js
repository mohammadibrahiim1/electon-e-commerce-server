const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const cors = require("cors");
const port = process.env.PORT || 5000;

// user-admin: user-admin
// user-password: QvuYfoPkal4fSmbm

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("yes working!");
});

// data-base connection


const uri =
  "mongodb+srv://user-admin:QvuYfoPkal4fSmbm@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const productsCollection = client
    .db("electon-e-commerce")
    .collection("all-products");

  try {
    // get all products

    app.get("/allproducts", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const allproducts = await cursor.toArray();
      res.send(allproducts);
    });

    app.get("/productdetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const selectedProducts = await productsCollection.findOne(query);
      res.send(selectedProducts);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => console.log(`server is running on port ${port}`));

module.exports = app;
