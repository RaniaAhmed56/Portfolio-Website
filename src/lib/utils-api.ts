/**
 * Converts snake_case object keys to camelCase
 */
export function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  } else if (obj !== null && typeof obj === 'object') {
    const camelCaseObj: any = {};
    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      camelCaseObj[camelKey] = snakeToCamel(obj[key]);
    }
    return camelCaseObj;
  }
  return obj;
}

/**
 * Wraps fetch to automatically convert snake_case responses to camelCase
 */
export async function apiCall(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(url, options);
  return response;
}
