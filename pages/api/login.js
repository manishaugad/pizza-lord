import cookie from "cookie";
import bodyParser from "body-parser";

// Use body-parser middleware to parse incoming request bodies
const jsonParser = bodyParser.json();

const handler = (req, res) => {
  if (req.method === "POST") {
    // Ensure that the request body is parsed before accessing it
    jsonParser(req, res, () => {
      const { username, password } = req.body;
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json("Successful");
      } else {
        res.status(400).json("Wrong Credentials!");
      }
    });
  }
};

export default handler;
