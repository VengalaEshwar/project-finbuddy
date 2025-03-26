import toast from "react-hot-toast";
const initialState = {
    isLoggin: localStorage.getItem("isLoggin") === "true" || false,
    name : localStorage.getItem("name"),
  };
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        try {
          cookies.remove("finbuddy"); // Remove cookie
          toast.success("Logout successful!");
          localStorage.setItem("isLoggin", "false");
          return {
            isLoggin: false,
            role: null,
            data: null,
          };
        } catch (e) {
          toast.error("you are logged out");
        }
      }
    },
  });