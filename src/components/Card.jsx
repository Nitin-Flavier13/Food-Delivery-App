import React,{useRef,useEffect} from 'react';
import { useDispatchCart,useCart } from './ContextReducer';
function Card(props){
    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    let data = useCart();
    const [qty,setQty] = React.useState(1);
    const [size,setSize] = React.useState("");
    const priceRef = useRef();
    
    let finalPrice = qty*parseInt(options[size]);

    const handleAddToCart = async () => {
        let food = [];        // 
        for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
        }
        if(food !== []){
            // so someone again choose a particular option
            console.log(food.size+" "+size); 
            if(food.size === size){
                await dispatch({type: "UPDATE", id: props.foodItem._id,price: finalPrice,qty: qty});
                console.log("updated : "+ data);
                return ;
            }
            else if(food.size !== size){
                await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name,price: finalPrice,qty: qty,size: size });
                return;
            }
        }
        await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name,price: finalPrice,qty: qty,size: size });
        await console.log(data); 
    }

    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])

    return (
        <div>
            <div className="card mt-3" style={{"width": "16rem","maxHeight": "360px"}}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"150px",objectFit:"fill !important"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-80'>
                        <select className='m-1 h-100 bg-danger text-white rounded' onChange={(event)=> setQty(event.target.value)}>
                            {Array.from(Array(6),(err,ele)=>{
                                return (
                                    <option key={ele+1} value={ele+1}>{ele+1}</option>
                                )
                            })}
                        </select>
                        <select className='m-1 h-100  bg-danger text-white rounded' ref={priceRef} onChange={(event)=> setSize(event.target.value)}>
                            {
                                priceOptions.map((data) =>{
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    );
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ${finalPrice}/-
                        </div>
                    </div>
                    <hr/>
                    <button className={"btn btn-danger justify-center ms-2"} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card