import { TokenKind } from "./token";

enum ASTNodeKind {
  BinaryExpr,
  NumberLiteral,
}

export abstract class ASTNode {
  constructor(readonly type: ASTNodeKind) {}
}

export class BinaryExpr extends ASTNode {
  constructor(
    readonly left: ASTNode,
    readonly op: TokenKind,
    readonly right: ASTNode
  ) {
    super(ASTNodeKind.BinaryExpr);
  }
}

export class NumberLiteral extends ASTNode {
  constructor(readonly value: number) {
    super(ASTNodeKind.NumberLiteral);
  }
}
