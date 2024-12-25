# springboot notes.

## springboot启动流程.

1. 启动入口
```java
@SpringBootApplication
public class WarmwindDemoApplication {
    public static void main(String[] args) {
        // 首先在程序的入口main方法开始，调用run方法
        SpringApplication.run(WarmwindDemoApplication.class, args);
    }
}
```

2. @SpringBootApplication注解
```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration // 注册为配置类
@EnableAutoConfiguration // 配置可自动装配
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
) // 声明可扫描Bean 
public @interface SpringBootApplication {
    ...
}
```

3. SpringApplication.run(WarmwindDemoApplication.class, args);方法
```java
public class SpringApplication {
    ...
    
    // 接收一个WarmwindDemoApplication.class对象和可变参数args，包装成一个Class数组，然后调用另一个run方法。
    public static ConfigurableApplicationContext run(Class<?> primarySource, String... args) {
        return run(new Class[]{primarySource}, args);
    }

    // 创建一个SpringApplication实例，并调用其run方法来启动应用程序，返回一个ConfigurableApplicationContext对象。
    // 这个对象代表了 Spring 应用上下文，通过它可以管理 Bean、获取 Bean 等操作。
    public static ConfigurableApplicationContext run(Class<?>[] primarySources, String[] args) {
        return (new SpringApplication(primarySources)).run(args);
    }
    
    // 有参构造，接受一个可变长参数，然后调用另一个有参构造。
    public SpringApplication(Class<?>... primarySources) {
        this((ResourceLoader)null, primarySources);
    }
    
    // 创建SpringApplication实例
    public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
        this.addCommandLineProperties = true;
        this.addConversionService = true;
        this.headless = true;
        this.additionalProfiles = Collections.emptySet();
        this.isCustomEnvironment = false;
        this.applicationContextFactory = ApplicationContextFactory.DEFAULT;
        this.applicationStartup = ApplicationStartup.DEFAULT;
        this.properties = new ApplicationProperties();
        this.resourceLoader = resourceLoader;
        Assert.notNull(primarySources, "PrimarySources must not be null");
        this.primarySources = new LinkedHashSet(Arrays.asList(primarySources));
        this.properties.setWebApplicationType(WebApplicationType.deduceFromClasspath());
        this.bootstrapRegistryInitializers = new ArrayList(this.getSpringFactoriesInstances(BootstrapRegistryInitializer.class));
        this.setInitializers(this.getSpringFactoriesInstances(ApplicationContextInitializer.class));
        this.setListeners(this.getSpringFactoriesInstances(ApplicationListener.class));
        this.mainApplicationClass = this.deduceMainApplicationClass();
    }
}
```
