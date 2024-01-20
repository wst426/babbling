# Syntax

```
program     = statement*
statement   = 'let' Identitfier '=' expr ';'
            | 'print' expr ';'
expr        = mulExpr (('+' | '-') mulExpr)*
mulExpr     = primaryExpr (('*' | '/') primaryExpr)*
primaryExpr = Number
            | Identifier
            | '(' expr ')'
Identifier  = [a-zA-Z_][a-zA-Z0-9_]+
Number      = [0-9\.]*
```
