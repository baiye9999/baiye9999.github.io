# About 组件图片资源目录

这个目录用于存放About组件中四个功能卡片的相关图片资源。

## 目录结构

```
Static/about/
├── README.md           # 本说明文件
├── 1.jpg              # 百业活动背景图片
├── 2.jpg              # 精英团队背景图片
├── 3.jpg              # 精彩内容背景图片
└── 4.jpg              # 互助合作背景图片
```

## 图片规格建议

- **尺寸**: 建议使用 800x600 像素或更高分辨率
- **格式**: 推荐使用 JPG 或 AVIF 格式以优化加载速度
- **风格**: 符合燕云十六声游戏风格，使用深色调和金色元素
- **内容**: 每个图片应该与对应的功能主题相关

## 使用方式

在About.vue组件中，可以通过以下路径引用这些图片：

```css
.activity-card .card-background {
  background-image: url('/Static/about/1.jpg');
}

.team-card .card-background {
  background-image: url('/Static/about/2.jpg');
}

.content-card .card-background {
  background-image: url('/Static/about/3.jpg');
}

.cooperation-card .card-background {
  background-image: url('/Static/about/4.jpg');
}
```

## 图片对应关系

- **1.jpg** → 百业活动卡片 (activity-card)
- **2.jpg** → 精英团队卡片 (team-card)  
- **3.jpg** → 精彩内容卡片 (content-card)
- **4.jpg** → 互助合作卡片 (cooperation-card)

## 注意事项

- 请确保图片文件大小适中，避免影响页面加载速度
- 建议使用WebP或AVIF格式以获得更好的压缩效果
- 图片应该具有良好的对比度，确保文字内容清晰可读
