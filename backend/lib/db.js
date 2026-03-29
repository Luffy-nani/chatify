const mongoose=require(`mongoose`);

const connectDB= async ()=>
{
    try
    {
        const conn=await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGO DB CONNECTED:",conn.connection.host);
    }
    catch(err)
    {
        console.error("Error when connecting to DB ",err);
        process.exit(1);
    }
}

module.exports = connectDB;