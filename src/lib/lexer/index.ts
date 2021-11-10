import { TypeToken } from '@compiler/shared/types';

import { Token, TokenCode } from './token';
class Lexer {
  source: string;
  currentChar: string;
  currentPos: number;

  constructor(input: string) {
    this.source = input + '\n';
    this.currentChar = '';
    this.currentPos = -1;
    this.nextChar();

    console.log(input);
  }

  nextChar(): void {
    this.currentPos++;
    if (this.currentPos >= this.source.length) {
      this.currentChar = '\0'; // set this as EOF
      return;
    }

    this.currentChar = this.source.charAt(this.currentPos);
  }

  peek(): string {
    if (this.currentPos + 1 >= this.source.length) {
      return '\0';
    }

    return this.source.charAt(this.currentPos + 1);
  }

  getToken() {
    this.skipWhiteSpace();
    let token: TypeToken;

    switch (this.currentChar) {
      // Addition
      case '+':
        token = new Token(this.currentChar, TokenCode.PLUS);
        break;
      // Subtraction
      case '-':
        token = new Token(this.currentChar, TokenCode.MINUS);
        break;
      // Multiplication
      case '*':
        token = new Token(this.currentChar, TokenCode.ASTERISK);
        break;
      // Divide
      case '/':
        // Handle comments
        if (this.peek() === '/') {
          const prev = this.currentChar;
          this.nextChar();
          token = new Token(prev + this.currentChar, TokenCode.COMMENT);

          this.skipComment();
          break;
        }
        token = new Token(this.currentChar, TokenCode.SLASH);
        break;
      // New line
      case '\n':
        token = new Token(this.currentChar, TokenCode.NEWLINE);
        break;
      // EOF
      case '\0':
        token = new Token('', TokenCode.EOF);
        break;
      // Assignment
      case '=':
        // == operator
        if (this.peek() === '=') {
          const prev = this.currentChar;
          this.nextChar();
          token = new Token(prev + this.currentChar, TokenCode.EQEQ);
          break;
        }
        token = new Token(this.currentChar, TokenCode.EQ);
        break;

      case '!':
        // Not equal to
        if (this.peek() === '=') {
          const prev = this.currentChar;
          this.nextChar();
          token = new Token(prev + this.currentChar, TokenCode.NOTEQ);
          break;
        }
        this.exit(`Unknown character -> ${this.currentChar}`);
        break;
      // Greater than
      case '>':
        // >= operator
        if (this.peek() === '=') {
          const prev = this.currentChar;
          this.nextChar();
          token = new Token(prev + this.currentChar, TokenCode.GTEQ);
          break;
        }
        token = new Token(this.currentChar, TokenCode.GT);
        break;
      // Less than
      case '<':
        // <= operator
        if (this.peek() === '=') {
          const prev = this.currentChar;
          this.nextChar();
          token = new Token(prev + this.currentChar, TokenCode.LTEQ);
          break;
        }
        token = new Token(this.currentChar, TokenCode.LT);
        break;
      // String feature prototype
      //   case '^':
      //     this.nextChar();
      //     const start: number = this.currentPos;

      //     while (this.currentChar !== `^`) {
      //       if (this.currentChar === '\\' || this.currentChar === '%') {
      //         this.exit(`Illegal character in string -> ${this.currentChar}`);
      //       }
      //       this.nextChar();
      //     }

      //     token = new Token(
      //       this.source.slice(start, this.currentPos),
      //       TokenCode.STRING
      //     );
      //     break;

      default:
        this.exit(`Unknown character -> ${this.currentChar}`);
    }

    this.nextChar();
    return token;
  }

  skipWhiteSpace() {
    while (
      this.currentChar === ' ' ||
      this.currentChar === '\t' ||
      this.currentChar === '\r'
    ) {
      this.nextChar();
    }
  }

  skipComment() {
    while (this.currentChar !== '\n') {
      this.nextChar();
    }
  }

  exit(message: string) {
    console.log(`Lexing Error: ${message}`);
    process.exit(1);
  }
}

export default Lexer;
