import { configure } from 'mobx';

configure({ enforceActions: 'observed' });
class DashboardStore {}
export const dashboardStore = new DashboardStore();
export default DashboardStore;
