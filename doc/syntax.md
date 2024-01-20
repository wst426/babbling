# Syntax

example: `1 + 2.2 * (3.8 - 1.8) / 0.2 - 6`

```
expr        = expr + mulExpr
            | expr - mulExpr
            | mulExpr
mulExpr     = mulExpr * primaryExpr
            | mulExpr / primaryExpr
            | primaryExpr
primaryExpr = Number
            | ( expr )
Number      = [0-9\.]*
```

消除左递归：

```
expr        = mulExpr (('+' | '-') mulExpr)*
mulExpr     = primaryExpr (('*' | '/') primaryExpr)*
primaryExpr = Number
            | '(' expr ')'
Number      = [0-9\.]*
```

[excalidraw](./assets/syntax-analysis.excalidraw)
