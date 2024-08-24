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





