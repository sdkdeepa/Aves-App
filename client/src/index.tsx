import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css' // css bundled 
import * as serviceWorker from './serviceWorker';
import { makeAuthRouting } from './routing'; 

ReactDOM.render(
  makeAuthRouting(),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
