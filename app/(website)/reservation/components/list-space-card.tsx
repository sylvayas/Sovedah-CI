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
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  adressepostale: string;
  quantity: string;
  category: string;
  date: Date | undefined;
}

export default function Description({ group = { id: null, title: "Inconnu" }, space = { id: null, title: "Inconnu", adresse: "Inconnue" } }: { group?: any; space?: any }) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17)); // 17 avril 2025

  const {
  register,
  handleSubmit,
  formState: { errors, isValid },
} = useForm<IFormInput>({
  mode: "onChange",
  defaultValues: {
    date: new Date(2025, 3, 17), // Définition d'une date par défaut
  },
});
const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  if (!date) {
    toast("Erreur", {
      description: "Veuillez sélectionner une date",
    });
    return;
  }

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

    console.log("Sending email with data:", { subject: "Demande de réservation Sovedah-CI", to: [data.email, "sylvayas@gmail.com"], emailData });

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

    // Remplacer l'ancien router.push par celui-ci
    router.push(
      `/recap?type=reservation&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&adressepostale=${encodeURIComponent(data.adressepostale)}&date=${date ? dayjs(date).format("YYYY-MM-DD") : ""}&quantity=${encodeURIComponent(data.quantity)}&category=${encodeURIComponent(data.category)}&location=${encodeURIComponent(space.adresse || "Inconnue")}`
    );
  } catch (error: any) {
    console.error("Erreur dans onSubmit:", error.message, error.stack);
    toast("Erreur", {
      description: error.message || "Une erreur est survenue lors de l'envoi de la demande",
    });
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
                    {...register("email", { required: "Email est requis" })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p role="alert" className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: "Téléphone est requis" })}
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
                {...register("quantity", { required: "Quantité est requise", min: { value: 1, message: "La quantité doit être au moins 1" } })}
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
              disabled={!isValid || !date}
              className="ml-auto gap-1"
            >
              <span>
                Demander une réservation
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}