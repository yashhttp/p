import History from "./history.model.js";

/**
 * Create new version (append-only system)
 */
export const createHistoryVersion = async ({
  userId,
  formId,
  newData,
  oldData = {},
  source = "AI",
  confidenceScore = 1,
}) => {
  const lastVersion = await History.findOne({ userId, formId })
    .sort({ version: -1 })
    .lean();

  const version = lastVersion ? lastVersion.version + 1 : 1;

  const changes = generateDiff(oldData, newData);

  const history = await History.create({
    userId,
    formId,
    version,
    dataSnapshot: newData,
    changes,
    source,
    confidenceScore,
  });

  return history;
};

/**
 * Get full history of a form
 */
export const getFormHistory = async (userId, formId) => {
  return await History.find({ userId, formId }).sort({ version: -1 });
};

/**
 * Rollback to a version
 */
export const rollbackToVersion = async (userId, formId, version) => {
  const target = await History.findOne({
    userId,
    formId,
    version,
  });

  if (!target) throw new Error("Version not found");

  // Create new version from rollback
  return await createHistoryVersion({
    userId,
    formId,
    newData: target.dataSnapshot,
    source: "MANUAL",
    confidenceScore: 1,
  });
};

/**
 * Simple diff engine (production-safe version)
 */
const generateDiff = (oldData, newData) => {
  const changes = [];

  const keys = new Set([
    ...Object.keys(oldData || {}),
    ...Object.keys(newData || {}),
  ]);

  for (const key of keys) {
    if (oldData?.[key] !== newData?.[key]) {
      changes.push({
        field: key,
        oldValue: oldData?.[key] ?? null,
        newValue: newData?.[key] ?? null,
      });
    }
  }

  return changes;
};