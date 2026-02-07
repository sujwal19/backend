const mongoose = require("mongoose");
const PASSWORD = encodeURIComponent(process.env.PASSWORD);

const uri = `mongodb+srv://dbSujwal:${PASSWORD}@cluster0.afxwxrz.mongodb.net/shop?appName=Cluster0`;

mongoose.connect(uri);

// We need to create schemas
const productSchema = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: String,
  category: String,
  isFeatured: Boolean,
});

// We need to create a modal
const Product = new mongoose.model("Product", productSchema);

const data1 = {
  name: "Silver Braclet",
  company: "64c23350e32f4a51b19b923a",
  price: 3599,
  colors: ["#f7f7f7", "#aba8a429", "#12a225eb"],
  image: "/images/product-diamond-ring.png",
  category: "64c2342de32f4a51b19b9259",
  isFeatured: true,
};

const main = async () => {
  try {
    // Insert
    // await Product.insertMany(data1);

    // Update
    // const updateQuery = await Product.findOneAndUpdate(
    //   { name: "Silver Braclet", price: 3499 },
    //   { $set: { price: 3599 } },
    // );

    // Delete
    // await Product.findOneAndDelete({
    //   name: "Silver Braclet",
    //   price: 3599,
    // });

    // Find
    const data = await Product.find({ price: 3599 });
    console.log(data);
  } catch (error) {
    console.log("Error: , ", error);
  } finally {
    mongoose.connection.close();
  }
};
main();
