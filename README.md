[TOC]

作为所有前端系统配置的总后台
尝试写一下具体的开发步骤

目前需要完成的功能
- [x] 博客文章分类增删改查功能
- [ ] 写博客文章与预览的滚动条联动效果
- [ ] 个人信息的图标功能
- [ ] 个人信息的头像，可以是本地上传，也可以是网络链接
- [ ] 个人信息修改后，删除本地图片（如果有的话）
- [ ] 博客文章的增删改查，查看图片
- [ ] 可增删改查博客首页的更多链接
- [ ] 可以增加一个回收箱，回收文章内容

# 项目建立
通过create-react-app新建项目，并加入antd框架
需要使用antv所以也需要通过官网下载安装

# 路由计划
- Home：首页，服务器的CPU等，访问量等信息
- Blog：博客相关页面
  - editor：作者配置
  - article：文章增删改查
- ChangeLog：网站更新记录
- BugLog：错误记录


# 路由配置
> 路由都在config/menuConfig中配置
> 通过判断是否为网络地址决定页面的权限，只有localhost时候，才能进入特定的路由
- "/"：匹配首页Home
- "/blog/editor"：匹配博客个人信息
- '/blog/articles'：匹配博客文章列表


# 首页

# 博客
## 个人信息
- 分两行
1、 头像，昵称，总访问次数
2、 表格

## api
- /private/getEditor：获取作者信息
- /private/updateEditor：修改个人信息
- /private/getArticles：获取文章
- /private/addArticle：添加文章
- /private/deleteArticle：删除文章