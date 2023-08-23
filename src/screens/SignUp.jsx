import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
function SignUp(){
    const navigate = useNavigate();
    const [credentials,setCredentials] = React.useState({name:"",email:"",password:"",location:""});

    const handleSubmit = async (ele) =>{
        console.log("entered ");
        ele.preventDefault();  // synthetic event;
        const response = await fetch("http://localhost:5000/api/createuser",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password,location: credentials.location})
        });
        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert('Enter Valid credentials');
        }
        else{
            navigate("/login");
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
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value = {credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange} id="exampleInputPassword1"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
        </>
    );
}

export default SignUp;