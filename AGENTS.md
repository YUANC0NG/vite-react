# AGENTS.md - 开发指南

此文件为在此代码库中工作的 AI 代理提供指导。

## 快速命令

### 开发
```bash
npm run dev          # 启动开发服务器 (http://localhost:5173)
npm run build        # TypeScript 编译 + Vite 生产构建到 dist/
npm run preview      # 本地预览生产构建
npm run lint         # 运行 ESLint
```

### 测试
**未配置测试框架**。若需添加,请安装 Vitest:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## 代码风格指南

### 命名约定
| 类型 | 约定 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `App.tsx`, `MarketList.tsx` |
| 工具文件 | camelCase 或 lowercase | `api.ts`, `httpClient.ts` |
| 组件 | PascalCase | `const Component = () => {}` |
| 变量/函数 | camelCase | `useState`, `handleClick` |
| 常量 | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| CSS 类 | kebab-case | `market-list-container` |

### 导入风格
```typescript
// 1. React 优先
import { useState, useEffect } from 'react'

// 2. 第三方库
import { create } from 'zustand'

// 3. 内部模块 (相对路径)
import { useMarketStore } from '@/stores/marketStore'
import { fetchCryptoData } from '@/api/crypto'

// 4. 样式
import './MarketList.css'
```

### 组件结构
```typescript
import { useState } from 'react'

// 1. 类型定义
interface Props {
  title: string
  onAction: () => void
}

// 2. 函数组件
export function MarketList({ title, onAction }: Props) {
  const [state, setState] = useState(initialValue)

  // 3. 事件处理器
  const handleClick = () => {
    // 实现
  }

  // 4. 副作用
  useEffect(() => {
    // 副作用逻辑
  }, [])

  // 5. 渲染
  return (
    <div className="container">
      {/* JSX 内容 */}
    </div>
  )
}

export default MarketList
```

### TypeScript 规则
- **严格模式已启用** - 所有文件必须通过类型检查
- 偏好类型推断,必要时显式类型
- 禁用 `any` - 使用 `unknown` 或具体类型
- 非空断言仅在确保非空时使用: `document.getElementById('root')!`
- 未使用变量会报错 (`noUnusedLocals: true`)

### 状态管理
- **局部状态**: 使用 React hooks (`useState`, `useReducer`, `useContext`)
- **全局状态**: 使用 Zustand (已安装 `^5.0.9`)
  - Store 位置: `src/stores/`
  - 命名: `useFeatureStore`

### API 层
```typescript
// src/api/crypto.ts (示例结构)
import type { CryptoData } from '@/types'

export async function fetchCryptoData(): Promise<CryptoData[]> {
  const response = await fetch('https://api.example.com/crypto')
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data')
  }
  return response.json()
}
```

### 错误处理
```typescript
// 1. try/catch 用于异步操作
async function loadData() {
  try {
    const data = await fetchData()
    return data
  } catch (error) {
    console.error('Failed to load data:', error)
    // 抛出或处理错误
    throw error
  }
}

// 2. 错误边界 (添加 ErrorBoundary 组件)
```

### 样式
- **Tailwind CSS**: 使用工具类
- **组件 CSS**: 复杂样式放在 `.css` 文件中
- CSS 类命名遵循 BEM 或 kebab-case

## 项目结构

```
src/
├── api/              # API 调用和数据获取逻辑
├── components/       # React 组件
│   ├── common/      # 通用组件 (Button, Modal, etc.)
│   ├── layout/      # 布局组件 (Header, Sidebar, etc.)
│   └── market/      # 市场相关组件
├── constants/       # 常量 (API endpoints, config values)
├── hooks/          # 自定义 React hooks
├── pages/          # 页面组件
│   ├── MarketList/ # 市场列表页
│   ├── Favorites/  # 收藏页
│   └── Detail/     # 详情页
├── stores/         # Zustand 全局状态管理
├── styles/         # 全局样式和主题
├── utils/          # 工具函数
├── App.tsx         # 根组件
└── main.tsx        # 入口点
```

## 配置文件

| 文件 | 用途 |
|------|------|
| `vite.config.ts` | Vite 构建配置 |
| `tsconfig.json` | TypeScript 配置 (严格模式) |
| `eslint.config.js` | ESLint 规则 |
| `tailwind.config.js` | Tailwind CSS 配置 |

## 开发工作流

1. 创建组件/功能
2. 添加类型定义
3. 实现 API 层 (如需)
4. 创建状态管理 (如需)
5. 编写组件逻辑
6. 添加样式
7. 运行 `npm run lint` 检查
8. 运行 `npm run build` 验证

## 重要注意事项

- **无路由配置** - 需要添加 `react-router-dom`
- **无测试** - 建议添加 Vitest + Testing Library
- **无 Prettier** - 使用 ESLint 进行格式化
- **API 目录为空** - 需要实现 API 集成
- **stores 目录为空** - 使用 Zustand 实现全局状态
