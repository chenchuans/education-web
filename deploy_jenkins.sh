npm config set registry http://registry.npm.taobao.org/
# 安装yarn
npm i yarn -g
# yarn切换为淘宝源
yarn config set registry https://registry.npm.taobao.org
###

# 安装项目中的依赖
yarn
# 打包
yarn build


# 创建新镜像
docker build -t gjf/web . && \

docker stop web

docker rm web

# 使用 docker stack 启动服务
docker run --name web -d -p 800:80  gjf/web