---
description: TypeScript / JavaScript 程式碼風格規則。
globs:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.vue"
alwaysApply: false
---

# TS / JS 程式碼風格規則

## 目標

- 適用於 TypeScript、JavaScript、Vue、React 專案。
- 規則優先於個人偏好。
- 產出程式碼需穩定、可讀、可維護。
- AI Agent 修改程式碼前需先檢查既有命名與寫法。

## 變數宣告

- 禁止使用 `var`。
- 預設使用 `const`。
- 只有需要重新賦值時才使用 `let`。
- 不允許為了方便而使用較寬鬆的宣告方式。

```ts
const users = [];
let currentPage = 1;
```

## 函式宣告

- 建立函式時優先使用 `const` 搭配 arrow function。
- 只有在需要 hoisting、框架限制、測試工具限制，或既有架構大量使用 `function` 時，才使用 `function`。
- 不使用 `var` 建立函式。

```ts
/**
 * 取得使用者清單。
 */
const getUsers = async ({ keyword }: GetUsersParams): Promise<User[]> => {
  return userRepository.findMany({ keyword });
};
```

## 函式註解

- 每個函式都需要 JSDoc。
- JSDoc 說明函式用途，不寫流水帳。
- 有參數時需描述參數用途。
- 有回傳值時需描述回傳內容。
- 事件處理函式也需要 JSDoc。

```ts
/**
 * 依條件建立借閱紀錄。
 *
 * @param params - 建立借閱紀錄需要的資料。
 * @returns 建立完成的借閱紀錄。
 */
const createBorrowRecord = async (
  params: CreateBorrowRecordParams,
): Promise<BorrowRecord> => {
  return borrowRecordRepository.create(params);
};
```

## 函式參數

- 函式接收參數一律使用物件參數。
- 不使用多個位置參數。
- TypeScript 檔案需替參數加上明確型別。
- 物件參數可直接解構，但仍需有型別。
- 沒有參數時使用空參數，不建立無意義物件。

```ts
interface UpdateUserParams {
  userId: string;
  name: string;
};

/**
 * 更新使用者名稱。
 *
 * @param params - 更新使用者名稱需要的資料。
 */
const updateUserName = ({ userId, name }: UpdateUserParams): void => {
  userStore.updateName({ userId, name });
};
```

```ts
/**
 * 重新整理使用者資料。
 */
const refreshUsers = (): void => {
  queryClient.invalidateQueries({ queryKey: ["users"] });
};
```

## 點擊處理函式命名

- 函式作用於點擊行為時，使用 `handle` 開頭。
- 命名使用 lower camel case。
- 名稱需描述實際行為。
- 避免只寫 `handleClick`，除非語境已非常明確。

```ts
/**
 * 處理新增使用者按鈕點擊。
 */
const handleCreateUserClick = (): void => {
  openCreateUserDialog();
};
```

## UI 對外事件命名

- UI 組件向外傳遞事件時，使用 `on` 開頭。
- 命名使用 lower camel case。
- `onClick`、`onSubmit`、`onChange` 可用於元件 props 或 emit 事件。
- `handle` 用於元件內部處理。
- `on` 用於元件對外暴露。

```ts
interface UserFormProps {
  onSubmit: ({ values }: UserFormSubmitParams) => void;
  onCancel: () => void;
};
```

## Vue 響應式狀態命名

- Vue 檔案中使用 `ref` 宣告的響應式狀態，變數名稱需以 `Ref` 結尾。
- Vue 檔案中使用 `reactive` 宣告的響應式狀態，變數名稱需以 `Reactive` 結尾。
- 後綴需對應實際 API。
- 不混用 `Ref` 與 `Reactive` 後綴。

```ts
const borrowRowsRef = ref<BorrowRow[]>([]);

const settingsReactive = reactive<SettingsState>({
  theme: "light",
  pageSize: 20,
});
```

## 複數命名

- 集合資料優先使用複數名詞。
- 避免 `usersList`、`ordersList` 這類冗餘命名。
- `users` 比 `userList` 更適合表示使用者集合。
- `orders` 比 `ordersList` 更適合表示訂單集合。

```ts
const users = ref<User[]>([]);
const selectedUsers = computed(() => users.value.filter((user) => user.selected));
```

## List 命名規則

- `List` 僅用於衍生列表資料、UI 顯示列表、或語意上確實是列表模型。
- 原始集合資料不加 `List`。
- `list` 表示單一列表。
- `lists` 表示多個列表集合。

```ts
const users = ref<User[]>([]);

const activeUserList = computed(() => {
  return users.value.filter((user) => user.status === "active");
});

const userLists = ref<UserListGroup[]>([]);
```

## React / Vue 常見命名

- React hook 回傳的狀態使用領域名詞，不加不必要後綴。
- React event handler props 使用 `on` 開頭。
- React component 內部事件處理使用 `handle` 開頭。
- Vue `ref` 與 `reactive` 狀態需使用對應後綴。
- Vue `computed` 衍生資料可使用描述性名稱，必要時才加 `List`。

```ts
const [users, setUsers] = useState<User[]>([]);

/**
 * 處理表單送出。
 */
const handleSubmit = ({ values }: SubmitParams): void => {
  onSubmit({ values });
};
```

## Naming Consistency

- 同一個資料概念在同一個模組中只能使用一種命名。
- 不混用 `userRows`、`users`、`userList` 表示同一份資料。
- 新增命名前先搜尋既有命名。
- 優先沿用專案已建立的 domain language。
- 不為了局部方便建立第二套語意。

## AI Agent 執行規則

- 修改 TS / JS / Vue / React 程式碼前，先套用本規則。
- 若既有專案規則與本規則衝突，優先遵守更接近該檔案的局部規則。
- 若無局部規則，使用本規則。
- 產生新函式時，同步建立 JSDoc、物件參數型別、命名一致性。
- 進行 rename 時需檢查所有引用點。
