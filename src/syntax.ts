import { TokenKind } from "./token";

enum ASTNodeKind {
  Program,

  // statement
  AssignStatement,
  PrintStatement,

  // expression
  BinaryExpr,
  NumberLiteral,
  Identifier,
}

export abstract class ASTNode {
  constructor(readonly type: ASTNodeKind) {}
}

export class Program extends ASTNode {
  constructor(readonly statements: Statement[]) {
    super(ASTNodeKind.Program);
  }
}

export abstract class Statement extends ASTNode {}

export class AssignStatement extends Statement {
  constructor(readonly identifier: string, readonly expr: Expression) {
    super(ASTNodeKind.AssignStatement);
  }
}

export class PrintStatement extends Statement {
  constructor(readonly expr: Expression) {
    super(ASTNodeKind.PrintStatement);
  }
}

export abstract class Expression extends ASTNode {}

export class BinaryExpr extends Expression {
  constructor(
    readonly left: Expression,
    readonly op: TokenKind,
    readonly right: Expression
  ) {
    super(ASTNodeKind.BinaryExpr);
  }
}

export class NumberLiteral extends Expression {
  constructor(readonly value: number) {
    super(ASTNodeKind.NumberLiteral);
  }
}

export class Identifier extends Expression {
  constructor(readonly identifier: string) {
    super(ASTNodeKind.Identifier);
  }
}
