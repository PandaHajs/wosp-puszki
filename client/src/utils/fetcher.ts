import { NetworkError, STORAGE_CREDENTIALS } from '@/utils';

export interface FetcherRequestInit extends Omit<RequestInit, 'body'> {
  body?: object | string | number | boolean;
  public?: boolean;
  returnVoid?: boolean;
  returnBlob?: boolean;
}

export async function fetcher<T = object>(
  url: string,
  customConfiguration = {
    public: false,
    returnVoid: false,
    returnBlob: false,
  } as FetcherRequestInit,
) {
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const credentials = localStorage.getItem(STORAGE_CREDENTIALS);
  if (credentials && !customConfiguration.public) {
    baseHeaders.Authorization = `Basic ${credentials}`;
  }

  const { headers, ...customConfig } = customConfiguration;
  const configuration: RequestInit = {
    method: customConfig.body ? 'POST' : 'GET',
    headers: { ...baseHeaders, ...headers },
    ...customConfig,
    body: customConfig.body ? JSON.stringify(customConfiguration.body) : undefined,
  };

  const response = await fetch(url, configuration);
  if (response.ok && customConfiguration.returnBlob) {
    return (await response.blob()) as T;
  } else if (response.ok && response.headers.get('Content-Type') === 'application/json') {
    return (response.ok && (await response.json())) as T;
  } else if (response.ok) {
    return (response.ok && (await response.text())) as T;
  } else {
    const errorMessage = await response.text();
    throw new NetworkError(errorMessage, response.status, response.statusText);
  }
}
