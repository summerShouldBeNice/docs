# 二进制包部署项目.

> 你可能需要先了解：[什么是二进制包安装？](/views/deploydeploy/base.md#什么是二进制包安装)

## 二进制包安装jdk
1. 将[文件上传](/views/deploydeploy/base.md#如何上传文件到linux?)到指定目录
2. 解压压缩包
```shell
tar -zxvf jdk-1.8.0.tar.gz -C /usr/local
```
3. 配置[环境变量](/views/deploydeploy/base.md#什么是环境变量?)
```shell
# 打开配置文件
vi /etc/profile
# 按i进入编辑模式在文件末尾输入
JAVA_HOME=/usr/local/jdk1.8.0
PATH=$JAVA_HOME/bin:$PATH
# 按esc/有的是caps，输入wq!回车
# 重新加载环境变量
source /etc/profile
```
4. 测试是否安装成功
```shell
java -version
```

## 二进制包安装mysql
1. 将[文件上传](/views/deploydeploy/base.md#如何上传文件到linux?)到指定目录
2. 解压压缩包到目标目录
```shell
tar -zxvf mysql5.7.44-linux-glibc2.12-x86_64.tar.gz  -C /usr/local
```
3. 重命名
```shell
mv mysql5.7.44-linux-glibc2.12-x86_64.tar.gz mysql5.7
```
4. 添加用户/组
```shell
# 进入到安装目录
cd /usr/local/mysql5.7
# 创建组
groupadd mysql
# 创建用户
useradd -r -g mysql mysql
# 设置/usr/local/mysql5.7/文件夹的拥有者
chown -R mysql:mysql ./
#创建数据库文件存放的文件夹。这个文件夹将来存放每个数据库的库文件
mkdir data

```

## 二进制包安装nginx

## 常见问题附录

### mysql问题
### mysql安装后别的服务器无法连接

### nginx反向代理不生效
