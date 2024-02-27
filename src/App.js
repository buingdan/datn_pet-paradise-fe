import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';
import store from "./redux/store"
import { Provider } from 'react-redux'
import DashboardPage from './pages/Admin/DashboardPage';
import HomePage from './pages/HomePage/HomePage';
function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        {/* <DashboardPage></DashboardPage> */}
        <HomePage></HomePage>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


