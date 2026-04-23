import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
    label :{ type:String, required: true},
    name :{ type:String, required: true},
    type:{
        type:String,
        enum:['text','number','date','select', 'radio', 'checkbox', 'file'],
        required: true
    },
    required:{ type:Boolean, default: false},
    options: [{type:String}],
    placeholder : String,
    defaultValue : mongoose.Schema.Types.Mixed,
    validation : {
        min:Number,
        max:Number,
        regex:String
    },
    aiHint:{
        keywords:[String], //["full name" : "applicant name"]
        mappingKey : String //"fuleName"
    }
})

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: String,

    fields: [fieldSchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: { type: Boolean, default: true },

    version: { type: Number, default: 1 },

    tags: [String], //  search/filter
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", formSchema);