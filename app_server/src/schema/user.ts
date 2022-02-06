import * as mongoose from 'mongoose'



interface User {
    password: string;
    email: string;
    
}


const userSchema = new mongoose.Schema<User>({
    password: { type: String, required: true, length:5 },
    email: { type: String, required: true },
 
  });



const User = mongoose.model<User>('User', userSchema);
export default User;
  

