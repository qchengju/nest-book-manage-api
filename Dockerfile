# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm 并安装依赖
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm run build

# 生产阶段
FROM node:20-alpine AS base

WORKDIR /app

# 复制 .env 文件
COPY .env.prod ./.env

# 复制依赖文件
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm 并只安装生产依赖
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

# 从构建阶段复制编译后的文件
COPY --from=builder /app/dist ./dist

EXPOSE 13000

# 运行应用
CMD ["node", "dist/main.js"]