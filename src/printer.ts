import { ASTNode, BinaryExpr, NumberLiteral } from "./syntax";

export class ASTPrinter {
  print(ast: ASTNode) {
    const obj = this.traverse(ast);
    console.log(JSON.stringify(obj, null, 2));
  }

  private traverse(node: ASTNode): any {
    if (node instanceof BinaryExpr) {
      return this.traverseBinaryExpr(node);
    } else if (node instanceof NumberLiteral) {
      return this.traverseNumberLiteral(node);
    } else {
      throw new Error();
    }
  }

  private traverseBinaryExpr(node: BinaryExpr): any {
    const left = this.traverse(node.left);
    const right = this.traverse(node.right);
    return { left, op: node.op, right };
  }

  private traverseNumberLiteral(node: NumberLiteral): any {
    return node.value;
  }
}
