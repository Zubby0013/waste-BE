import {connect} from "mongoose"

const URL:string = "mongodb://127.0.0.1:27017/flowBD";

export const dbConnect = async ()=>{
    try {
        connect(URL).then(()=>{
            console.log()
            console.log("dbConnect successful")
        })
    } catch (error) {
        console.log(error)
    }
}