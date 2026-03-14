"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TextAreaField } from "@/app/components/form/TextAreaField";
import { ContactUsForm as ContactUsFormType } from "../types";
import { InputField } from "@/app/components/form/InputField";
import { contactUsSchema } from "../utils/validationSchema";
import { useContactUs } from "../api/useContactUs";
import { Button } from "@/app/components/Button";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const { mutate, isPending } = useContactUs();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsFormType>({
    resolver: zodResolver(contactUsSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactUsFormType) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Message sent successfully.");
        reset();
      },
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="name"
        className="flex items-center gap-2.5 mt-[50px] mb-4"
      >
        <div className="size-[15px] min-w-[15px] bg-black" />
        <p className="text-left w-full whitespace-nowrap">NAME</p>
      </label>
      <InputField
        registration={register("name")}
        className=" border-b! rounded-none border-x-0! border-t-0! px-0! focus-within:border-b-black!"
        hasError={errors.name}
        errorMessage={errors.name?.message}
      />
      <label
        htmlFor="email"
        className="flex items-center gap-2.5 mt-[50px] mb-4"
      >
        <div className="size-[15px] min-w-[15px] bg-black" />
        <p className="text-left w-full whitespace-nowrap">Email</p>
      </label>
      <InputField
        type="email"
        className=" border-b! rounded-none border-x-0! border-t-0! px-0! focus-within:border-b-black!"
        registration={register("email")}
        hasError={errors.email}
        errorMessage={errors.email?.message}
      />
      <label
        htmlFor="messaged"
        className="flex items-center gap-2.5 mt-[50px] mb-2"
      >
        <div className="size-[15px] min-w-[15px] bg-black" />
        <p className="text-left w-full whitespace-nowrap">Message</p>
      </label>
      <TextAreaField
        id="message"
        className=" border-b! rounded-none border-x-0! border-t-0! px-0! focus-within:border-b-black! resize-none! h-10 py-0!"
        registration={register("message")}
        hasError={errors.message}
        errorMessage={errors.message?.message}
      />
      <Button
        type="submit"
        variant="outline"
        className="mt-14"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactUsForm;
