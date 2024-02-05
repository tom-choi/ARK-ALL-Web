# 前端開發文檔

## 全局 Theme Color 遷移方法

目前採用`uiMap.js` + `tailwind.config.js`的方法。`uiMap.js`由 ARK ALL app 繼承而來，包含了各種 theme color。不排除日後拋棄`uiMap.js`的可能。

```js
export const COLOR_DIY = {
  // 原主題色 #005F95；春日限定：#5f8e5a；夏日限定1：#328ad1;
  themeColor: isLight ? "#4796d6" : "#4a9cde",
  themeColorLight: isLight ? "#7ca8cc" : "#2d5f87",
  themeColorUltraLight: isLight ? "#c9e1f5" : "#23323d",
  secondThemeColor: "#FF8627",
};
```

如要使用這些 themeColor，請先將你所需要的 themeColor 放入`tailwind.config.js`的`theme.colors`中:

```js
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        themeColor: COLOR_DIY.themeColor,
        themeColorLight: COLOR_DIY.themeColorLight,
        themeColorUltraLight: COLOR_DIY.themeColorUltraLight,
      },
    },
}
```

將一個元素的文字設置為`themeColor`：

```html
<div className="text-themeColor"></div>
```

將一個元素的背景色設置為`themeColor`：

```html
<div className="bg-themeColor"></div>
```

其中,`themeColor`為你在`tailwind.config.js`中所設定的 themeColor 之 key 的名稱。
