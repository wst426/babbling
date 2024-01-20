import { ByteCodeProgram, InstructionKind } from "./syntax";

export class VirtualMachine {
  private readonly environment = new Map<string, number>();
  private readonly stack: number[] = [];

  exec(program: ByteCodeProgram) {
    for (const instruction of program.instrcutions) {
      if (instruction.type === InstructionKind.LoadName) {
        this.stack.push(
          this.environment.get(program.nameConstantPool[instruction.arg!])!
        );
      } else if (instruction.type === InstructionKind.LoadValue) {
        this.stack.push(program.numberConstantPool[instruction.arg!]);
      } else if (instruction.type === InstructionKind.StoreName) {
        this.environment.set(
          program.nameConstantPool[instruction.arg!],
          this.stack.pop()!
        );
      } else if (instruction.type === InstructionKind.Add) {
        const a = this.stack.pop()!;
        const b = this.stack.pop()!;
        this.stack.push(a + b);
      } else if (instruction.type === InstructionKind.Sub) {
        const a = this.stack.pop()!;
        const b = this.stack.pop()!;
        this.stack.push(a - b);
      } else if (instruction.type === InstructionKind.Mul) {
        const a = this.stack.pop()!;
        const b = this.stack.pop()!;
        this.stack.push(a * b);
      } else if (instruction.type === InstructionKind.Div) {
        const a = this.stack.pop()!;
        const b = this.stack.pop()!;
        this.stack.push(a / b);
      } else if (instruction.type === InstructionKind.Print) {
        console.log(this.stack.pop());
      }
    }
  }
}
