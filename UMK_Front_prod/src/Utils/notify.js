import { toast } from "react-toastify";

export function notify(message, status = "success") {
  toast[status](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return 1;
}
