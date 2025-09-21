# 部署说明

## 本地运行

1. 直接打开 `index.html` 文件
2. 或使用本地服务器：
   ```bash
   python3 -m http.server 8000
   ```
   然后访问 `http://localhost:8000`

## GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为源
4. 访问 `https://你的用户名.github.io/仓库名`

## 其他静态网站托管

### Netlify
1. 将代码推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 自动部署

### Vercel
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

## 自定义域名

在相应的托管平台设置自定义域名即可。

## 注意事项

- 确保所有文件都在根目录
- 图片链接使用的是占位符，需要替换为实际图片
- 视频链接需要替换为实际视频文件

##  **添加SSH密钥到GitHub**

### **SSH公钥内容：**
```
<code_block_to_apply_changes_from>
```

### **添加步骤：**

1. **登录GitHub**：
   - 访问 https://github.com
   - 使用账号：`baiye9999`
   - 密码：`sbzdgw630`

2. **进入SSH设置**：
   - 点击右上角头像 → **Settings**
   - 左侧菜单选择 **SSH and GPG keys**
   - 点击 **New SSH key** 按钮

3. **添加密钥**：
   - **Title**: `MacBook Pro - 睡不着打给我项目`
   - **Key type**: `Authentication Key`
   - **Key**: 复制上面的SSH公钥内容
   - 点击 **Add SSH key**

4. **确认添加**：
   - 输入GitHub密码确认
   - 密钥添加成功

添加完成后，让我测试SSH连接：
