import { Token, TokenKind } from "./token";

function isSpace(ch: string) {
  return ch === " " || ch === "\t" || ch === "\n";
}

function isDigit(ch: string) {
  return "0" <= ch && ch <= "9";
}

function isAlphabet(ch: string) {
  if ("a" <= ch && ch <= "z") {
    return true;
  }
  if ("A" <= ch && ch <= "Z") {
    return true;
  }
  if (ch === "_") {
    return true;
  }
  return false;
}

export class Scanner {
  private pos = 0;
  constructor(private readonly source: string) {}

  scan() {
    const tokens: Token[] = [];
    do {
      const ch = this.source[this.pos];
      if (ch === null) {
        break;
      } else if (isSpace(ch)) {
      } else if (ch === "+") {
        tokens.push(new Token(TokenKind.Add));
      } else if (ch === "-") {
        tokens.push(new Token(TokenKind.Sub));
      } else if (ch === "*") {
        tokens.push(new Token(TokenKind.Mul));
      } else if (ch === "/") {
        tokens.push(new Token(TokenKind.Div));
      } else if (ch === "(") {
        tokens.push(new Token(TokenKind.LeftParen));
      } else if (ch === ")") {
        tokens.push(new Token(TokenKind.RightParen));
      } else if (ch === "=") {
        tokens.push(new Token(TokenKind.Equal));
      } else if (ch === ";") {
        tokens.push(new Token(TokenKind.Semicolon));
      } else if (isDigit(ch)) {
        tokens.push(this.scanNumber());
      } else if (isAlphabet(ch)) {
        tokens.push(this.scanIdentifier());
      } else {
        throw new Error("Unexpected token");
      }
      this.pos++;
    } while (this.pos < this.source.length);
    return tokens;
  }

  private scanNumber(): Token {
    let str = this.source[this.pos];
    do {
      const ch = this.source[this.pos + 1];
      if (ch !== null && (isDigit(ch) || ch === ".")) {
        str += ch;
      } else {
        break;
      }
      this.pos++;
    } while (this.pos < this.source.length);
    return new Token(TokenKind.Number, str);
  }

  private scanIdentifier(): Token {
    let str = this.source[this.pos];
    do {
      const ch = this.source[this.pos + 1];
      if (ch !== null && (isAlphabet(ch) || isDigit(ch))) {
        str += ch;
      } else {
        break;
      }
      this.pos++;
    } while (this.pos < this.source.length);
    return new Token(TokenKind.Identifier, str);
  }
}
