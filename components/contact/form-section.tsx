"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from '../ui/button';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';


interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function FormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [open, setOpen] = useState(false)
const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  setIsSubmitting(true);
  try {
    const response = await fetch("/api/contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        to: "INFOS@sovedahci.com",
      }),
    });

    if (response.ok) {
      toast.success("Message envoyé avec succès!");
      setOpen(true); // Add this line to show the dialog
      reset();
    } else {
      throw new Error("Erreur lors de l'envoi du message");
    }
  } catch (error) {
    toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <section className="relative overflow-hidden isolate px-4 py-8 mx-auto max-w-screen-2xl">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-4xl bg-white font-[sans-serif]">
          <div>
            <h1 className="text-3xl font-semibold font-saudagar">Parlons</h1>
            <p className="text-sm text-gray-500 mt-4">
              Vous avez une grande idée ou une marque à développer et vous avez
              besoin d&apos;aide ? N&apos;hésitez pas à nous contacter, nous serions ravis
              d&apos;en savoir plus sur votre projet et de vous aider.
            </p>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">Email</h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                  <a
                    href="INFOS@sovedahci.com"
                    className="text-sm ml-4"
                  >
                    <small className="block">Mail</small>
                    <strong>INFOS@sovedahci.com</strong>
                  </a>
                </li>
              </ul>
            </div>

         
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="ml-auto space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nom"
                {...register("name", { required: "Le nom est requis" })}
                className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-novis_yellow focus:bg-transparent ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide",
                  },
                })}
                className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-novis_yellow focus:bg-transparent ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Sujet"
                {...register("subject", { required: "Le sujet est requis" })}
                className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-novis_yellow focus:bg-transparent ${
                  errors.subject ? "border-red-500" : ""
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Message"
                {...register("message", { required: "Le message est requis" })}
                className={`w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-novis_yellow focus:bg-transparent ${
                  errors.message ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#1A557A] text-white tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-novis_orange-dark"
              }`}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </form>
        </div>
      </div>
       <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Message envoyé
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Votre message a été envoyé avec succès. Nous vous contacterons bientôt !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-[#1A557A] px-3 py-2 text-sm font-semibold text-[#F4E0D7] shadow-xs hover:bg-perspectives_orange-dark sm:ml-3 sm:w-auto"
                >
                  Fermer
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
