import * as formService from "./form.service.js";
import  ApiResponse  from "../../utils/ApiResponse.js";

export const createForm = async (req, res) => {
  const form = await formService.createForm(req.body, req.user.id);

  res.json(new ApiResponse(201, form, "Form created"));
};