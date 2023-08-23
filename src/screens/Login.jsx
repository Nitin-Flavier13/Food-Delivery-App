import React from 'react';
import {Link,useNavigate} from 'react-router-dom';

function Login(){
    let navigate = useNavigate();
    const [credentials,setCredentials] = React.useState({email:"",password:""});

    const handleSubmit = async (ele) =>{
        console.log("entered ");
        ele.preventDefault();  // synthetic event;
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
        });
        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert('Enter Valid credentials');
        }
        else{
            localStorage.setItem("userEmail",credentials.email);  // for checking out with order
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
    }
    const onChange = (event) => {
        console.log("event.target.value");
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }
    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/createuser" className='m-3 btn btn-danger'>SignUp</Link>
            </form>
        </div>
        </>
    );
}

export default Login;