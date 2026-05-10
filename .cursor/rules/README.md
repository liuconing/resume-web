---
description: rules 索引。提供 Cursor、Codex、AI Agent 判斷應讀取哪些規則。
alwaysApply: true
---

# Rules Index

## 使用方式

- AI Agent 先讀取本索引。
- 依任務涉及的檔案與資料夾，再讀取對應規則。
- 不符合套用條件的規則應略過。

## 規則清單

- [rules/code-style/ts-js-code-style.md](code-style/ts-js-code-style.md)
  - 適用於 `*.ts`、`*.tsx`、`*.js`、`*.jsx`、`*.vue`。
  - 定義 TS / JS 函式、JSDoc、參數型別、事件命名、Vue 響應式命名、集合命名。

- [rules/domain/domain-agents.md](domain/domain-agents.md)
  - 適用於 `domain/**`。
  - 只有任務涉及 domain 資料夾內容時才讀取。
  - 任務未涉及 domain 時略過。

## 共通原則

- 規則內容以中文為主。
- 規則需 concise、rule-based、low explanation、AI readable。
- 優先遵守最接近被修改檔案的規則。
- 若規則衝突，依序使用：檔案局部規則、資料夾規則、`rules/` 全域規則。
