# Spring Security. 

> [官方文档](https://spring.io/projects/spring-security)

## 什么是Spring Security？

Spring Security是一个Java框架，用于保护应用程序的安全性。它提供了一套全面的安全解决方案，
包括身份验证、授权、防止攻击等功能。Spring Security基于过滤器链的概念，
可以轻松地集成到任何基于Spring的应用程序中。它支持多种身份验证选项和授权策略，
开发人员可以根据需要选择适合的方式。此外，Spring Security还提供了一些附加功能，
如集成第三方身份验证提供商和单点登录，以及会话管理和密码编码等。

## 核心组件

- <code>SecurityContextHolder</code> 持有应用程序当前的安全上下文，包括认证信息。
- <code>Authentication</code> 示用户的认证信息，通常包括用户名和密码。
- <code>AuthenticationManager</code> 认证管理器，用于处理认证请求。
- <code>UserDetailsService</code> 用于从数据库或其他存储系统加载用户特定数据。
- <code>UserDetails</code> 用户的详细信息,在整个认证过程中，Spring Security能够使用这些详细信息来进行用户验证和授权。

## security对认证的支持

## 配置


