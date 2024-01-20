# Virtual Machine

## 定义

- 常量表
- 指令集：指令 + 一个参数
  - load_name
  - store_name
  - load_value
  - add
  - sub
  - mul
  - div

## 示例

```
let a = 1 * 2
let b = 3 - 4
print a + b
```

常量表：

- a
- b
- 1
- 2
- 3
- 4

```
load_value 2
load_value 3
mul
store_name 0
load_value 4
load_value 5
sub
store_name 1
load_name 0
load_name 1
add
print
```
