import store from "./redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect} from "react";
import {checkThunk} from "./redux/auth-reducer";
import {Spinner} from "react-bootstrap";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkThunk())
    },[])
  return (
      <BrowserRouter>
          <div className="App">
                                        <div className="wrapper">
                          <Header/>
                          <div className="content">
                              <AppRouter/>
                          </div>
                          <Footer/>
                      </div>

          </div>
      </BrowserRouter>
  );
}

export default App;
