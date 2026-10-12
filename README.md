# 考场时钟 · PWA 单机版

网页应用版考场时钟（行测 14:00—15:30 / 申论 16:15—18:45），一套文件覆盖 iPhone、安卓、Windows、Mac，均可"安装"为独立应用：全屏运行、独立图标、断网可用。

## 文件

| 文件 | 作用 |
|---|---|
| index.html | 全部逻辑（表盘、计时、暂停、提示音） |
| manifest.webmanifest | 安装清单（应用名、图标、全屏方式） |
| sw.js | 离线缓存 |
| icon-180/192/512.png | 应用图标 |

## 使用方法

1. 本应用使用GitHub Pages进行静态托管
2. 手机 / 电脑浏览器打开网址：https://473954089.github.io/guangdong-exam-clock/
3. 安卓 Chrome：菜单 → 安装应用
4. iPhone Safari：分享 → 添加到主屏幕；桌面 Chrome/Edge：地址栏安装图标

## 电脑试运行

直接双击 `index.html` 用浏览器打开即可使用（按 F11 全屏体验最佳）。
