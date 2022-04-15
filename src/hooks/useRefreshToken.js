import useAuth from "./useAuth";
import axios from "../api/axios"

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      "Content-Type": "application/json",
      withCredentials: true
    });
    setAuth(prev => {

      return {...prev, accessToken: response.data.accessToken}
    })
    return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken;
