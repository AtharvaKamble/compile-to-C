import { TypeToken } from '@compiler/types';

export class Token implements TypeToken {
  text: string;
  code: number;

  constructor(text: string, code: number) {
    this.text = text;
    this.code = code;
  }

  static isKeyword(tokenText): number | null {
    for (const code in TokenCode) {
      if (
        code === tokenText &&
        parseInt(TokenCode[code]) >= 100 &&
        parseInt(TokenCode[code]) < 200
      )
        return parseInt(TokenCode[code]);
    }

    return null;
  }
}

export enum TokenCode {
  EOF = -1,
  NEWLINE = 0,
  NUMBER = 1,
  IDENT = 2,
  STRING = 3,
  LABEL = 101,
  GOTO = 102,
  PRINT = 103,
  INPUT = 104,
  LET = 105,
  IF = 106,
  THEN = 107,
  ENDIF = 108,
  WHILE = 109,
  REPEAT = 110,
  ENDWHILE = 111,
  EQ = 201,
  PLUS = 202,
  MINUS = 203,
  ASTERISK = 204,
  SLASH = 205,
  EQEQ = 206,
  NOTEQ = 207,
  LT = 208,
  LTEQ = 209,
  GT = 210,
  GTEQ = 211,
  COMMENT = 212,
}
