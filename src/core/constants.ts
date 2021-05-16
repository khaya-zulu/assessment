export const REGEX_URL = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export const ANALYZE_CONFIGS: TAnalyzeConfig = {
  SHORTER_THAN_15: 15,
  MOVER_MENTIONS: "Mover",
  SHAKER_MENTIONS: "Shaker",
  QUESTIONS: "?",
  SPAM: REGEX_URL,
};

export type TAnalyzeConfig = {
  [key: string]: number | string | RegExp;
};

export type TAnalyzeOutput = {
  [key: string]: number;
};
