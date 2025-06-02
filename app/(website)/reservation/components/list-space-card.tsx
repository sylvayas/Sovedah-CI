"use client";

import TitleSection from "@/components/title-section";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  adressepostale: string;
  quantity: string;
  category: string;
  date: Date | undefined;
}

export default function Description({
  group = { id: null, title: "Inconnu" },
  space = { id: null, title: "Inconnu", adresse: "Inconnue" },
}: {
  group?: any;
  space?: any;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17)); // 17 avril 2025
  const [open, setOpen] = useState(false); // State for dialog visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      date: new Date(2025, 3, 17),
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data, event) => {
    // Prevent default form submission behavior to ensure no navigation occurs
    event?.preventDefault();

    if (!date) {
      toast.error("Erreur", {
        description: "Veuillez sélectionner une date",
      });
      return;
    }

    setIsSubmitting(true); // Disable button during submission
    try {
      const emailData = {
        location: space.adresse || "Inconnue",
        clientName: data.name,
        clientEmail: data.email,
        clientPhone: data.phone,
        clientAdresse: data.adressepostale,
        date: dayjs(date).format("YYYY-MM-DD"),
        priceType: `${data.quantity} ${data.category}`,
      };

      console.log("Sending email with data:", {
        subject: "Demande de réservation Sovedah-CI",
        to: [data.email, "INFOS@sovedahci.com"],
        emailData,
      });

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Demande de réservation Sovedah-CI",
          to: [data.email, "sylvayas@gmail.com"],
          emailData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Échec de l'envoi de l'email");
      }

      // Show success modal and toast
      setOpen(true);
      toast.success("Succès", {
        description: "Votre demande de réservation a été envoyée avec succès !",
      });
      reset(); // Reset form fields
      setDate(new Date(2025, 3, 17)); // Reset date to default
    } catch (error: any) {
      console.error("Erreur dans onSubmit:", error.message, error.stack);
      toast.error("Erreur", {
        description: error.message || "Une erreur est survenue lors de l'envoi de la demande",
      });
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  const formatDate = (date: Date | undefined): string => {
    return date ? dayjs(date).format("YYYY-MM-DD") : "";
  };

  return (
    <section className="container min-h-[300px] py-14 relative">
      <TitleSection title={"Détail de réservation"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4"
      >
        <div className="relative flex-col items-start gap-8 flex">
          <div className="grid w-full items-start gap-6">
            <div className="grid gap-6 rounded-lg border p-4">
              <CardTitle>Informations personnelles</CardTitle>
              <div className="grid gap-3">
                <Label htmlFor="name">Nom & Prénoms</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", { required: "Nom & Prénom sont requis" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p role="alert" className="text-red-600 text-sm">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email est requis",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email invalide",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p role="alert" className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      required: "Téléphone est requis",
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Numéro de téléphone invalide",
                      },
                    })}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && <p role="alert" className="text-red-600 text-sm">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="adressepostale">Adresse postale</Label>
                <Input
                  id="adressepostale"
                  type="text"
                  {...register("adressepostale", { required: "Adresse postale est requise" })}
                  aria-invalid={errors.adressepostale ? "true" : "false"}
                />
                {errors.adressepostale && <p role="alert" className="text-red-600 text-sm">{errors.adressepostale.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Détail de la réservation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="Entrez la quantité"
                {...register("quantity", {
                  required: "Quantité est requise",
                  min: { value: 1, message: "La quantité doit être au moins 1" },
                })}
                aria-invalid={errors.quantity ? "true" : "false"}
              />
              {errors.quantity && <p role="alert" className="text-red-600 text-sm">{errors.quantity.message}</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                type="text"
                placeholder="Entrez la catégorie"
                {...register("category", { required: "Catégorie est requise" })}
                aria-invalid={errors.category ? "true" : "false"}
              />
              {errors.category && <p role="alert" className="text-red-600 text-sm">{errors.category.message}</p>}
            </div>
            <div className="grid gap-3">
              <Label>Sélectionner une date</Label>
              <Calendar
                id="date"
                date={date}
                setDate={setDate}
                showOutsideDays={true}
                fromDate={new Date()}
                className="rounded-md border"
              />
              {date ? (
                <p className="text-sm text-gray-600">
                  Date sélectionnée : {formatDate(date)}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Aucune date sélectionnée</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={!isValid || !date || isSubmitting}
              className="ml-auto gap-1"
            >
              <span>
                {isSubmitting ? "Envoi en cours..." : "Demander une réservation"}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Success Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
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
                      Demande envoyée
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Votre demande de réservation a été envoyée avec succès. Nous vous contacterons bientôt !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-[#8E421C] px-3 py-2 text-sm font-semibold text-[#F4E0D7] shadow-xs hover:bg-[#A0522D] sm:ml-3 sm:w-auto"
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