import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (method === "PUT") {
    try {
      const body = JSON.parse(req.body); // Parse the request body
      const order = await Order.findByIdAndUpdate(id, body, { new: true });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (method === "DELETE") {
    // Handle DELETE method if needed
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
