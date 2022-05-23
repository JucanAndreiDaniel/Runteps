import { useState, useEffect } from "react";
import axios from "axios";

import pathString from "../PathString";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      await axios
        .get(pathString + "/api/user/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((_) => {
          setLoading(false);
        });
    }

    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
