import { createInterface } from "node:readline/promises";
import { Scanner } from "./scanner";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { ASTPrinter } from "./printer";
import { VirtualMachine } from "./vm/virtual-machine";
import { Compiler } from "./vm/compiler";
import { printByteCode } from "./vm/syntax";

main();

async function main() {
  const r = createInterface({ input: process.stdin, output: process.stdout });
  const vm = new VirtualMachine();
  while (true) {
    const line = await r.question("> ");
    try {
      const tokens = new Scanner(line).scan();
      // console.log(tokens);
      const ast = new Parser(tokens).parse();
      // new ASTPrinter().print(ast);
      // interpreter.interpret(ast);
      const instructions = new Compiler().compile(ast);
      // printByteCode(instructions);
      vm.exec(instructions);
    } catch (e) {
      console.log(e);
    }
  }
}
