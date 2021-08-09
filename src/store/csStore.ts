import { configure } from 'mobx';

configure({ enforceActions: 'observed' });
class CsStore {}
export const csStore = new CsStore();
export default CsStore;
