import jwt from "jsonwebtoken";
const crypto = require("crypto");

interface tsToken {
  access_token: string;
  refresh_token: string;
}

const funJwt = (user_name: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // access token
  const access_token = jwt.sign({ user_name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  //refesh token
  const refresh_token = jwt.sign(
    { user_name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '3d'}
  );


  // setting tokens
  const tokens: tsToken = {
    access_token: access_token,
    refresh_token: refresh_token,
  };


  return { tokens: tokens };
};

export default funJwt;
