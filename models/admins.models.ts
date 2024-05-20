import { Schema, model, connect, disconnect, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt"
import { Admin } from "../lib/interfaces"

const objectSchema = {
    id: Number,
    username: String,
    email: String,
    password: String
}

const adminSchema = new Schema<Admin>(objectSchema);
                                                                                                                                                                       
adminSchema.pre('save', function(next) {                                                                                                                                        
    if (this.password) {                                                                                                                                                        
        let salt = bcrypt.genSaltSync(8)                                                                                                                                     
        this.password = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})

const Admin = model<Admin>("Admin", adminSchema);

export default Admin;

async function run() {
    await connect("mongodb://localhost:27017")
    const testAdmin: HydratedDocument<Admin> = new Admin({
        id: 1,
        username: "admin",
        email: "admin@admin.com",
        password: "admin"
    })
    await testAdmin.save();
    console.log("Admin saved");
    disconnect();
}

run().catch(err => console.error(err))