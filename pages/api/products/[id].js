import dbConnect from "@/util/mongo";
import Product from "@/models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  
  // Connect to the database
  await dbConnect();

  // Handle GET method
  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle PUT method
  if (method === "PUT") {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle DELETE method
  if (method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle unsupported methods
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ message: `Method ${method} Not Allowed` });
}
