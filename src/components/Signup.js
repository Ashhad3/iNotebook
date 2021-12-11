import React ,{useState,useContext} from 'react'
import contextValue from '../context/notes/NoteContext'
import {Link, useNavigate} from 'react-router-dom'

const Signup = () => {
  const context = useContext(contextValue);
  const {setFeature,showAlert}= context;
  const navigate = useNavigate();
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
      }
      const handleclick=async (e)=>{
          e.preventDefault();
          console.log(credentials);
          const {name,email,password,cpassword}=credentials;
       if (password !== cpassword) {
        setFeature({success:"Failed",message:"Passwords Doesn't Match"});
        showAlert();
        setcredentials({...credentials,cpassword:""})
        return;
       }
          let url = `http://localhost:5000/api/auth/createuser`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password}),
          });
          const signup = await response.json();
          if(signup.success===true){
            navigate("/");
            setFeature({success:"Success",message:"Signed Up Successfully"})
            showAlert();
          }
          else {
            setcredentials({...credentials,email:"",password:"",cpassword:""})
            setFeature({success:"Failed!",message:"Please Enter Correct Information"})
            showAlert();
          }
  }
    return (
        <section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 ">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{"borderRadius": "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              {/* onInput={`${cpassword.setCustomValidity(cpassword.value != up.value ? "Passwords do not match." : "")}`} */}
              <form onSubmit={handleclick}>

                <div className="form-outline mb-4">
                  <input type="text" id="name" name='name' required value={credentials.name}onChange={onchange} className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="name">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="email" name="email" required value={credentials.email}onChange={onchange} className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="email">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="password" required minLength={5} value={credentials.password} name='password'onChange={onchange} className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="cpassword" required minLength={5} value={credentials.cpassword} name='cpassword'onChange={onchange} className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                </div>

               

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-block btn-lg">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link> </p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}

export default Signup
