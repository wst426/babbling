import { ASTNode, BinaryExpr, NumberLiteral } from "./syntax";
import { Token, TokenKind } from "./token";

export class Parser {
  private pos = 0;
  constructor(private readonly tokens: Token[]) {}

  parse(): ASTNode {
    return this.parseExpr();
  }

  private parseExpr(): ASTNode {
    let expr = this.parseMulExpr();
    while (this.match(TokenKind.Add, TokenKind.Sub)) {
      const op = this.next();
      const right = this.parseMulExpr();
      expr = new BinaryExpr(expr, op.type, right);
    }
    return expr;
  }

  private parseMulExpr(): ASTNode {
    let expr = this.parsePrimaryExpr();
    while (this.match(TokenKind.Mul, TokenKind.Div)) {
      const op = this.next();
      const right = this.parsePrimaryExpr();
      expr = new BinaryExpr(expr, op.type, right);
    }
    return expr;
  }

  private parsePrimaryExpr(): ASTNode {
    if (this.match(TokenKind.Number)) {
      const token = this.next();
      return new NumberLiteral(parseFloat(token.value!));
    } else if (this.match(TokenKind.LeftParen)) {
      this.consume(TokenKind.LeftParen);
      const expr = this.parseExpr();
      this.consume(TokenKind.RightParen);
      return expr;
    } else {
      throw new Error();
    }
  }

  private next() {
    const token = this.tokens[this.pos];
    if (token === undefined) throw new Error();
    this.pos++;
    return token;
  }

  private consume(kind: TokenKind) {
    const token = this.tokens[this.pos];
    if (token.type !== kind) {
      throw new Error("Unexpected token");
    }
    this.pos++;
  }

  private match(...kinds: TokenKind[]) {
    const token = this.tokens[this.pos];
    if (token === undefined) return false;
    if (kinds.some((k) => token.type === k)) {
      return true;
    }
    return false;
  }
}
