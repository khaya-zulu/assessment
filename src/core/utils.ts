import fs from "fs";
import readline from "readline";

import { TAnalyzeOutput, ANALYZE_CONFIGS, REGEX_URL } from "./constants";

export const isUrl = (line: string) => REGEX_URL.test(line);

const getOccuranceCount = (line: string, word: string) => {
  const words = line.split(" ");
  const arrOccurance = words.filter((item) =>
    item.toLowerCase().includes(word.toLocaleLowerCase())
  );

  return arrOccurance.length;
};

const doLengthCheck = (line: string, length: number) =>
  line.length < length ? 1 : 0;

const checkRegex = (line: string, regex: RegExp) => (regex.test(line) ? 1 : 0);

export const CommentAnalyzer = {
  analyze: (filename: string) =>
    new Promise<TAnalyzeOutput>((resolve, reject) => {
      if (!filename) reject("File path required");

      const output: any = {};

      const reader = readline.createInterface({
        input: fs
          .createReadStream(filename)
          .on("end", () => {
            resolve(output);
          })
          .on("error", (err) => reject(err)),
      });

      reader.on("line", (line) => {
        Object.keys(ANALYZE_CONFIGS).forEach((configKey) => {
          const configValue = ANALYZE_CONFIGS[configKey];

          switch (typeof configValue) {
            case "string":
              output[configKey] =
                (output[configKey] ?? 0) + getOccuranceCount(line, configValue);
              break;
            case "number":
              output[configKey] =
                (output[configKey] ?? 0) + doLengthCheck(line, configValue);
              break;
            case "object":
              output[configKey] =
                (output[configKey] ?? 0) + checkRegex(line, configValue);
              break;
            default:
              reject(`Invalid config:: ${configValue}`);
          }
        });
      });
    }),
};
