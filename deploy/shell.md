# 常用shell命令(cenots7).

## 防火墙相关.

```shell
# 1.查看防火墙状态
sudo systemctl status firewalld
# 2.开启防火墙
sudo systemctl start firewalld
# 3.关闭防火墙
sudo systemctl stop firewalld
# 4.启用防火墙（开机自动启动）
sudo systemctl enable firewalld
# 5.禁用防火墙（开机不自动启动）
sudo systemctl disable firewalld
# 6.开放某个端口
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
# 7.重新加载防火墙规则
sudo firewall-cmd --reload
# 8.列出当前开放的端口
sudo firewall-cmd --zone=public --list-ports
# 9.关闭已开放的端口
sudo firewall-cmd --zone=public --remove-port=8080/tcp --permanent
```
> 无论是开启还是关闭端口都需要重新加载防火墙规则

## 文件相关.
```shell
# 1. 切换目录
cd .. # 切换到上一页
```
### 
