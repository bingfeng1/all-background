[TOC]

作为所有前端系统配置的总后台
尝试写一下具体的开发步奏

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
- "/"：匹配首页Home
- "/blog/editor"：匹配博客个人信息
- '/blog/articles'：匹配博客文章列表


# 首页

# 博客
