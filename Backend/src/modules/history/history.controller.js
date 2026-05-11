import * as historyService from "./history.service.js";

export const getHistory = async (req, res) => {
  try {
    const { formId } = req.params;

    const data = await historyService.getFormHistory(
      req.user.id,
      formId
    );

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const rollback = async (req, res) => {
  try {
    const { formId, version } = req.params;

    const result = await historyService.rollbackToVersion(
      req.user.id,
      formId,
      Number(version)
    );

    res.json({
      success: true,
      message: "Rollback successful",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};