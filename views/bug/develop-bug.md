# 实际开发项目中的bug合集.

## 多线程使用submit执行业务时，子线程获取不到父线程的租户id

> Spring Security使用***SecurityContextHolder***来存储认证信息，
> 而***SecurityContextHolder***默认使用***ThreadLocal***来存储这些信息。
> 这意味着认证信息与创建它的线程绑定，新创建的线程（如异步任务）无法直接访问到这些信息。

<div class="ww-success-title">解决方案:</div>

> 更改Spring Security的数据存储策略为MODE_INHERITABLETHREADLOCAL

## 多线程使用submit执行业务时，如果线程里主动抛出异常了，应该使用try catch捕获future.get()从而拿到异常信息

```java
// 创建一个线程池，并使用submit提交一个任务线程
ThreadPoolExecutor executor = new ThreadPoolExecutor(2, 2, 30, TimeUnit.SECONDS, new ArrayBlockingQueue<>(10));
Future<?> future = executor.submit(() -> printStr("hello"));
try {
    future.get();
} catch (Exception e) {
    e.printStackTrace();
} 

public void printStr(String info) {
    System.out.println("Thread Name: " + Thread.currentThread().getName() + " " + info);
    throw new RuntimeException("Thread Name: " + Thread.currentThread().getName() + "exception");
}                     
```

## 前端后端分离的项目招生，上线的时候用户访问白屏

> 服务器的带宽只有30M，刚上线的时候大量用户同时请求前端的静态资源，导致带宽被占满了
> 最后将比较大的js文件放到oss里，让oss承担一部分的带宽压力

## mac idea使用file类读取文件报空指针异常

> 再次遇到这种问题需要排查的有:
1. 最基础的方法问题
2. 路径问题，路径最好用jdk提供的路径分隔符
3. mac的文件读取权限问题
4. 是否允许idea