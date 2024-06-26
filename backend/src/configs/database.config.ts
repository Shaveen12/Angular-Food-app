import {connect, ConnectOptions} from 'mongoose'

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        useUnifiedTopology:true
    } as ConnectOptions).then(
        () => console.log("connect succesfully"),
        (error) => console.log(error)
    )
}