# Outline

- 编译和解释
  - string => ast https://ts-ast-viewer.com
    - 词法分析 https://regexr.com/
    - 语法分析
  - 编译 ast => native 指令集
  - 解释 ast => custom 指令集
    - virtual machine 执行该指令集
- 实例
  - 实现四则运算 tree walker interpreter
  - 为 interpreter 增加赋值语句和打印语句
  - 实现虚拟机
