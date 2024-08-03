import mongoose from "mongoose"


export const connectDB = () => {
    mongoose
        .connect(process.env.DB_URL||'', {
            dbName: "backendapi",
        })
        .then((c) => console.log(`Database Connected with ${c.connection.host}`))
        .catch((e) => console.log(e));
};

