export enum TokenKind {
  Add,
  Sub,
  Mul,
  Div,
  Equal,
  Semicolon,
  LeftParen,
  RightParen,
  Number,
  Identifier,
}

export class Token {
  constructor(readonly type: TokenKind, readonly value: string | null = null) {}
}
