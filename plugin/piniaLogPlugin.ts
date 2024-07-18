import { PiniaPlugin, PiniaPluginContext, StateTree, _DeepPartial } from 'pinia';
import dayjs from 'dayjs';

type PiniaLogPluginConig = {
  open: boolean;
  showArgs: boolean;
};

const piniaLogPlugin: PiniaPlugin = (
  context: PiniaPluginContext,
  config: PiniaLogPluginConig = { open: true, showArgs: false },
) => {
  const { store } = context;

  //store reset
  store.resetAll = <T extends _DeepPartial<StateTree>>(initData: T) => {
    store.$patch(initData);
  };

  if (config.open) {
    store.$onAction(({ name, store, args, onError }) => {
      const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

      console.log(`${startTime} Store:${store.$id} Action:${name} ${config.showArgs ? args : ''}`);

      onError((_error) => {
        //TODO
      });
    });
    // store.$subscribe((mutation) => {
    //   // 响应 store 变化
    //   console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`);
    //   console.log(mutation);
    // });
  }
};

export default piniaLogPlugin;
