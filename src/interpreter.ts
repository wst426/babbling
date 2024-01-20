import { ASTNode, BinaryExpr, NumberLiteral } from "./syntax";
import { TokenKind } from "./token";

export class Interpreter {
  interpret(ast: ASTNode) {
    return this.traverse(ast);
  }

  private traverse(node: ASTNode): number {
    if (node instanceof BinaryExpr) {
      return this.traverseBinaryExpr(node);
    } else if (node instanceof NumberLiteral) {
      return this.traverseNumberLiteral(node);
    } else {
      throw new Error();
    }
  }

  private traverseBinaryExpr(node: BinaryExpr): number {
    const left = this.traverse(node.left);
    const right = this.traverse(node.right);
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

  private traverseNumberLiteral(node: NumberLiteral) {
    return node.value;
  }
}
