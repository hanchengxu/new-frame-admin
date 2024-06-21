import { PiniaPlugin, PiniaPluginContext } from 'pinia'
import dayjs from 'dayjs';

type PiniaLogPluginConig = {
    open: boolean
    showArgs: boolean
}

const piniaLogPlugin: PiniaPlugin = (context: PiniaPluginContext, config: PiniaLogPluginConig = { open: true, showArgs: false }) => {

    const { store } = context;

    if (config.open) {
        store.$onAction(({ name, store, args, onError }) => {

            const startTime = dayjs().format("YYYY-MM-DD HH:mm:ss")

            console.log(`${startTime} Store:${store.$id} Action:${name} ${config.showArgs ? args : ""}`);

            onError((_error) => {
                //TODO
            })
        })
    }


}

export default piniaLogPlugin;