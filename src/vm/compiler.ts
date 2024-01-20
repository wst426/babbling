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
} from "../syntax";
import { TokenKind } from "../token";
import { ByteCodeProgram, Instruction, InstructionKind } from "./syntax";

export class Compiler {
  private readonly program = new ByteCodeProgram([], [], []);

  compile(ast: ASTNode) {
    if (ast instanceof Program) {
      this.traverseProgram(ast);
    }
    return this.program;
  }

  private traverseProgram(node: Program) {
    for (const statement of node.statements) {
      this.traverseStatement(statement);
    }
  }

  private traverseStatement(node: Statement) {
    if (node instanceof AssignStatement) {
      this.traverseExpression(node.expr);
      this.program.nameConstantPool.push(node.identifier);
      this.program.instrcutions.push(
        new Instruction(
          InstructionKind.StoreName,
          this.program.nameConstantPool.length - 1
        )
      );
    } else if (node instanceof PrintStatement) {
      this.traverseExpression(node.expr);
      this.program.instrcutions.push(
        new Instruction(InstructionKind.Print, null)
      );
    } else {
      throw new Error();
    }
  }

  private traverseExpression(node: Expression) {
    if (node instanceof BinaryExpr) {
      this.traverseBinaryExpr(node);
    } else if (node instanceof NumberLiteral) {
      this.program.numberConstantPool.push(node.value);
      this.program.instrcutions.push(
        new Instruction(
          InstructionKind.LoadValue,
          this.program.numberConstantPool.length - 1
        )
      );
    } else if (node instanceof Identifier) {
      const index = this.program.nameConstantPool.findIndex(
        (name) => name === node.identifier
      );
      if (index === -1) {
        throw new Error("The variable is undefined");
      }
      this.program.instrcutions.push(
        new Instruction(InstructionKind.LoadName, index)
      );
    } else {
      throw new Error();
    }
  }

  private traverseBinaryExpr(node: BinaryExpr) {
    this.traverseExpression(node.left);
    this.traverseExpression(node.right);
    if (node.op === TokenKind.Add) {
      this.program.instrcutions.push(new Instruction(InstructionKind.Add));
    } else if (node.op === TokenKind.Sub) {
      this.program.instrcutions.push(new Instruction(InstructionKind.Sub));
    } else if (node.op === TokenKind.Mul) {
      this.program.instrcutions.push(new Instruction(InstructionKind.Mul));
    } else if (node.op === TokenKind.Div) {
      this.program.instrcutions.push(new Instruction(InstructionKind.Div));
    } else {
      throw new Error();
    }
  }
}
