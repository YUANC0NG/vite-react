# 跨域问题解决方案

## 问题描述
本地开发环境配置了Vite代理，但部署到线上后请求仍然发送到相对路径，导致跨域错误。

## 解决方案

### 1. 环境自适应配置
- **开发环境**: 使用Vite代理 (`/proxy` → `https://data.gateapi.io`)
- **生产环境**: 直接使用完整API地址 (`https://data.gateapi.io`)

### 2. CORS代理备选方案
如果直接API调用失败，自动切换到CORS代理服务：
- `https://api.allorigins.win/raw?url=`
- `https://cors-anywhere.herokuapp.com/`
- `https://api.codetabs.com/v1/proxy?quest=`

### 3. 核心文件变更

#### `src/api/config.ts`
环境配置管理，支持开发和生产环境的API地址切换。

#### `src/api/client.ts`
智能API客户端：
- 自动检测环境
- 直接API调用失败时自动切换CORS代理
- 增强的错误处理

#### `src/api/cors.ts`
CORS代理服务配置和工具函数。

## 使用方式

### 直接使用API客户端
```typescript
import { gateClient } from '../api/client';

// 自动处理开发和生产环境的差异
const data = await gateClient.get('/api2/1/tickers');
```

### 环境配置
开发环境使用代理，生产环境自动使用完整URL，无需额外配置。

## 部署后行为
1. 首先尝试直接API调用
2. 如果CORS失败，自动使用代理服务
3. 提供多个备选代理确保可用性

这个方案确保了开发和生产环境都能正常工作，解决了线上部署的跨域问题。