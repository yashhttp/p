import Joi from "joi";

const fieldSchema = Joi.object({
  label: Joi.string().required(),

  name: Joi.string().required(),

  type: Joi.string()
    .valid("text", "number", "date", "select", "radio", "checkbox", "file")
    .required(),

  required: Joi.boolean().default(false),

  order: Joi.number().required(), 

  options: Joi.array().items(Joi.string()),

  placeholder: Joi.string().allow("", null),

  validation: Joi.object({
    min: Joi.number(),
    max: Joi.number(),
    regex: Joi.string(),
  }),

  aiHint: Joi.object({
    keywords: Joi.array().items(Joi.string()),
    mappingKey: Joi.string(),
  }),
});

export const createFormSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().allow("", null),

  tags: Joi.array().items(Joi.string()),

  fields: Joi.array().items(fieldSchema).min(1).required(),
});