# AGENTS.md


## 目標


`domain` 資料夾負責所有資料存取邏輯，包含：


- 呼叫外部 API（repository 層）
- 存取 Local Storage / Session Storage
- 對取回資料做商業邏輯處理（usecase 層）


**不包含** UI 畫面相關資料處理，畫面狀態請交由 View 層或 Pinia store 管理。


***


## 架構分層


```
domain/
  repository/
    index.ts
    ***.repo.ts
  usecase/
    index.ts
    ***.usecase.ts
```


| 層級 | 職責 | 限制 |
|---|---|---|
| `repository` | 串接 API、Local Storage、Session Storage，取得原始資料 | 不做任何邏輯處理 |
| `usecase` | 從 repository 取得資料後做格式整理或商業邏輯處理 | 不含 UI 邏輯 |


***


## repository


### 命名規則


| 項目 | 規則 | 範例 |
|---|---|---|
| 檔案名稱 | lower camel case + `.repo.ts` | `addWallet.repo.ts` |
| interface（回傳值） | upper camel case + `Res` 結尾 | `GetEnvConfigRes` |
| interface（傳入參數） | upper camel case + `Params` 結尾 | `SetFileServerConfigParams` |
| Function | lower camel case + 動詞開頭（見下表） | `getEnvConfig` |


**Function 動詞前綴**


| 動詞 | 用途 |
|---|---|
| `get` | 取得資料 |
| `set` | 儲存資料 |
| `add` | 新增資源 |
| `update` | 更新資料 |
| `delete` | 刪除資料 |
| 其他 | 按照 API 的實際用途命名（如 `login`、`upload`） |


### 使用規則


- `repository/index.ts` 負責 re-export 所有 `***.repo.ts`。
- 每個 `***.repo.ts` 的所有 Function 與 interface 都需要 `export`。
- Function 上方需加 JSDoc 說明用途。
- interface 每個欄位需加 JSDoc 或行內註解說明用途。
- HTTP 請求應在 `res.ok === false` 時拋出錯誤，錯誤處理方式以專案統一規範為準。


### 範例


**不需傳參數（單純取得資料）**


```ts
// getEnvConfig.repo.ts


/** 取得環境設定 API 回傳格式 */
export interface GetEnvConfigRes {
  /** API 服務位址 */
  apiUrl: string
  /** 功能旗標列表 */
  featureFlags: string[]
}


/** 取得環境設定 */
export async function getEnvConfig(): Promise<GetEnvConfigRes> {
  const res = await fetch('/api/env-config')
  if (!res.ok) throw new Error(`getEnvConfig failed: ${res.status}`)
  return res.json()
}
```


**需要傳入參數（查詢特定資源）**


```ts
// getWalletDetail.repo.ts


/** 取得錢包詳情所需傳入參數 */
export interface GetWalletDetailParams {
  /** 錢包 ID */
  walletId: string
}


/** 取得錢包詳情 API 回傳格式 */
export interface GetWalletDetailRes {
  /** 錢包 ID */
  id: string
  /** 錢包名稱 */
  name: string
  /** 錢包餘額 */
  balance: number
}


/**
 * 取得指定錢包的詳情
 * @param params - 傳入參數，包含錢包 ID
 */
export async function getWalletDetail(
  params: GetWalletDetailParams
): Promise<GetWalletDetailRes> {
  const res = await fetch(`/api/wallet/${params.walletId}`)
  if (!res.ok) throw new Error(`getWalletDetail failed: ${res.status}`)
  return res.json()
}
```


**需要傳入參數（新增 / 更新資源）**


```ts
// addWallet.repo.ts


/** 新增錢包所需傳入參數 */
export interface AddWalletParams {
  /** 錢包名稱 */
  name: string
  /** 初始餘額 */
  initialBalance: number
}


/** 新增錢包 API 回傳格式 */
export interface AddWalletRes {
  /** 新建立的錢包 ID */
  id: string
  /** 錢包名稱 */
  name: string
  /** 錢包餘額 */
  balance: number
}


/**
 * 新增錢包
 * @param params - 新增錢包所需資料
 */
export async function addWallet(
  params: AddWalletParams
): Promise<AddWalletRes> {
  const res = await fetch('/api/wallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error(`addWallet failed: ${res.status}`)
  return res.json()
}
```


