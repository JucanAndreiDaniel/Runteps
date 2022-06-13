import axios from "axios";

export const getClasses = async () => {
    try {
        return await axios.get(process.env.REACT_APP_API_URL + "/api/course/",
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
        return await axios.get(process.env.REACT_APP_API_URL + "/api/classes/" + classId + "/",
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
