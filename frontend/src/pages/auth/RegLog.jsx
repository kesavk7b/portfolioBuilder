import { useContext, useState } from 'react';
import '../../assets/style/auth.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {jwtDecode} from 'jwt-decode';
const RegLog = () =>{
    const location = useLocation();
    const type = location.state?.type || "reg";

    const [regForm,setRegForm] = useState();
    const [logForm,setLogForm] = useState();

    const {setLogin,setAuthToken}  = useContext(AuthContext)
    const handleRegister = (e)=>{
        e.preventDefault();
        console.log(regForm);
        axios.post('http://localhost:8000/user/register/',regForm).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/user/login/',logForm).then((response)=>{
            localStorage.setItem('access',response.data.access)
            localStorage.setItem('refresh',response.data.refresh)

            setAuthToken(response.data.access);
            setLogin(true);
            navigate("/"); 
        })

        // scheduleAutoLogout();
    }

    // const logout = () =>{
    //     localStorage.removeItem("access");
    //     localStorage.removeItem("refresh");
    //     setLogin(false);
    //     setAuthToken(null);
    //     navigate('/login',{state:{type:"log"}})
    // }

    // const scheduleAutoLogout = () => {
    //     const token = localStorage.getItem("access");
    //     if (token) {
    //         const decoded = jwtDecode(token);
    //         const now = Date.now() / 1000;
    //         const delay = (decoded.exp - now) * 1000; // milliseconds

    //         setTimeout(() => {
    //             logout();
    //         }, delay);
    //     }
    // };
    return (
        <div className='d-flex' style={{height:"100%",backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
            <div className='card p-3' style={{backgroundColor:"grey",textAlign:"center",width:"20rem"}}>
                {type === "reg" &&
                    (
                        <form onSubmit={handleRegister}>
                            <h1>Register</h1>
                            <label>name</label>
                            <input className='mt-2' onChange={(e)=>setRegForm({...regForm,username:e.target.value})} name="name" type="text" /><p></p>
                            <label htmlFor="">Email</label>
                            <input className='mt-2' type="email" onChange={(e)=>setRegForm({...regForm,email:e.target.value})} /><p></p>
                            <label htmlFor="">Password</label>
                            <input className='mt-2' type="password" onChange={(e)=>setRegForm({...regForm,password:e.target.value})} /><p></p>
                            <button className='btn btn-success'>Register</button>
                        </form>
                    )
                }
                {type === "log" &&
                    (
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <input className='mt-2' type="text" onChange={(e)=>setLogForm({...logForm,username:e.target.value})} />
                            <input className='mt-2' type="text" onChange={(e)=>setLogForm({...logForm,password:e.target.value})} /><br/>
                            <input type="submit" />
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default RegLog;