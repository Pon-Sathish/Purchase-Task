import { BrowserRouter } from 'react-router';
import './App.css';
// import { Login } from './components/pagess/login/login';
// import { Addnew } from './components/pagess/addnew/addnew';
// import { Sidebar } from './components/layouts/sidebar/sidebar';
import { Routers } from './components/pagess/router';

function App() {
  const islogin = sessionStorage.getItem("loginValue")
  console.log(islogin, "app", sessionStorage.getItem("loginValue"));

  return <>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </>
}

export default App;
