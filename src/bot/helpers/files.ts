import { readdirSync } from "fs";
import * as path from "path";
import { resolve } from "path";

const CURRENT_EXTENSION = path.extname(__filename);

export const resolvePath = (x: string) => (y: string) => resolve(x, y);

export const readDir = (x: string): string[] => {
  try {
    return readdirSync(x);
  } catch (e) {
    return [];
  }
};

export const requireFile = (x: string) => {
  return require(x);
};

export const requireCommand = (x: string) => {
  const { command, help } = require(x);
  return { command, help };
};

export const matchRuntimeExtension = (x: string) =>
  x.endsWith(CURRENT_EXTENSION);

export const isFileDisabled = (x: string) => x.startsWith("__");
export const isFileEnabled = (x: string) => !isFileDisabled(x);
