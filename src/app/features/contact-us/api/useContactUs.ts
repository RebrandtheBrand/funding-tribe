import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { fetchData } from "@/app/utils/fetchData";
import { transformError } from "@/app/utils/utils";
import { AxiosErrorResponse } from "@/app/types";

export interface ContactUsPayload {
  name: string;
  email: string;
  message: string;
}

export const useContactUs = () => {
  return useMutation<Response, AxiosErrorResponse, ContactUsPayload>({
    mutationFn: (payload) =>
      fetchData<ContactUsPayload>(`/api/contact-us`, "POST", payload),

    onError: (error) => {
      toast.error(transformError(error));
    },
  });
};
