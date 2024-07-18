import { createPinia } from 'pinia';
import piniaLogPlugin from '../../plugin/piniaLogPlugin';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { StoreGeneric } from 'pinia';

const pinia = createPinia();

pinia.use(piniaLogPlugin);

export const storeMap = new Map<string, StoreGeneric>();
pinia.use(({ store }) => {
  storeMap.set(store.$id, store);
});

pinia.use(
  createPersistedState({
    storage: localStorage,
    auto: true,
    key: (id) => `__pinia__${id}`,
  }),
);

export default pinia;
