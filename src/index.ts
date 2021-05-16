import fs from "fs";
import path from "path";

import { CommentAnalyzer } from "./core/utils";

const docsFilePath = path.join(__dirname, "../", "/docs");

const execute = async () => {
  try {
    const totalResults = await Promise.all(
      fs
        .readdirSync(docsFilePath)
        .map(async (file) => CommentAnalyzer.analyze(`${docsFilePath}/${file}`))
    );

    let resultOutput = "";

    totalResults.forEach((result: any) => {
      Object.keys(result).forEach(
        (key: string) => (resultOutput += `${key} : ${result[key]}\n`)
      );

      resultOutput += "=======\n";
    });

    console.log("RESULTS\n=======");
    console.log(resultOutput);
  } catch (err) {
    console.log("ERR::", err);
  }
};

execute();
