import React,{createContext,useReducer,useContext} from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,name: action.name,qty: action.qty, 
                size: action.size, price: action.price,img: action.img}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index,1);  
            return newArr;  
        case "UPDATE":
            let Arr = [...state];
            Arr.find((food,index)=>{
                if(food.id === action.id){
                    Arr[index] = {...food,qty: parseInt(action.qty) + food.qty,price: action.price + food.price}
                    return Arr;
                }
            });
            return Arr;
        case "DROP":
            let emparr = [];
            return emparr;    
        default:
            console.log("Error in Reducer");    
    }
}

const CartProvider = ({children}) => {
    
    const [state,dispatch] = useReducer(reducer,[]);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

const useCart = () => useContext(CartStateContext);
const useDispatchCart = () => useContext(CartDispatchContext);

export {CartProvider,useCart,useDispatchCart}; 