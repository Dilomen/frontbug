export interface GlobalWindows extends Window {
  [propsName: string]: any;
}

interface BaseError {
  readonly stack?: any;
  message?: any;
  readonly error?: Error;
  type?: string;
  eventsRecord?: any;
  framework?: boolean;
}

type HttpHeaders = {
  [propsName: string]: string;
};

export interface ProgramError extends BaseError {
  path?: string;
  lineNo?: number;
  columnNo?: number;
  reason?: string;
}

export interface NetworkError extends BaseError {
  readonly status?: number;
  responseURL?: string;
  statusText?: string;
  responseText?: string;
  headers?: HttpHeaders;
  method?: string;
  url?: string;
  requestUrl?: string;
  errorInfo?: string;
}

export interface VangenConfig {
  BASE_URL?: string;
  isFramework?: boolean;
  isNeedRecord?: boolean;
  reportErrorUrl?: string;
  RRWEB_COUNT?: number;
}
