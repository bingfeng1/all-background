[TOC]

作为所有前端系统配置的总后台
尝试写一下具体的开发步骤

需要完成的功能
- [x] 博客文章分类增删改查功能
- [x] 写博客文章与预览的滚动条联动效果
- [ ] 个人信息的图标功能
- [ ] 个人信息的头像，可以是本地上传，也可以是网络链接
- [x] 个人信息修改后，删除本地图片（如果有的话）
- [x] 博客文章的增删改查，查看图片
- [x] 可增删改查博客首页的更多链接
- [ ] 可以增加一个回收箱，回收文章内容
- [ ] 首页可以类似大屏隐藏所有的标题、侧边、底部

# 项目建立
通过create-react-app新建项目，并加入antd框架
需要使用antv所以也需要通过官网下载安装

# 路由计划
- Home：首页（由下方内容配置，甚至模板可以了配置，）
- Blog：博客相关页面
  - editor：作者配置
  - article：文章增删改查
  - articleGroup：文章分类管理
- 首页所有可能会用到的图表信息
  - 服务器的CPU等，访问量等信息
  - 这里包含各类，各种不同的页面
  - 可以是地图，可以是图表
- Extend:辅助功能
  - ExtendLink：扩展链接
  - TimedTask：定时循环任务
  - 配置自身的首页功能
- 系统功能：
  - ChangeLog：网站更新记录
  - BugLog：错误记录
  - 未来的生成报表等等


# 路由配置
> 路由都在config/menuConfig中配置
> 通过判断是否为网络地址决定页面的权限，只有localhost时候，才能进入特定的路由
- "/"：匹配首页Home
- '/blog'：博客
  - "/blog/editor"：匹配博客个人信息
  - '/blog/articles'：匹配博客文章列表
  - '/blog/articles-group'：文章分类管理


# 首页

# 博客
## 个人信息
- 分两行
1、 头像，昵称，总访问次数
2、 表格

## api
- /getEditor：获取作者信息
- /private/updateEditor：修改个人信息
  
- /getArticles：获取文章
- /private/addArticle：添加文章
- /private/deleteArticle：删除文章
- /private/updateArticle：更新文章信息

- /getArticleGroup：获取分类信息
- /private/updateArticleGroup：修改分类信息
- /private/addArticleGroup：添加分类信息
- /private/deleteArticleGroup：删除分类

- /getArticleDetail：获取文章详情

- /getExtendLink：获取扩展链接
- /private/addExtendLink：添加分类信息
- /private/updateExtendLink：修改分类信息
- /private/deleteExtendLink：删除分类

- /getTimedTask：获取定时任务
- /private/changeTimedTask：是否启动定时任务

- /getNcov：获取病毒信息
- /getComputerInfo：获取电脑信息