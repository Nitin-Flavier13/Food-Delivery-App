import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import Caroursel from '../components/Carousel';
import Card from '../components/Card';

function Home(){
    const [search,setSearch] = React.useState('');
    const [foodCat,setFoodCat] = React.useState([]);
    const [foodItem,setFoodItem] = React.useState([]);   // it will store an array

    // get the data from backend
    const loadData = async ()=>{
        let response = await fetch("http://localhost:5000/api/fooddata",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log("shit i am dead");
        setFoodItem(response[0]);
        setFoodCat(response[1]);

        console.log(response[0],response[1]);
    }

    React.useEffect(()=>{
        loadData();
        console.log("done loading data");
    },[]);   // whenever this page load first then the data is loaded.

    const searchOnChange = (event)=>{
        setSearch(event.target.value);
    }
    // #2B2730 272829
    return (

        <div style={{backgroundColor:"#272829"} } className="mb-0">  
            <div className="mt-0"> <Navbar/> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption d-none d-md-block" style={{zIndex:"5"}}>
                            <div className="d-flex justify-content-center" >
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={searchOnChange}/>
                                <button className="btn btn-outline-danger txt-white rounded" type="submit">Search</button>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300×300/?barbeque" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !==[] 
                    ? foodCat.map((data)=>{
                        return (
                            <div className="row mb-4">
                                <div key={data._id} className="fs-3 m-3" style={{color: "white"}}>
                                    {data.CategoryName}
                                </div>
                                <hr style={{borderTop: "2px solid white"}}/>
                                {
                                    foodItem !==[] ?
                                    foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                    .map((filterItems)=>{
                                        return (
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                <Card 
                                                   foodItem = {filterItems}
                                                   options = {filterItems.options[0]}
    
                                                />
                                            </div>    
                                        )
                                    })
                                    :
                                    <div>
                                        No such data found
                                    </div>
                                }
                            </div>
                        )
                    })
                    : ""

                }
                {/* <Card/>
                <Card/>
                <Card/> */}
            </div>

            <div> <Footer/> </div>
        </div>
    );
}

export default Home;