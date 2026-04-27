import { pipeline } from "@xenova/transformers";

let extractor;

const loadModel = async () => {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
};

export const getEmbedding = async (text) => {
  await loadModel();

  const result = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return result.data; // clean vector
};
export const getBatchEmbeddings = async (texts) => {
  const embeddings = [];

  for (const text of texts) {
    const emb = await getEmbedding(text);
    embeddings.push(emb);
  }

  return embeddings;
};