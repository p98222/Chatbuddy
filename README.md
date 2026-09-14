# ChatBuddy — 社交英文互動學習 App（可安裝 PWA 版）

這是 ChatBuddy 的完整 Next.js 專案，部署後可在手機瀏覽器「加入主畫面」，變成像原生 App 一樣可離線開啟的 PWA。

## 本機開發

```bash
npm install
npm run dev
```

打開 http://localhost:3000 即可看到完整功能：三大情境對話、社交小抄收藏、語音朗讀、語音跟讀打分。

## 啟用「自訂情境」AI 生成功能

自訂情境會呼叫伺服器端的 `/api/generate-scenario`，需要你自己的 Anthropic API Key：

1. 到 https://console.anthropic.com 申請 API Key
2. 在專案根目錄建立 `.env.local`：
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
   ```
3. 重新啟動 `npm run dev`

沒有設定 Key 也完全不影響其他功能，只有「自訂你的情境」那張卡片會顯示錯誤訊息。

## 部署成可安裝的 PWA

任何支援 Next.js 的平台都可以，最簡單是 [Vercel](https://vercel.com)：

1. 把這個資料夾推到 GitHub
2. 到 Vercel 匯入該 repo
3. 在 Vercel 的 Environment Variables 設定 `ANTHROPIC_API_KEY`（若要用自訂情境功能）
4. Deploy

部署完成後，用手機瀏覽器（iOS Safari 或 Android Chrome）打開網址：
- **iOS Safari**：點分享圖示 → 「加入主畫面」
- **Android Chrome**：點右上角選單 → 「安裝應用程式」

之後就會有獨立的 App 圖示，全螢幕開啟、無網址列，且支援離線快取（`public/sw.js`）。

## 功能總覽

- **三大社交情境**：初次見面破冰／分享週末興趣／聊日常文化差異，各 4 輪對話、3 種回話風格即時反饋
- **交友契合度指數**：情境結束後顯示分數與建議
- **社交小抄**：10 句破冰萬用句 + 轉折詞，星星收藏功能
- **語音朗讀**：喇叭圖示使用瀏覽器 `speechSynthesis` 朗讀英文
- **語音跟讀打分**：麥克風圖示使用 `SpeechRecognition` 錄音辨識，比對你念的內容與目標句子的相似度給分（僅 Chrome / Edge / Safari 部分版本支援，且需要麥克風權限）
- **AI 自訂情境**：輸入任何主題，由 Claude 即時生成一組新的 4 輪對話情境
- **PWA**：可安裝到手機桌面、離線開啟 App 外殼

## 專案結構

```
app/
  layout.tsx              # 全站 layout，註冊 service worker
  page.tsx                # 主要 App（所有畫面邏輯都在這裡）
  manifest.ts              # PWA manifest（Next.js 原生支援）
  api/generate-scenario/   # 自訂情境的伺服器端 API route
public/
  sw.js                     # 離線快取用 service worker
  icon-192.png / icon-512.png
```

## 注意事項

- 語音辨識（SpeechRecognition）目前仍是 Chrome/Edge/Safari 的非標準 API，Firefox 尚未支援；沒有支援的瀏覽器會自動隱藏跟讀打分按鈕
- 發音打分是用「辨識出的文字」跟「目標句子」做文字相似度比對，近似反映發音準確度，並非真正的音素分析
