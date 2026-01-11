// CORS代理服务配置
export const corsProxies = {
  // 公共CORS代理服务列表
  public: [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://api.codetabs.com/v1/proxy?quest=',
  ],
  
  // 免费的代理API服务
  free: [
    'https://jsonp.afeld.me/?url=',
    'https://thingproxy.freeboard.io/fetch/',
  ]
};

// 获取可用的CORS代理
export function getCorsProxy(): string {
  // 优先使用更可靠的代理
  const proxies = [...corsProxies.public, ...corsProxies.free];
  return proxies[Math.floor(Math.random() * proxies.length)];
}

// 获取多个代理尝试
export function getProxyList(): string[] {
  return [...corsProxies.public, ...corsProxies.free];
}

// 检查API是否支持CORS
export async function checkCorsSupport(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'cors',
    });
    return response.ok;
  } catch {
    return false;
  }
}