import {
  ASTNode,
  AssignStatement,
  BinaryExpr,
  Identifier,
  NumberLiteral,
  PrintStatement,
  Program,
} from "./syntax";
import { Token, TokenKind } from "./token";

export class Parser {
  private pos = 0;
  constructor(private readonly tokens: Token[]) {}

  parse(): ASTNode {
    const statements: ASTNode[] = [];
    while (this.pos < this.tokens.length) {
      statements.push(this.parseStatement());
    }
    return new Program(statements);
  }

  private parseStatement(): ASTNode {
    if (this.matchKeyword("let")) {
      this.next();
      const identifier = this.next();
      this.consume(TokenKind.Equal);
      const expr = this.parseExpr();
      this.consume(TokenKind.Semicolon);
      return new AssignStatement(identifier.value!, expr);
    } else if (this.matchKeyword("print")) {
      this.next();
      const expr = this.parseExpr();
      this.consume(TokenKind.Semicolon);
      return new PrintStatement(expr);
    } else {
      throw new Error("Unexpected token");
    }
  }

  private parseExpr(): ASTNode {
    let expr = this.parseMulExpr();
    while (this.matchKind(TokenKind.Add, TokenKind.Sub)) {
      const op = this.next();
      const right = this.parseMulExpr();
      expr = new BinaryExpr(expr, op.type, right);
    }
    return expr;
  }

  private parseMulExpr(): ASTNode {
    let expr = this.parsePrimaryExpr();
    while (this.matchKind(TokenKind.Mul, TokenKind.Div)) {
      const op = this.next();
      const right = this.parsePrimaryExpr();
      expr = new BinaryExpr(expr, op.type, right);
    }
    return expr;
  }

  private parsePrimaryExpr(): ASTNode {
    if (this.matchKind(TokenKind.Number)) {
      const token = this.next();
      return new NumberLiteral(parseFloat(token.value!));
    } else if (this.matchKind(TokenKind.LeftParen)) {
      this.consume(TokenKind.LeftParen);
      const expr = this.parseExpr();
      this.consume(TokenKind.RightParen);
      return expr;
    } else if (this.matchKind(TokenKind.Identifier)) {
      const token = this.next();
      return new Identifier(token.value!);
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

  private matchKind(...kinds: TokenKind[]) {
    const token = this.tokens[this.pos];
    if (token === undefined) return false;
    if (kinds.some((k) => token.type === k)) {
      return true;
    }
    return false;
  }

  private matchKeyword(keyword: string) {
    const token = this.tokens[this.pos];
    if (token === undefined) return false;
    if (token.value === keyword) {
      return true;
    }
    return false;
  }
}
