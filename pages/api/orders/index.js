import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  try {
    if (method === "GET") {
      const orders = await Order.find();
      res.status(200).json(orders);
    } else if (method === "POST") {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
