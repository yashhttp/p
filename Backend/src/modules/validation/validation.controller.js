import { validateFormService } from "./validation.service.js";

export const validateForm = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const data = req.body;

    const result = await validateFormService(formId, data);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};