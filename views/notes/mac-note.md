# [Homebrew](https://brew.sh/zh-cn/)

## Homebrew相关

1. Homebrew 的两个术语：
   - Formulae：软件包，包括了这个软件的依赖、源码位置及编译方法等； 
   - Casks：已经编译好的应用包，如图形界面程序等。
2. Homebrew 相关的几个文件夹用途：
   - bin：用于存放所安装程序的启动链接（相当于快捷方式）
   - etc：brew安装程序的配置文件默认存放路径
   - Library：Homebrew 系统自身文件夹
   - Cellar：通过brew安装的程序将以 \[程序名/版本号] 存放于本目录下
3. brew install和brew cask install的区别
   - brew install 会下载源码解压，然后 ./configure && make install ，同时会包含相关依存库，并自动配置好各种环境变量。
   - brew cask install 是针对已经编译好了的应用包（.dmg/.pkg）下载解压，然后放在统一的目录中（Caskroom），省掉了自己下载、解压、安装等步骤。

## 常用命令

```shell
brew -v                             # 查看brew版本
brew update                         # brew自身更新
brew outdated                       # 查看哪些包可以更新
brew search TEXT|/REGEX/            # 软件搜索
brew info [FORMULA|CASK...]         # 查看软件相关信息
brew install FORMULA|CASK...        # 安装软件
brew uninstall FORMULA|CASK...      # 卸载软件
brew list [FORMULA|CASK...]         # 查看安装列表
brew upgrade [FORMULA|CASK...]      # 更新已安装的包
brew cleanup                        # 清理所有包的旧版本
brew cleanup [FORMULA ...]          # 清理指定包的旧版
brew cleanup -n                     # 查看可清理的旧版本包，不执行实际操作
brew pin [FORMULA ...]              # 锁定某个包
brew unpin [FORMULA ...]            # 取消锁定
brew services list                  # 查看使用brew安装的服务列表
brew services run formula|--all     # 启动服务（仅启动不注册）
brew services start formula|--all   # 启动服务，并注册
brew services stop formula|--all    # 停止服务，并取消注册
brew services restart formula|--all # 重启服务，并注册
```

::: tip
brew pin命令 <br/>
因为upgrade会一次更新所有的包的，当我们想忽略某个包的时候可以使用这个命令
:::


