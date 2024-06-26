/**
 * @method useEnv 获取env变量
 * @returns {Object} 转换后的值
 * */

const useEnv = () => {
  const env = import.meta.env;
  return {
    nodeEnv: env.MODE,
  };
};

export { useEnv };
