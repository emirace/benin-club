import bwipjs from "bwip-js";

function generateBarcode(
  type: string,
  text: string,
  options?: any
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: type,
        text: text,
        ...(options || {}),
      },
      function (err, png) {
        if (err) {
          reject(err);
        } else {
          const base64 = png.toString("base64");
          const dataUrl = `data:image/png;base64,${base64}`;
          resolve(dataUrl);
        }
      }
    );
  });
}

export default generateBarcode;
