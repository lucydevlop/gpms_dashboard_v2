import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import RenderRoutes from '@components/RenderRoutes';
import { Store } from '@/store';
import '@styles/index.less';

// import '@ant-design/compatible/assets/index.css';

const App = () => (
  <Provider {...Store}>
    <RenderRoutes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
