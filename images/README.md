# 图片资源文件夹

这个文件夹用于存放网站所需的图片资源。

## 文件夹结构

```
images/
├── README.md          # 说明文件
├── hero/              # 首页横幅图片
├── members/           # 成员头像图片
├── activities/        # 活动相关图片
├── videos/            # 视频缩略图
├── gallery/           # 画廊图片
└── icons/             # 图标文件
```

## 图片使用说明

### 首页横幅
- 文件名：`hero-banner.jpg` 或 `hero-banner.png`
- 建议尺寸：1200x400px
- 用途：首页主横幅背景

### 成员头像
- 文件名：`member-{姓名}.jpg` 或 `member-{姓名}.png`
- 建议尺寸：200x200px
- 用途：成员展示区域

### 活动图片
- 文件名：`activity-{活动名}.jpg` 或 `activity-{活动名}.png`
- 建议尺寸：400x300px
- 用途：活动卡片展示

### 视频缩略图
- 文件名：`video-{序号}.jpg` 或 `video-{序号}.png`
- 建议尺寸：800x450px
- 用途：视频播放器封面

### 画廊图片
- 文件名：`gallery-{序号}.jpg` 或 `gallery-{序号}.png`
- 建议尺寸：300x300px
- 用途：图片画廊展示

## 图片格式建议

- **JPG**：适合照片类图片，文件较小
- **PNG**：适合图标和透明背景图片
- **WebP**：现代格式，文件更小，质量更好

## 图片优化

建议上传前对图片进行优化：
- 压缩图片大小
- 调整到合适的尺寸
- 使用适当的格式

## 在代码中使用

在HTML中引用图片：
```html
<img src="images/hero/hero-banner.jpg" alt="首页横幅">
```

在CSS中引用图片：
```css
background-image: url('images/hero/hero-banner.jpg');
```
