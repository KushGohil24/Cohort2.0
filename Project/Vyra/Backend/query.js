import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://kushgohil:kushgohil@cluster0.z1x99.mongodb.net/vyra")
  .then(async () => {
    const product = await mongoose.connection.collection('products').findOne({ _id: new mongoose.Types.ObjectId("6a0ae29cc2e647bcefb50ad0") });
    console.log("Product variants:", product ? product.variants : "Product not found");
    process.exit(0);
  })
  .catch(console.error);
