"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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
          to: "medesse.allao@sovedahci.com",
        }),
      });

      if (response.ok) {
        toast.success("Message envoyé avec succès!");
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
                    href="mailto:info@noviscoworking.com"
                    className="text-sm ml-4"
                  >
                    <small className="block">Mail</small>
                    <strong>medesse.allao@sovedahci.com</strong>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">
                Réseaux sociaux
              </h2>
              <ul className="flex mt-4 space-x-4">
                {/* Icônes sociales inchangées */}
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
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#1A557A] text-white tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-novis_orange-dark"
              }`}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
