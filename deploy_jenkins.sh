export PATH=/root/node-v12.8.1-linux-x64/bin:$PATH

yarn config set puppeteer_download_host https://npm.taobao.org/mirrors

yarn add puppeteer --ignore-scripts

cd node_modules/puppeteer

yarn exec node install.js

# 安装项目中的依赖
##yarn
cd ..

cd ..
# 打包
yarn build


# 创建新镜像
docker build -t gjf/web . && \

docker stop web

docker rm web

# 使用 docker stack 启动服务
docker run --name web -d -p 800:80  gjf/web
