# elasticsearch学习笔记 [官方手册](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)

## 什么是elasticsearch？

> elasticsearch是一个强大的开源搜索引擎，当数据量很大的时候，
> 可以从海量的数据中快速找到需要的内容。

## es的特点.

1. 传统正向索引数据库

|id|title|description|price|
|--|-----|-----------|-----|
| 1  | 苹果手机  | apple公司旗下手机 | 6399 |
| 2  | 小米手机  | 小米高性价比手机 | 1999 |
| 3  | 小米手环  | 小米公司运动手环 | 299 |

> 按照列正向创建索引，如果按照id查询速度很快；
> 如果需要查询关键字'手机' 需要逐条扫描是否包含关键字，
> 如果不匹配就丢弃，如果匹配就收集到结果集，
> 正向索引在查找局部内容的业务场景下性能会很差

2. elasticsearch倒排索引

|term(词条)| document(文档) |
|--------|--------------|
|小米| 2,3          |
|手机| 1,2          |
|苹果| 1            |
|手环| 3            |

> es存储结构为词条和文档，词条就是按照语义分成的词语，
> 每条数据就是一个文档；es在存储数据的时候会将需要存储的数据进分词，
> 如果需要查询关键字'小米手机'，会现先将搜素词分为'小米'和'手机'两个词条，
> 然后去词条里进行查询然后就会得到文档id，然后根据文档id进行查询直接放到结果集，
> 查询词条和根据文档id进行查询是***两次索引级别***的查询，所以速度会很快

## es基础概念
1. 文档：es是面向文档存储的，可以是数据库中的一条商品数据一个订单信息，最后都会序列化成json存储到es中
2. 索引：相同类型的文档的集合，全是商品数据就放到商品索引库，全是用户数据就放到用户索引库
3. 映射：索引中文档的字段约束信息，类似表的数据结构

## 安装（使用docker）

```shell
# 创建docker网络
docker network create es-net

# 拉取es镜像
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.15.0

# 运行es容器
docker run -d \
  --name es \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  -e "discovery.type=single-node" \
  -v es-data:/usr/share/elasticsearch/data \
  -v es-plugins:/usr/share/elasticsearch/plugins \
  --network es-net \
  --privileged \
  -p 9200:9200 \
  -p 9300:9300 \
  docker.elastic.co/elasticsearch/elasticsearch:8.15.0
  
# 拉取kibana镜像（可选）如果服务器资源不够可以不安装，使用请求工具如postman代替
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.15.0

# 运行kibana容器
docker run -d \
  --name kibana \
  -e ELASTICSEARCH_HOSTS=http://es:9200 \
  --network=es-net \
  -p 5601:5601 \
  docker.elastic.co/kibana/kibana:8.15.0
```
:::tip
- ik分词器地址：https://github.com/infinilabs/analysis-ik
- 如果是在云服务器使用docker安装es，运行后需要在安全组放行端口
- es8+版本运行时候默认会开启ssl，需要修改es以及kibana的配置文件
:::

## 安装（使用二进制包）
```shell
# 1. 下载elasticsearch-8.15.0.tar.gz 安装包上传到/usr/local目录
# 2. 解压文件
tar -xvf elasticsearch-8.15.0.tar.gz
# 3. 创建es数据目录和日志目录
mkdir /usr/local/elasticsearch-8.15.0/data
mkdir /usr/local/elasticsearch-8.15.0/logs
# 4. 更改es配置文件, 在配置文件末尾根据需要添加以下内容
network.host: 0.0.0.0  #可远程访问
path.data: /usr/local/elasticsearch-8.15.0/data #设置自定义数据目录
path.logs: /usr/local/elasticsearch-8.15.0/logs #设置自定义日志目录
node.name: es-single-server   #节点名称（这个与下面一点一定要配，不然即使启动成功也会操作超时或发生master_not_discovered_exception）
cluster.initial_master_nodes: ["es-single-server"]  #发现当前节点名称
http.port: 9200    #端口号
http.cors.allow-origin: "*"   #以下皆是跨域配置
http.cors.enabled: true
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true
# 5. 创建用户组（因为es不允许root用户直接启动，如果需要root用户启动需要在启动时添加命令-Des.insecure.allow.root=true）
groupadd es
useradd es-user
passwd es-user
# 6. 账号密码为：es-user / mujin@es
# 7. 给es用户授权
chown -R es-user:es /usr/local/elasticsearch-8.15.0
# 8. 修改文件描述符限制
vim /etc/security/limits.conf
# 9. 文件末尾添加
* soft nofile 65536
* hard nofile 65536
# 10. 检查是否生效（如果不生效先exit再重新打开）
ulimit -n
# 11. 设置最大内存分配，在文件末尾添加配置，保存退出并重新加载
vim /etc/sysctl.conf 
vm.max_map_count=262144
sysctl -p
# 12. 切换用户启动es
su es-user
cd /usr/local/elasticsearch-8.15.0/bin
./elasticsearch -d
# 13. es8+以上启动后会强制要求https才能访问需要修改配置文件,需要关闭https
xpack.security.enabled: false
xpack.security.enrollment.enabled: false
xpack.security.http.ssl:
enabled: false
keystore.path: certs/http.p12
xpack.security.transport.ssl:
enabled: false
verification_mode: certificate
keystore.path: certs/transport.p12
truststore.path: certs/transport.p12
# 14. 修改后重启es
# 15. es默认的jvm内存大小是内存的一般，需要根据业务数据量在jvm.options里设置
```

## 启动流程
```shell
# 1.切换es-user用户
su es-user
# 2. 进入bin目录
cd /usr/local/elasticsearch-7.17.23/bin
# 3. 启动es(后台运行)
sh elasticsearch -d
# 4. 关闭es
ps -ef | grep elastic
kill -9 [pid]
```

## 索引库操作

1. 创建索引库
```shell
PUT http://eshost:9200/user
```

```json
{
    "mappings": {
        "properties": {
            "name": {
                "type": "keyword"
            },
            "email": {
                "type": "keyword",
                "index": false
            },
            "info": {
                "type": "text",
                "analyzer": "ik_smart"
            }
        }
    }
}
```

2. 查看索引库
```shell
GET http://eshost:9200/user
```

3. 删除索引库
```shell
DELETE http://eshost:9200/user
```

4. 修改索引库
```shell
PUT http://eshost:9200/user
```

```json
{
    "mappings": {
        "properties": {
            "new_field": {
                "type": "text"
            }
        }
    }
}
```

:::tip
索引库在创建后就不允许修改原有的字段，但是允许新增
:::





