import {
  ASTNode,
  AssignStatement,
  BinaryExpr,
  Identifier,
  NumberLiteral,
  PrintStatement,
  Program,
} from "./syntax";

export class ASTPrinter {
  print(ast: ASTNode) {
    const obj = this.traverse(ast);
    console.log(JSON.stringify(obj, null, 2));
  }

  private traverse(node: ASTNode): any {
    if (node instanceof Program) {
      const result: any[] = [];
      for (const statement of node.statements) {
        result.push(this.traverse(statement));
      }
      return result;
    } else if (node instanceof AssignStatement) {
      return {
        type: node.type.toString(),
        identifier: node.identifier,
        expr: this.traverse(node.expr),
      };
    } else if (node instanceof PrintStatement) {
      return { type: node.type.toString(), expr: this.traverse(node.expr) };
    } else if (node instanceof BinaryExpr) {
      return {
        type: node.type.toString(),
        left: this.traverse(node.left),
        op: node.op.toString(),
        right: this.traverse(node.right),
      };
    } else if (node instanceof NumberLiteral) {
      return { type: node.type.toString(), value: node.value };
    } else if (node instanceof Identifier) {
      return { type: node.type.toString(), value: node.identifier };
    } else {
      throw new Error();
    }
  }
}
