import mongoose from "mongoose";
const mongoURI = "mongodb+srv://flavier13:Lawliet13@foody0.vy95alt.mongodb.net/Foody?retryWrites=true&w=majority"

// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Connected to MongoDB');
//         fetchData();
//     } catch (error) {
//         console.error('Error connecting to MongoDB: ', error);
//     }
// };

// async function fetchData() {
//     try {
//         console.log("lol");
//         const fetched_data = mongoose.connection.db.collection("food_item");
//         console.log(fetched_data);
//         const data = await fetched_data.find({}).toArray();
//         console.log(data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

const mongoDB = async()=>{
    try{
        await mongoose.connect(mongoURI,{useNewUrlParser: true})
        console.log("Successfully Connected to Database");
        try{
            const fetched_data = mongoose.connection.db.collection("food_item");
            const data = await fetched_data.find({}).toArray();
            // console.log(data);
            global.food_items = data;
            try{
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                const Catdata = await foodCategory.find({}).toArray();
                global.foodCategory = Catdata;
                console.log(global.foodCategory);
            }
            catch(err){
                console.log("Error while fetching food Category ");
            }
            // console.log(global.food_items);
        }
        catch(err){
            console.error("Error found in getting data "+err);
        }
    }
    catch(err){
        console.error("Error connecting to MongoDB ",err);
    }
    
}

export default mongoDB;