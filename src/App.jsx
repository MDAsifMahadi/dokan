import { useEffect, useState } from 'react'
import LoginOrsinup from './pages/LoginOrSinup'
import Home from './pages/Home'
import Detail from './pages/Detail'
import CreateDetail from './components/CreateDetail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Proceted from './utility/Proceted'
import MassContext from './contexts/MessContext';
import { ToastContainer, toast } from 'react-toastify'
import api from './utility/api'
import Loading from './utility/Loading'
import EditDetail from './components/EditDetail';
import DataContext from './contexts/DataContext'

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [isHimeLoading, setIsHomeLoding] = useState(false);

  useEffect(() => {
    (async()=> {
      try {
        const res = await api.get("/api/chacklogin");
        setIsLogin(res.data.isLogin);
      } catch (error) {
        setIsLoading(false);
        localStorage.removeItem("token");
        setIsLogin(error.response.data.isLogin)
      } finally{
        setIsLoading(false);
      }
    })()
  }, []);


  useEffect(()=> {
    (async () => {
      try {
        setIsHomeLoding(true);
        const res = await api.get("/api/getproduct");
        setData(res.data.data);
        setIsHomeLoding(false);
      } catch (error) {
        setIsHomeLoding(false);
        toast.error(error.response.data?.message);
      }
    })()
  }, []);


  if(isLoading) {
    return <Loading />
  }
  
  return (
    <>
      <BrowserRouter>
        <MassContext.Provider value={toast}>
        <DataContext.Provider value={{data, isHimeLoading}}>
          <Routes>
            <Route path='/login' element={<LoginOrsinup isLogin={isLogin} />}/>
            <Route path='/' element={<Proceted ><Home /></Proceted>}/>
            <Route path='/detail/:id' element={<Proceted ><Detail /></Proceted>}/>
            <Route path='/create' element={<Proceted><CreateDetail /></Proceted>}/>
            <Route path='/edit/:id' element={<Proceted><EditDetail /></Proceted>}/>
          </Routes>
          <ToastContainer />
        </DataContext.Provider>
        </MassContext.Provider>
      </BrowserRouter>
    
    </>
  )
}

export default App
