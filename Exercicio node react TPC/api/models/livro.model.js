const {Schema , model , version} = require("mongoose");


const livroSchema = new Schema(
    {
        nPaginas:{
            type:Number,

        },

        autor:{
            type:String,

        },
        dataPublic:{
            type:String,
        }

        }
    
);

const Livro = model("Livro",livroSchema);
module.exports = Livro;