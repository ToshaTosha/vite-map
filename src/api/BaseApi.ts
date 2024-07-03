import axios, {
    AxiosRequestConfig,
    Method,
  } from 'axios'
  import UrlPattern from 'url-pattern'
  import omit from 'lodash/omit'

  export interface BaseApiParams {
    [key: string]: unknown;
  }

  type BaseApiResponse<T> = {
    data?: T;
    meta?: never;
    errors: unknown[];
  }

  type BaseApiResponseCollection<T> = BaseApiResponse<T>[];
  
  const URL_PATTERN_OPTIONS = { segmentNameCharset: 'a-zA-Z0-9_-' }
  
  const createAxiosInstance = (baseURL: string) => {
    const axiosInstance = axios.create({
      baseURL,
      timeout: process.env.NODE_ENV === 'production' ? void 0 : 10000,
    })
  
    return axiosInstance
  }
  
  export abstract class BaseApi<
    T,
    TT = T,
    BP extends BaseApiParams = BaseApiParams,
    BR extends BaseApiResponse<T> = BaseApiResponse<T>,
    BRC extends BaseApiResponseCollection<TT> = BaseApiResponseCollection<TT>,
    BRN extends BaseApiResponse<never> = BaseApiResponse<never>,
    > {
    protected abstract readonly endpoint: string | ((params: number) => string);
  
    constructor(
      protected readonly baseURL = 'http://localhost:8005',
      protected readonly endpointPrefix = '',
      protected readonly http = createAxiosInstance(baseURL),
      protected readonly hasFinishSlash = true,
    ){

    }
  
    public static getDefaultBaseURL = (): string => {
      if (window.location.port) {
        return window.location.origin
      }
      return [
        window.location.origin,
        process.env.VUE_APP_PORT,
      ]
        .filter(Boolean)
        .join(':')
    };
  
    protected getUrl(path: string, params?: BP, urlParams?: number): [string, Partial<BP>, string] {
      let endpoint
      if (urlParams && typeof this.endpoint === 'function') {
        endpoint = this.endpoint(urlParams)
      } else {
        endpoint = this.endpoint
      }
      let fullUrl = [
        this.endpointPrefix,
        endpoint,
        path,
      ].filter(Boolean).join('/')
  
      fullUrl = fullUrl.replace(/\/\//g, '/')
      let pattern
  
      try {
        pattern = new UrlPattern(fullUrl, URL_PATTERN_OPTIONS)
      } catch {
        pattern = new UrlPattern(path, URL_PATTERN_OPTIONS)
      }
  
      const cleanedParams = omit(params || {}, pattern.names)
  
      try {
        const url = pattern.stringify(params || {})
        return [url, cleanedParams, fullUrl]
      } catch (e) {
        return [fullUrl, cleanedParams, fullUrl]
      }
    }
  
    public request<T1, R = T1>(
      method: Method, url: string, config: AxiosRequestConfig = {},
    ): Promise<R> {
      if (!this.endpoint && process.env.NODE_ENV !== 'production') {
        throw new Error(`You must set endpoint in "${this.constructor.name}"`)
      }
  
      return this.http.request<T1, R>({ ...config, method, url })
    }
  
    public getAll<P extends BP, R extends BRC = BRC>(
      rawParams: P, config?: AxiosRequestConfig,
    ) {
      const path = this.hasFinishSlash ? '/' : ''
      const [url, params] = this.getUrl(path, rawParams)
      return this.request<never, R>('GET', url, { params, ...config })
    }
  
    public getOne<P extends BP, R extends BR = BR>(
      id: string|number, rawParams?: P, config?: AxiosRequestConfig,
    ) {
      const path = this.hasFinishSlash ? `${id}/` : id.toString()
      const [url, params] = this.getUrl(path, rawParams)
      return this.request<never, R>('GET', url, { params, ...config })
    }
  
    public getListById<D extends BP, R extends BR = BR>(
      data: D, config?: AxiosRequestConfig,
    ) {
      const path = this.hasFinishSlash ? '/' : ''
      const [url] = this.getUrl(path, data)
      return this.request<never, R>('POST', url, { data, ...config })
    }
  
    public create<D extends BP, R extends BR = BR>(
      data: D, config?: AxiosRequestConfig,
    ) {
      const path = this.hasFinishSlash ? 'create/' : 'create'
      const [url] = this.getUrl(path, data)
      return this.request<never, R>('POST', url, { data, ...config })
    }
  
    public update(data: Object, config?: AxiosRequestConfig) {
      const path = this.hasFinishSlash ? `/update/` : `/update`
      const [url] = this.getUrl(path)
      return this.request('POST', url, { data, ...config })
    }
  
    public delete<R = BRN, P extends BP = BP>(
      id: string|number, params?: P, config?: AxiosRequestConfig,
    ) {
      const path = this.hasFinishSlash ? `${id}/delete/` : `${id}/delete`
      const [url] = this.getUrl(path, params)
      return this.request<never, R>('POST', url, config)
    }
  }
  
  export abstract class BaseLkPublicApi<
      T,
      TT = T,
      BP extends BaseApiParams = BaseApiParams,
      BR extends BaseApiResponse<T> = BaseApiResponse<T>,
      BRC extends BaseApiResponseCollection<TT> = BaseApiResponseCollection<TT>,
      BRN extends BaseApiResponse<never> = BaseApiResponse<never>,
      > extends BaseApi<T, TT, BP, BR, BRC, BRN> {
    constructor(
        protected readonly baseURL = 'http://localhost:8005',
        protected readonly endpointPrefix = '',
    ) {
      super(baseURL, endpointPrefix)
    }
  }
  