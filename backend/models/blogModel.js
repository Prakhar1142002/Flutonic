const mongoose = require("mongoose")

const blogSchema= new mongoose.Schema({

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    reckeywords:
    [
        {
           type:String
        }
    ],

    likes:{
        type:Number,
        default:0
    },

    Comments:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],

},{
    timestamps:{
        createdAt:'created_at'
    }
})

blogSchema.virtual('numcomments').get(()=>{
    return this.Comments.length
})

blogSchema.index({author:1})

module.exports= mongoose.model("Blog",blogSchema)
