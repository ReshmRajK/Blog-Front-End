import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Add from './pages/Add';
import SingleView from './pages/SingleView';
import MyBlog from './pages/MyBlog';
import Edit from './pages/Edit';
import FilterPost from './pages/FilterPost';

function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='' element={<Header/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
        <Route path='/single_view/:_id' element={<SingleView/>}></Route>
        <Route path='/my-blog-view' element={<MyBlog/>}></Route>
        <Route path='/edit/:_id' element={<Edit/>}></Route>
        <Route path='/filter-post' element={<FilterPost/>}></Route>

      </Routes>

      <Footer/>

     
    </div>
  );
}

export default App;
