import crypto from "crypto";

export function encryption(plaintext) {
  const iv = crypto.randomBytes(Number(process.env.SECRET_IV));

  const cypher = crypto.createCipheriv(
    process.env.SECRET_ENCRYPTION_ALGO,
    process.env.SECRET_ENCRYPTION_KEY,
    iv,
  );

  //80f6ebcf33e633418b32e0452949e5096525cec0a8fc8810330678c4fec68c51

  let cipherText = cypher.update(plaintext, "utf-8", "hex");
  cipherText += cypher.final("hex");

  return iv + ":" + cipherText;
}

export async function decryption(password) {
  const { hexIv, cipherText } = password.split(":");

  console.log({ hexIv, cipherText });
  

  const iv = Buffer(hexIv, process.env.SECRET_IV);

  const cypher = crypto.createDecipheriv(
    process.env.SECRET_ENCRYPTION_ALGO,
    process.env.SECRET_ENCRYPTION_KEY,
    iv,
  );

  let  plaintext = cypher.update(cipherText, "hex", "utf-8");
  plaintext += cypher.final("hex");

  return plaintext;
}
