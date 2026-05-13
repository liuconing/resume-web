# AGENTS.md

## 目標
- 以最少必要閱讀與最小可行修改完成任務。
- 優先沿用既有架構、封裝與命名語意，不做無關重構。
- 回覆精簡，只提供完成任務所需資訊。

## 規則優先順序與索引
- 優先順序：使用者明確指令 > 檔案或資料夾局部規則 > `.cursor/rules/**` > 本檔通用原則。
- 完整規則對照表見 [`.cursor/rules/README.md`](.cursor/rules/README.md)，由該索引指向：
  - [`code-style/ts-js-code-style.md`](.cursor/rules/code-style/ts-js-code-style.md)：修改 `*.ts` / `*.tsx` / `*.js` / `*.jsx` / `*.vue` 時的程式風格、JSDoc、物件參數、命名、`ref` / `reactive` 後綴。
  - [`code-style/ui-logic-organization.md`](.cursor/rules/code-style/ui-logic-organization.md)：新增或調整 UI 顯示邏輯、互動流程、輸出內容前的 `src/hooks/**` / `src/utils/**` 重用規則。
  - [`domain/domain-agents.md`](.cursor/rules/domain/domain-agents.md)：任務涉及 `src/domain/**` 才讀取，含 repository / usecase 分層與命名。
- 改程式碼／UI 邏輯／`src/domain/**` 時，再依上表讀取對應規則；任務不涉及則略過。

## 專案技術棧與既有共用模組
- 關鍵依賴：`vue`、`vue-router`、`pinia`、`@tanstack/vue-query`、`axios`、`element-plus`、`tailwindcss`、`bignumber.js`、`lodash`、`uuid`（詳見 [`package.json`](package.json)）。
- `src/lib/`：`axios/`、`vue-query/`、`element-plus/`、`pinia/`、`lodash/`、`uuid/`、`bigNumber/`、`local-storage/`。新增與第三方相關的封裝，先確認 `src/lib/` 是否已有對應模組。
- `src/hooks/`：`useFetch`、`useMutation`、`useNavigator`、`useExclusiveDialogs`、`useFundingDialogs`、`useGlobalErrorHandler`。先檢查是否已有可重用 composable。
- `src/utils/`：`format.ts`、`delay.ts`。新增格式化、轉換、延遲、顯示輸出前先檢查。
- `src/domain/`：repository + usecase 分層；細節見 `domain/domain-agents.md`。
- npm scripts：`dev`、`build`、`type-check`、`lint`、`format`。

## 閱讀範圍規則
- 先只讀與任務直接相關的檔案。
- 預設優先查看：`src/views/`、`src/components/`、`src/router/`、`src/stores/`、`src/lib/`、`src/App.vue`、`src/main.ts`、`src/domain/`、`src/utils/`、`src/hooks/`、`package.json`。
- 非必要不要讀：`dist/`、`build/`、`coverage/`、`node_modules/`、鎖檔、圖片與產生檔。
- UI 小修、bug fix 或單一路由問題時，不展開全域搜尋。

## 修改原則
- 先找最小可行修改，不要先做抽象化。
- 優先重用既有元件、store、composable、`src/lib/` 封裝。
- 只改與需求直接相關的檔案，不為無關理由重排或調整 formatter。
- rename 時檢查所有引用點；若既有命名與 code-style 規則衝突，僅調整本次觸及範圍。
- 不新增依賴，除非真的必要且有明確理由。
- 不把局部問題升級成全專案重構。

## Vue / Pinia / Router
- **Vue**：沿用 `<script setup lang="ts">`；單一元件單一職責；UI 修正先依序檢查 當前元件 → 父層 → props → class/style；不動無關 template。
- **Pinia**：先 local state，必要才上 store；不放一次性頁面狀態；沿用既有 store 命名與 action 風格；修改 store 前先確認是否為跨頁共享狀態，或其實只需 computed / props / composable。
- **Vue Router**：路由問題優先看 `src/router/` 路由表、`meta`、`beforeEach` / guards、頁面層生命週期；與登入/權限相關時先確認 Pinia store 與 guard 互動；不隨意改動整套路由結構。

## UI 邏輯規則
- 新增格式化、轉換、顯示文字、金額、百分比、時間等純函式前，先查 `src/utils/**`。
- 新增 dialog、fetch、mutation、navigator、錯誤處理等互動流程前，先查 `src/hooks/**`。
- 單一檔案專用且不具共用價值的邏輯可保留在檔內。
- 多檔案出現重複邏輯時整理到 `src/utils/**` 或 `src/hooks/**`，並更新對應 `index.ts`。

## API / 非同步規則
- 沿用 `src/lib/axios/` 與 `src/lib/vue-query/` 既有封裝，不混入新風格。
- 除非必要，不把 API 邏輯寫進元件內；新增 API 流程屬於 `src/domain/**` 時套用 `domain-agents.md`。
- 非同步錯誤處理只補任務需要的最小範圍；可重用 `useGlobalErrorHandler`。
- 不輸出整段 response / error log，只保留關鍵錯誤訊息。

## 除錯流程
- 先確認問題發生位置，再讀相關檔案；不一開始就全 repo 搜。
- 資訊不足時先問 1 個最關鍵的澄清問題，不連問多題。
- 能先做最小修正驗證就不做大改。

## 輸出規則
- 回覆精簡，依序回報：修改了哪些檔案、做了什麼改動、是否還需手動驗證。
- 不貼大段程式碼、不貼長篇 log / lint / build 輸出，除非明確要求。
- 不重述任務背景。

## 測試規則
- 只執行與當前任務最相關的檢查。
- template / style 小修非必要不跑整包測試；單元邏輯修正優先跑最小範圍驗證。
- 無法執行測試時明確指出原因，不編造結果。

## 完成條件
- 需求已在最小修改下完成，未動到無關檔案，未新增不必要依賴。
- 涉及之程式碼符合對應 `.cursor/rules/**`。
- 回覆保持簡潔，可直接進入下一步。
