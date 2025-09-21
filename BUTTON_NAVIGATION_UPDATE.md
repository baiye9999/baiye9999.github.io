## 按钮导航功能更新

### 更新内容：
1. 为三个内容区块按钮添加了导航功能：
   - '查看混剪' 按钮 → 导航到 #videos 部分
   - '参与活动' 按钮 → 导航到 #activities 部分  
   - '查看人员' 按钮 → 导航到 #members 部分

2. HTML 更新：
   - 为每个按钮添加了唯一ID和onclick事件
   - 保持了原有的样式和布局

3. JavaScript 更新：
   - 添加了 navigateToSection() 函数
   - 使用 scrollIntoView() 实现平滑滚动
   - 函数已设为全局可访问

### 使用方法：
用户点击任何一个按钮，页面会平滑滚动到对应的内容部分。

### 技术实现：
- 使用 element.scrollIntoView() API
- behavior: 'smooth' 提供平滑滚动效果
- block: 'start' 确保目标元素显示在视口顶部

