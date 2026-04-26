import * as formService from "./form.service.js";
import  ApiResponse  from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createForm = asyncHandler(async (req, res) => {
  const form = await formService.createForm(req.body, req.user.id);

  res.json(new ApiResponse(201, form, "Form created"));
});

export const getForms = async (req, res) => {
  const result = await formService.getAllForms(req.query); // ✅ FIX

  res.json(new ApiResponse(200, result));
};

export const getForm = async (req, res) => {
  const form = await formService.getFormById(req.params.id);

  res.json(new ApiResponse(200, form));
};

export const updateForm = asyncHandler(async (req,res)=>{
    const form = await formService.updateForm(req.params.id, req.body);

    res.json(new ApiResponse(200, form, "Form updated"));
})

export const deleteForm = async (req, res) => {
  await formService.deleteForm(req.params.id);

  res.json(new ApiResponse(200,  "Form deleted", {}));
};

export const getVersions = async (req, res) => {
  const versions = await formService.getFormVersions(req.params.id);

  res.json(new ApiResponse(200, versions));
};