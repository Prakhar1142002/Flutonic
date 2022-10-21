const mongoose=require('mongoose')

const commentSchema= new mongoose.Schema({
    
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    likes:{
        type:Number,
        default:0
    },

    priority:{
        type:Number
    },

    content:{
        type:String,
        rqeuired:true,
        maxlength:10000
    }

},{        timestamps:{
            createdAt:'created_at',
            updatedAt:'updated_at'
        }
})

commentSchema.pre('save',(next)=>{
    this.priority=this.get('likes')
    next()
})

module.exports=mongoose.model("Comment",commentSchema)