import axios from "axios";

export const getEmailBody = async (id) => {
  try {
    const response = await axios.get(
      `https://flipkart-email-mock.vercel.app/?id=${id}`
    );
    const result = response.data;

    const { body } = result;
    return body;
  } catch (err) {
    if (err) throw err;
  }
};
