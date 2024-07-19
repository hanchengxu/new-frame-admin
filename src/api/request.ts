import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isEmpty } from 'radash';
import { useGlobalStore } from '@/stores/global';
const env: ImportMetaEnv = import.meta.env;

// 创建axios实例
const instance = axios.create({
  timeout: Number(env.VITE_AXIOS_TIMEOUT),
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //baseURLの設定
    if (isEmpty(config.baseURL) && !config?.url?.startsWith('http') && !config?.url?.startsWith('https')) {
      config.baseURL = env.VITE_API_BASE_URL;
    }
    useGlobalStore().startProcessing();
    return config;
  },
  (error) => {
    useGlobalStore().endProcessing();
    return Promise.reject(error);
  },
);

// 响应response拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    useGlobalStore().endProcessing();
    const { data } = response;
    if (response.status !== 200 && response.status != 302) {
      return Promise.reject(data);
    } else {
      return data;
    }
  },
  (err) => {
    useGlobalStore().endProcessing();
    useGlobalStore().message('システムエラー', 'error');
    return Promise.reject(err);
  },
);

const requests = {
  post<T>(path: string, data = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return instance.post(path, data, config);
  },

  get<T>(path: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return instance.get(path, { params: params, ...config });
  },

  delete(path: string, data = {}, config: AxiosRequestConfig = {}) {
    return instance.delete(path, { data: data, ...config });
  },

  put(path: string, data = {}, config: AxiosRequestConfig = {}) {
    return instance.put(path, { data: data, ...config });
  },
};

export default requests;
