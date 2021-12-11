import React,{useState,useContext} from 'react'
import contextValue from '../context/notes/NoteContext'
import {useNavigate,Link} from "react-router-dom"

const Login = () => {
  const context = useContext(contextValue);
  const {setFeature,showAlert}= context;
  const navigate = useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""})
    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
      }
      const handleclick=async (e)=>{
          e.preventDefault();
          console.log(credentials);
          const {email,password}=credentials;
          let url = `http://localhost:5000/api/auth/login`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password}),
          });
          const login = await response.json();
          if(login.success===true){
            //Save the auth token and redirect
            localStorage.setItem('token', login.authtoken)
            navigate("/");  
            setFeature({success:"Success",message:"Loged In Successfully"})
            showAlert();
          }
          else {
            setcredentials({email:"",password:""})
            setFeature({success:"Failed!",message:"Please Enter Correct Email or Password"})
            showAlert();
          }
  }
    return (
        <section className="vh-100">
        <form onSubmit={handleclick}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{"borderRadius": "1rem"}}>
                <div className="card-body p-5 text-center">
      
                  <h3 className="mb-5">Sign in</h3>
      
                  <div className="form-outline mb-4">
                    <input type="email" id="email" required value={credentials.email} onChange={onchange} name="email" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="email">Email</label>
                  </div>
      
                  <div className="form-outline mb-4">
                    <input type="password" id="password" required minLength={5} value={credentials.password}name='password' onChange={onchange} className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="password">Password</label>
                  </div>
      
            
                  
      
      
                <button className="btn btn-primary btn-lg btn-block" type="submit">Log In</button>
                <p className="text-center text-muted mt-5 mb-0">Have You Signed Up Previously? <Link to="/signup" className="fw-bold text-body"><u>Signup here</u></Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </section>
    )
}

export default Login
