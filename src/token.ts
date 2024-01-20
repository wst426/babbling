export enum TokenKind {
  Add,
  Sub,
  Mul,
  Div,
  LeftParen,
  RightParen,
  Number,
}

export class Token {
  constructor(readonly type: TokenKind, readonly value: string | null = null) {}
}
