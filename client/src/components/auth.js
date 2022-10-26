import axios from "axios";

const auth = async () => {
  try {
    const res = await axios.get('/authenticate', { auth: { username: '', password: '' } });
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};