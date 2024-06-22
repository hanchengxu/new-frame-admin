import { createPinia } from 'pinia';
import piniaLogPlugin from '../../plugin/piniaLogPlugin';

const pinia = createPinia();

pinia.use(piniaLogPlugin);

export default pinia;
