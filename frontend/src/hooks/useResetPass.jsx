import axios from "axios";

export default function useResetPassword() {

    const passwordReset = async (email) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + "/api/password/reset/", { email: email })
        }
        catch (err) {
            console.log(err);
        }
    }

    const passwordChange = async (old, new1, new2) => {
        try {
            var data = new FormData();
            data.append("old_password", old);
            data.append("new_password1", new1);
            data.append("new_password2", new2);

            await axios.post(process.env.REACT_APP_API_URL + "/api/password/change/", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    return {
        passwordReset,
        passwordChange,
    };
}
