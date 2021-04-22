import toast from "react-hot-toast";

export const notifySubmit = text => toast.success(text);
export const notifyError = text => toast.error(text);
