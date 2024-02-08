import Login from "./Login";
import { Navigate, useNavigate } from 'react-router-dom'

const Home=()=>{
    const navigate = useNavigate()
return(
     <div>
        <button onClick={() => navigate("/Login")}>Singup</button>
        <button onClick={() => navigate("/Virtual")}>Enter In Virtual World</button>
     </div>
)
}

export default Home;