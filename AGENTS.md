# AGENTS.md

## 目標
- 以最少必要閱讀與最小可行修改完成任務。
- 優先維持既有架構、封裝與命名語意，不做無關重構。
- 回覆精簡，只提供完成任務所需資訊。

## 規則優先順序
- 優先順序：使用者明確指令 > 檔案或資料夾局部規則 > `.cursor/rules/**` > 本檔通用原則。
- 修改 `*.ts`、`*.tsx`、`*.js`、`*.jsx`、`*.vue` 時，程式風格以 [`.cursor/rules/code-style/ts-js-code-style.md`](.cursor/rules/code-style/ts-js-code-style.md) 為準。
- 新增或調整 UI 顯示邏輯、互動流程或輸出內容時，套用 [`.cursor/rules/code-style/ui-logic-organization.md`](.cursor/rules/code-style/ui-logic-organization.md)。
- 任務涉及 `src/domain/**` 時，套用 [`.cursor/rules/domain/domain-agents.md`](.cursor/rules/domain/domain-agents.md)。
- 若本檔與上述規則衝突，以更接近被修改檔案的規則為準。

## `.cursor/rules` 對照
- `code-style/ts-js-code-style.md`：TS / JS / Vue 函式宣告、JSDoc、物件參數、事件命名、`ref` / `reactive` 後綴、集合命名。
- `code-style/ui-logic-organization.md`：格式化、顯示文字、時間、金額、百分比、dialog、fetch、mutation、navigator 等 UI 邏輯放置規則。
- `domain/domain-agents.md`：repository / usecase 分層、命名、DTO / Params、index re-export 與 domain 邊界。

## 專案技術棧
- Vue 3
- Pinia
- Vue Router
- TypeScript
- 若有 Vite，沿用既有專案設定與腳本

## 閱讀範圍規則
- 先只讀與任務直接相關的檔案。
- 預設優先查看：
  - `src/views/`
  - `src/components/`
  - `src/router/`
  - `src/stores/`
  - `src/lib/`
  - `src/App.vue`
  - `src/main.ts` 或 `src/main.js`
  - `src/domain/`
  - `src/utils/`
  - `src/hooks/`
  - `package.json`
- 非必要不要讀：
  - `dist/`
  - `build/`
  - `coverage/`
  - `node_modules/`
  - 鎖檔
  - 圖片與產生檔
- 若任務只是 UI 小修、bug fix 或單一路由問題，不要展開全域搜尋。
- 依任務條件讀取規則：改程式碼讀 `ts-js-code-style.md`；改 UI 邏輯讀 `ui-logic-organization.md`；改 `src/domain/**` 讀 `domain-agents.md`。

## 修改原則
- 先找最小可行修改，不要先做抽象化。
- 優先重用既有元件、既有 store、既有 composable。
- 只改與需求直接相關的檔案。
- 不要為與需求無關的理由重排整份檔案或調整 formatter。
- 修改到 TS / JS / Vue 程式時，需符合 `ts-js-code-style.md`；若既有命名與規則衝突，僅調整本次觸及範圍並檢查所有引用點。
- 不要新增依賴，除非真的必要且有明確理由。
- 不要把局部問題升級成全專案重構。

## Vue 元件規則
- 若專案已使用 `<script setup lang="ts">`，新改動也沿用該風格。
- 單一元件只處理單一職責；不要把過多商業邏輯塞進畫面元件。
- UI 修正時，先檢查：
  1. 當前元件
  2. 直接父層
  3. 傳入 props
  4. 綁定的 class / style
- 除非需求要求，否則不要改動無關的 template 結構。

## UI 邏輯規則
- 新增格式化、轉換、顯示文字、金額、百分比、時間等純函式前，先查 `src/utils/**` 是否已有可用函式。
- 新增 dialog、fetch、mutation、navigator、錯誤處理等互動流程前，先查 `src/hooks/**` 是否已有可用 composable。
- 單一檔案專用且不具共用價值的邏輯可保留在檔內。
- 多檔案出現重複邏輯時，整理到 `src/utils/**` 或 `src/hooks/**`，並更新對應 `index.ts`。

## Pinia 規則
- 狀態優先放在最接近需求的層級：先 local state，再考慮 Pinia。
- 不要把一次性頁面狀態塞進全域 store。
- 修改 store 前先確認：
  - 這是不是跨頁共享狀態？
  - 是否已有對應 store 可重用？
  - 是否其實只需 computed / props / composable？
- 優先沿用現有 store 命名、action 風格、state 結構；若與 code-style 規則衝突，以 code-style 規則為準並維持語意一致。
- 不要為了小需求新增大型 store。

## Vue Router 規則
- 路由問題優先檢查：
  1. `src/router/` 路由表
  2. `meta`
  3. `beforeEach` / navigation guards
  4. 頁面層生命週期與參數取得
- 若與登入狀態或權限有關，先確認 Pinia store 與 guard 的互動，再修改跳轉邏輯。
- 不要隨意改動整套路由命名或路由結構，除非任務明確要求。

## API / 非同步規則
- 沿用現有請求封裝方式，不要混入新風格。
- 除非必要，不要把 API 邏輯寫進元件內。
- 涉及 `src/domain/**` 的 API / usecase / repository 修改時，先套用 `domain-agents.md`。
- 非同步錯誤處理只補任務需要的最小範圍。
- 不要輸出整段 response / error log，只保留關鍵錯誤訊息。

## 除錯流程
- 先確認問題發生位置，再讀相關檔案。
- 先看最近的元件 / store / route，不要一開始就全 repo 搜。
- 如果資訊不足，先問 1 個最關鍵的澄清問題，不要連問很多題。
- 若可以先做最小修正驗證，就不要先做大改。

## 輸出規則
- 回覆請精簡。
- 只回報：
  1. 修改了哪些檔案
  2. 做了什麼改動
  3. 是否還需要你手動驗證
- 除非我明確要求，否則不要貼大段程式碼。
- 除非必要，勿重述任務背景。
- 不要貼長篇 log、lint 全輸出、完整 build 輸出。

## 測試規則
- 只執行與當前任務最相關的檢查。
- 若只是 template / style 小修，非必要不要跑整包測試。
- 若只是單元邏輯修正，優先跑單一測試或最小範圍驗證。
- 若無法執行測試，明確指出原因即可，不要編造結果。

## 完成條件
- 需求已在最小修改下完成。
- 未改動無關檔案。
- 未新增不必要依賴。
- 涉及的程式碼或規則文件已符合對應 `.cursor/rules/**`。
- 回覆保持簡潔，可直接進入下一步。
