const user = new Schema({
    firstName:{
        type: String,
        required: true
    },    
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

})

const userModel = mongoose.model("User", user);