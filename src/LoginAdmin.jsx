import React ,{useState} from "react";
import {NavLink} from 'react-router-dom'
import Signup from './components/Signup'
import Axios from 'axios'
import { useHistory } from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
export default function LoginAdmin() {
  const [modalShow, setModalShow] = React.useState(false);
  const url="http://127.0.0.1:3333/admin"
  let history = useHistory();
  const [Data,setData]= useState({
    
      email :"",
      password:""
   
  
  })
  function submit(e){
    e.preventDefault();
    Axios.post(url,{
      
        email: Data.email,
        password: Data.password,
    

    })
    .then(res=>{
        localStorage.setItem('token',res.data.token.token)
        console.log(localStorage.getItem("token"))
      history.push('/Admin')
      toast.success('vous etes connecté!',{position:toast.POSITION.BOTTOM_RIGHT})
    }

       
    )
   
    
  
}


function handle(e){
    const newData ={...Data}
    newData[e.target.id]=e.target.value
    setData(newData)
    console.log(newData)

}

  return (
    <>
      <div className="my-5">
        <h1 className="text-center"> Login </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form onSubmit={(e)=>submit(e)}>
              <div className="mb-3">
                <label  className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email" onChange={e=>handle(e)} value={Data.email}
                 
                  placeholder="Entrer address email"
                />
              </div>
              <div className="mb-3">
                <label  className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password" onChange={e=>handle(e)} value={Data.password}
                  placeholder="entrer mot de passe"
                />
              </div>
              <div class="col-12">
                <button className="btn btn-outline-primary" type="submit">
                  se connecter
                </button>
              </div>
            </form>
           
          </div>
     
        </div>
      </div>
      
    </>
  );
}