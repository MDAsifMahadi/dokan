import { Navigate } from 'react-router-dom'

const Proceted = ({ children}) => {
    const isLogin = localStorage.getItem("token")
    if(!isLogin) {
        return <Navigate to="/login" replace/>
    } else {
        return children;
    }
}

export default Proceted;
