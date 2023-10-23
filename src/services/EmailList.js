import axios from "axios";

export const getEmailList = async () => {
  try {
    const response = await axios.get("https://flipkart-email-mock.vercel.app/");
    const result = response.data;
    //destructure just to get the array
    const { list } = result;
    return list;
  } catch (err) {
    if (err) throw err;
  }
};
