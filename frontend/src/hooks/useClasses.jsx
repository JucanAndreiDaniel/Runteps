import { useHistory } from "react-router-dom";
import axios from "axios";

import pathString from "../PathString";

export const getClasses = async () => {
    try {
        return await axios.get(pathString + "/api/course/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }

            }
        )
    }
    catch (err) {
        console.log(err);
    }
}
export const getClass = async (classId) => {
    try {
        return await axios.get(pathString + "/api/classes/" + classId + "/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }

            }
        )
    }
    catch (err) {
        console.log(err);
    }
}
