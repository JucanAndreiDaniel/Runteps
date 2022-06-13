import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useLogout() {
  let navigate = useNavigate();

  const logoutUser = async () => {
    try {
      axios.defaults.xsrfHeaderName = "X-CSRFToken";
      axios.defaults.xsrfCookieName = "csrftoken";
      await axios
        .post(process.env.REACT_APP_API_URL + "/api/logout/", {
          config: {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        })
        .then((_) => {
          localStorage.removeItem("token");
          navigate("/login");
        })
        .catch((err) => {
          console.log("E:" + err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logoutUser,
  };
}
