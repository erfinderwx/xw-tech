# RJ Tech 使用与支持 · 架构预览

访问入口：https://xw-tech.de/rj/support/
原服务指南：https://xw-tech.de/rj/

本轮只部署用户支持、代理商专区、开发者资料的页面与目录框架，正式资料保持待填。

## 文件组织

- `index.html`：页面入口。
- `catalog.js`：身份、产品、车型配置、主题和资料目录；`resources` 当前为空。
- `app.js`：页面模板、导航、搜索和筛选。
- `styles.css`：黑白红视觉与响应式布局。

新增产品时在产品目录登记名称、车型、配置和适用分类，复用同一套页面。说明、视频与 PDF 将按同一主题关联；用户和代理商共用的说明只维护一份。

## 发布与检查

继续使用 xw-tech 仓库现有 GitHub Pages 自动部署，推送到 main 后发布。`rj/index.html` 保留原有服务指南与资源路径，并链接本资料中心。

```sh
node --check rj/support/catalog.js
node --check rj/support/app.js
node scripts/check-rj-support.cjs
```

框架检查覆盖目录引用、页面路由、主题范围、查询转义与新增产品复用；浏览器视觉验收尚待完成。

## 资料边界

这是公开可访问的框架预览。身份切换只表示目录分类，不是账号权限。正式资料下一轮核对后再加入。代理商证书汇编按需提供；不能将受限文件上传至公开 Git 历史，再用前端隐藏冒充访问控制。研发会议记录与内部方案不自动成为客户使用说明。
