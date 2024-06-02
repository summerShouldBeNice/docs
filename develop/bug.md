# 项目开发BUG.

## 多线程使用submit执行业务时，获取不到父线程的租户id

> Spring Security使用***SecurityContextHolder***来存储认证信息，
> 而***SecurityContextHolder***默认使用***ThreadLocal***来存储这些信息。
> 这意味着认证信息与创建它的线程绑定，新创建的线程（如异步任务）无法直接访问到这些信息。

<div class="ww-green-title">解决方案:</div>

> 
