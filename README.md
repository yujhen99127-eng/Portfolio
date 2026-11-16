# Yu Jhen Chen 作品集網站

純 HTML + CSS 的靜態網站，不需要安裝任何套件或建置工具。

## 怎麼打開

1. 用 VS Code 選「檔案 → 開啟資料夾」，選這個 `portfolio-site` 資料夾。
2. 預覽方式二選一：
   - 直接在檔案總管對 `index.html` 按兩下，用瀏覽器開啟。
   - 安裝 VS Code 擴充套件 **Live Server**（開啟資料夾時 VS Code 會提示安裝），在 `index.html` 上按右鍵選「Open with Live Server」，存檔後瀏覽器會自動重新整理。

## 資料夾結構

```
portfolio-site/
├─ index.html          首頁
├─ about.html          關於我
├─ process.html        設計流程
├─ carwash.html        案例：OpenHub 洗車中台
├─ itraq.html          案例：iTRAQ 車隊管理系統
├─ css/site.css        全站樣式（設計變數、互動、所有 class）
├─ js/site.js          共用的導覽列與頁尾
├─ assets/images/      所有圖片
└─ design-system/      設計系統六頁，ds.js 負責點擊示範
```

## 履歷

首頁「下載履歷」和關於我「下載完整履歷」都連到 `assets/resume.pdf`。要更新履歷時，用同樣的檔名覆蓋這個檔案即可。

## 修改時的提示

### 換顏色、換字型

`css/site.css` 最上方的 `:root` 區塊是設計變數，改一處全站生效。例如把 `--accent` 換成別的顏色，所有藍色的連結、編號、線條會一起變。

### 改導覽列或頁尾

五個頁面的導覽列和頁尾都由 `js/site.js` 產生。要增減選單項目，改檔案開頭的 `WORKS`（我的作品下拉選單）和 `LINKS`（其他連結）兩個陣列。目前頁面會自動以粗體標示。

案例頁如果想把左上角的圓點換成專案圖示，在該頁的 `<body>` 加上 `data-brand-icon="圖片路徑"`（`carwash.html` 已經這樣做）。

### 改版面樣式

五個主要頁面已經沒有行內樣式，全部是 class。`site.css` 分成五段：

1. 設計變數
2. 基礎與互動（Hover、下拉選單、線條點綴）
3. 共用元件：有意義的名稱，例如 `.btn-primary`、`.eyebrow`、`.section-title`、`.tag`、`.stat-card`
4. 跨頁共用的版面：名稱是 `c-標籤編號`，例如 `.c-div12`
5. 各頁專屬：名稱是 `頁面-標籤編號`，例如 `.home-h11`、`.itraq-figure2`

第 4、5 段的名稱是自動產生的。要找某個元素的樣式，在 VS Code 對 HTML 裡的 class 名稱按 Ctrl（Mac 為 Cmd）加滑鼠左鍵，或用全域搜尋。

### 其他

- 字型（Inter、Noto Sans TC、Space Grotesk）從 Google Fonts 載入，離線時會退回系統字型。
- 關閉 JavaScript 時，導覽列只會顯示回首頁的名字連結，頁尾不顯示；頁面內容不受影響。

## 已知限制

- 版面是以桌機寬度設計的。有幾個標題和圖片設了固定寬度，手機寬度下會出現左右捲動，上線前建議再做一次響應式調整。
- `design-system/` 六頁仍保留行內樣式（它們是規格文件，不是網站頁面）。
