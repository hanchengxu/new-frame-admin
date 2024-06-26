import { createPinia } from 'pinia';
import piniaLogPlugin from '../../plugin/piniaLogPlugin';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();

pinia.use(piniaLogPlugin);
pinia.use(createPersistedState({ storage: localStorage, auto: true }));

export default pinia;
