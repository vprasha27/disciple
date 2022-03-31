const { format } = require("path");
const util = require("util");
const gc = require("../config/myConfig");
const bucket = gc.bucket("mydisciple-123-bucket"); // should be your bucket name
const crypto = require("crypto");
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    let { originalname, buffer } = file;
    console.log(originalname);
    const extension = originalname.split(".");
    originalname = crypto.randomBytes(20).toString("hex") + "." + extension[1];
    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", (data) => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log(publicUrl);
        resolve(publicUrl);
      })
      .on("error", (e) => {
        console.log(e);
      })
      .end(buffer);
  });

module.exports = uploadImage;
