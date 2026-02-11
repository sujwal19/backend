const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);

const data1 = {
  name: "Diamond Necklace",
  company: "64c23350e32f4a51b19b923a",
  price: 2999,
  colors: ["#a3e8ff", "#603203", "#663300"],
  image: "/images/product-diamond-ring.png",
  category: "64c2342de32f4a51b19b9259",
  isFeatured: false,
};

const main = async () => {
  try {
    await client.connect();
    const db = client.db("shop");
    const collection = db.collection("products");

    collection.deleteOne({ _id: "6986bd818de75f167969ad62" });

    const data = await collection.find({ price: { $eq: 2999 } }).toArray();
    console.log(data);
    return "done";
  } finally {
    await client.close();
  }
};

main()
  .then(console.log)
  .catch((e) => console.log(e));
