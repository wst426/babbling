import {
  ASTNode,
  AssignStatement,
  BinaryExpr,
  Expression,
  Identifier,
  NumberLiteral,
  PrintStatement,
  Program,
  Statement,
} from "./syntax";
import { TokenKind } from "./token";

export class Interpreter {
  private environment = new Map<string, number>();

  interpret(ast: ASTNode) {
    if (ast instanceof Program) {
      this.traverseProgram(ast);
    }
  }

  private traverseProgram(node: Program) {
    for (const statement of node.statements) {
      this.traverseStatement(statement);
    }
  }

  private traverseStatement(node: Statement) {
    if (node instanceof AssignStatement) {
      this.environment.set(node.identifier, this.traverseExpression(node.expr));
    } else if (node instanceof PrintStatement) {
      console.log(this.traverseExpression(node.expr));
    } else {
      throw new Error();
    }
  }

  private traverseExpression(node: Expression): number {
    if (node instanceof BinaryExpr) {
      return this.traverseBinaryExpr(node);
    } else if (node instanceof NumberLiteral) {
      return node.value;
    } else if (node instanceof Identifier) {
      const value = this.environment.get(node.identifier);
      if (value === undefined) {
        throw new Error("The variable is undefined");
      }
      return value;
    } else {
      throw new Error();
    }
  }

  private traverseBinaryExpr(node: BinaryExpr): number {
    const left = this.traverseExpression(node.left);
    const right = this.traverseExpression(node.right);
    if (node.op === TokenKind.Add) {
      return left + right;
    } else if (node.op === TokenKind.Sub) {
      return left - right;
    } else if (node.op === TokenKind.Mul) {
      return left * right;
    } else if (node.op === TokenKind.Div) {
      return left / right;
    } else {
      throw new Error();
    }
  }
}