***


## usecase


### 命名規則


| 項目 | 規則 | 範例 |
|---|---|---|
| 檔案名稱 | lower camel case + `.usecase.ts` | `addWallet.usecase.ts` |
| interface（回傳值） | upper camel case + `Dto` 結尾 | `GetEnvConfigDto` |
| interface（傳入參數） | upper camel case + `ParamsDto` 結尾 | `GetWalletDetailParamsDto` |
| Function | lower camel case + 動詞開頭（同 repository 規則）+ `Usecase` 結尾 | `getEnvConfigUsecase` |


### 使用規則


- `usecase/index.ts` 負責 re-export 所有 `***.usecase.ts`。
- 每個 `***.usecase.ts` 的所有 Function 與 interface 都需要 `export`。
- Function 上方需加 JSDoc 說明用途。
- interface 每個欄位需加 JSDoc 或行內註解說明用途。
- 如果 UI 沒有特殊需求，直接回傳 repository 取回的資料即可，不需額外轉換。
- **Dto interface**：若 Dto 與 Res 欄位完全一致，可使用 `export type { XxxRes as XxxDto }` 代替空的 extend；若有欄位增減或格式轉換，才建立獨立的 Dto interface。
- **ParamsDto interface**：即使內容與 Params 相同，仍保留 ParamsDto，目的是讓 View 層依賴 usecase 介面而非 repository，保持層級解耦，方便未來獨立修改入參。


### 範例


**不需傳參數**


```ts
// getEnvConfig.usecase.ts


import { getEnvConfig as getEnvConfigRepo } from '../repository'
import type { GetEnvConfigRes } from '../repository'


export interface GetEnvConfigDto extends GetEnvConfigRes {}


/** 取得環境設定，並確保 featureFlags 為排序後的陣列 */
export async function getEnvConfigUsecase(): Promise<GetEnvConfigDto> {
  const data = await getEnvConfigRepo()
  return {
    ...data,
    featureFlags: [...data.featureFlags].sort(),
  }
}
```


**需要傳入參數（查詢特定資源）**


```ts
// getWalletDetail.usecase.ts


import { getWalletDetail as getWalletDetailRepo } from '../repository'
import type {
  GetWalletDetailParams,
  GetWalletDetailRes,
} from '../repository'


export interface GetWalletDetailDto extends GetWalletDetailRes {}
export interface GetWalletDetailParamsDto extends GetWalletDetailParams {}


/**
 * 取得指定錢包的詳情
 * @param params - 傳入參數，包含錢包 ID
 */
export async function getWalletDetailUsecase(
  params: GetWalletDetailParamsDto
): Promise<GetWalletDetailDto> {
  return getWalletDetailRepo(params)
}
```


**需要傳入參數（新增 / 更新資源，包含資料轉換）**


```ts
// addWallet.usecase.ts


import { addWallet as addWalletRepo } from '../repository'
import type { AddWalletParams, AddWalletRes } from '../repository'


export interface AddWalletDto extends AddWalletRes {}
export interface AddWalletParamsDto extends AddWalletParams {}


/**
 * 新增錢包
 * @param params - 新增錢包所需資料
 */
export async function addWalletUsecase(
  params: AddWalletParamsDto
): Promise<AddWalletDto> {
  return addWalletRepo(params)
}
```


***


## 修改前確認清單


1. 只修改 `domain/**` 下的檔案，不動 View、Router 或 Pinia store。
2. 確認 `index.ts` 有 re-export 新增或更名的模組。
3. 確認新增的 Function 與 interface 都已 `export`。
4. 確認 Function 與 interface 欄位都有 JSDoc 註解。
5. 命名是否符合各層規則（camel case、後綴 `.repo.ts` / `.usecase.ts`、`Res` / `Params`）。
6. usecase 是否已正確 import 對應的 repository function。
7. Dto / ParamsDto 是否依欄位差異選擇 extend 或 type alias。


***


## Codex / AI 操作規則


- 只閱讀與修改 `domain/**` 範圍內的檔案。
- 未經明確要求，不要修改 `views/`、`router/`、`stores/` 或其他目錄。
- 如果任務涉及跨層修改，先說明原因，再等待確認。
- 回覆請簡短，只列：修改的檔案、修改原因、是否需要確認。