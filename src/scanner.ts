import { Token, TokenKind } from "./token";

function isSpace(ch: string) {
  return ch === " " || ch === "\t" || ch === "\n";
}

function isDigit(ch: string) {
  return "0" <= ch && ch <= "9";
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
      } else if (isDigit(ch)) {
        tokens.push(this.scanNumber());
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
}
