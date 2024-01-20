import { createInterface } from "node:readline/promises";
import { Scanner } from "./scanner";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { ASTPrinter } from "./printer";

main();

async function main() {
  const r = createInterface({ input: process.stdin, output: process.stdout });
  const interpreter = new Interpreter();
  while (true) {
    const line = await r.question("> ");
    try {
      const tokens = new Scanner(line).scan();
      // console.log(tokens);
      const ast = new Parser(tokens).parse();
      // new ASTPrinter().print(ast);
      console.log(interpreter.interpret(ast));
    } catch (e) {
      console.log(e);
    }
  }
}
