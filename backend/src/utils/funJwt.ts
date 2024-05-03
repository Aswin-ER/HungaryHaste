import jwt from "jsonwebtoken";
const crypto = require("crypto");

const funJwt = (user_name: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // normal token
  const token = jwt.sign({ user_name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  //random string generation
  const generateRandomString = (length: number) => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex") // Convert to hexadecimal format
      .slice(0, length); // Trim to desired length
  };

  //access token
  const accessToken = generateRandomString(64);

  //refersh token
  const refershToken = generateRandomString(64);

  return { token: token, accessToken: accessToken, refershToken: refershToken };
};

export default funJwt;