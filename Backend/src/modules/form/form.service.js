import { Form } from "./form.model.js";
import { FormVersion } from "./form.version.model.js";

export const createForm = async (data, userId) => {
  return await Form.create({ ...data, createdBy: userId });
};

// export const getAllForms = async ()=>{
//     return await Form.find({ isActive:true});
// }
// export const getAllForms = async (query) => {
//   const page = parseInt(query.page) || 1;
//   const limit = parseInt(query.limit) || 10;

//   const filter = { isActive: true };

//   if (query.tag) {
//     filter.tags = query.tag;
//   }

//   if (query.search) {
//     filter.title = { $regex: query.search, $options: "i" };
//   }

//   const forms = await Form.find(filter)
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .sort({ createdAt: -1 });

//   const total = await Form.countDocuments(filter);

//   return {
//     data: forms,
//     pagination: {
//       total,
//       page,
//       limit,
//       pages: Math.ceil(total / limit),
//     },
//   };
// };
export const getAllForms = async (query = {}) => { // ✅ default empty object

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const filter = { isActive: true };

  if (query.tag) {
    filter.tags = query.tag;
  }

  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }

  const forms = await Form.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Form.countDocuments(filter);

  return {
    data: forms,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};
export const getFormById = async (id)=>{
    return await Form.findById({ _id: id, isActive:true});
}

export const updateForm = async (id, updateData) => {
  const existing = await Form.findById(id);

  if (!existing) throw new Error("Form not found");

  //  Save old version
  await FormVersion.create({
    formId: id,
    snapshot: existing.toObject(),
    version: existing.version,
  });

  existing.version += 1;

  Object.assign(existing, updateData);

  return await existing.save();
};

export const deleteForm = async (id) => {
  return await Form.findByIdAndUpdate(id, { isActive: false });
};