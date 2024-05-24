import { Schema, model, connect, disconnect, HydratedDocument } from "mongoose";
import { IAdmin } from "../lib/interfaces"
const bcrypt = require('bcryptjs')

const objectSchema = {
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}

const adminSchema = new Schema<IAdmin>(objectSchema);
                                                                                                                                                                       
adminSchema.pre('save', function(next) {                                                                                                                                        
    if (this.password) {                                                                                                                                                        
        let salt = bcrypt.genSaltSync(8)                                                                                                                                     
        this.password = bcrypt.hashSync(this.password, salt)                                                                                                             
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})

const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;

// async function run() {
//     await connect("mongodb://localhost:27017")
//     const testAdmin: HydratedDocument<Admin> = new Admin({
//         id: 1,
//         username: "admin",
//         email: "admin@admin.com",
//         password: "admin"
//     })
//     await testAdmin.save();
//     console.log("Admin saved");
//     disconnect();
// }

// run().catch(err => console.error(err))