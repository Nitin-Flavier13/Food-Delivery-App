import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import {Cart} from '../screens/Cart';
import {Modal} from '../Modal';
import { useCart } from '../components/ContextReducer';
import '/node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import the Bootstrap CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // Make sure to import the Bootstrap JS bundle
import '/node_modules/bootstrap/dist/js/bootstrap.bundle';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


function Navbar(){
    const navigate = useNavigate();
    const [cartView,setCartView] = React.useState(false);

    let data = useCart();
    const logoutClick = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    const onClickCart = () => {
        setCartView(true);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#900C3F"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1" to="/">Foody</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto mb-2">
                        <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>  
                        {
                            localStorage.getItem("authToken") ? 
                            <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                            : ""
                        } 
                    </div>
                    
                    {
                        localStorage.getItem("authToken") ? 
                        <div className='d-flex'>
                            <div className="btn bg-white text-danger mx-2" onClick={logoutClick}>
                                LogOut
                            </div>
                            <div className="btn bg-white text-danger mx-2" onClick={onClickCart}>
                                My Cart{" "}
                                {
                                    console.log("Error here: "+ data)
                                }
                                <Badge pill bg="danger">{data.length}</Badge>
                            </div>
                            {
                                cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null
                            }    
                        </div>
                        : <div className='d-flex'><Link className="btn bg-white text-danger mx-1" to="/login">Login</Link>
                        <Link className="btn bg-white text-danger mx-1" to="/createuser">SignUp</Link></div>
                    }
                        
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;