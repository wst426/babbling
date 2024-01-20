export enum InstructionKind {
  LoadName,
  StoreName,
  LoadValue,
  Add,
  Sub,
  Mul,
  Div,
  Print,
}

export class Instruction {
  constructor(
    readonly type: InstructionKind,
    readonly arg: number | null = null
  ) {}
}

export class ByteCodeProgram {
  constructor(
    readonly numberConstantPool: number[],
    readonly nameConstantPool: string[],
    readonly instrcutions: Instruction[]
  ) {}
}

export function printByteCode(program: ByteCodeProgram) {
  console.log(`names: [${program.nameConstantPool.join(",")}]`);
  console.log(`numbers: [${program.numberConstantPool.join(",")}]`);
  console.log("instructions:");
  for (const instrcution of program.instrcutions) {
    console.log(`\t${instrcution.type.toString()} ${instrcution.arg}`);
  }
}
