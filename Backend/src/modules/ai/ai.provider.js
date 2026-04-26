import axios from "axios";
import { MODEL } from "./ai.constants.js";

const HF_API = `https://api-inference.huggingface.co/models/${MODEL}`;

export const getBatchEmbeddings = async (texts) => {
  const res = await axios.post(
    HF_API,
    { inputs: texts },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
      },
    }
  );

  return res.data;
};