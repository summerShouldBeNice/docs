# 代码优化.

### 在小规模数据的业务上尽量以可读性优先. 在保证可读性的基础上再去思考如何提升性能.

#### 例:


```java
// 原始代码
if (TaskState.NOT_STARTED.getValue().equals(oaTask.getState())) {
    supervise.setState(SuperviseTaskState.UNDONE.getValue());
} else {
    supervise.setState(SuperviseTaskState.DONE.getValue());
}

// 优化写法
supervise.setState(
    TaskState.NOT_STARTED.getValue().equals(oaTask.getState())
    ? SuperviseTaskState.UNDONE.getValue()
    : SuperviseTaskState.DONE.getValue()
)
```