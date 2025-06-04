"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import dayjs from "dayjs";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TitleSection from "@/components/title-section";
import { AVANTAGES } from "@/components/offers/DescriptionAllSpaces";
import Image from "next/image";

// Interfaces
interface IFormInput {
  name: string;
  email: string;
  phone: string;
  adressepostale: string;
  quantity: string;
  category: string;
  date: Date | undefined;
}

// Utility Functions
const formatDate = (date: Date | undefined, isMonthlyTarif: boolean): string => {
  return date ? dayjs(date).format(isMonthlyTarif ? "YYYY-MM" : "YYYY-MM-DD") : "";
};

const formatDescriptionForEmail = (description: {
  intro: string;
  whyChoose: string[];
  pricing: string[];
  callToAction: string;
}): string => {
  return [
    description.intro,
    "",
    "Pourquoi choisir ce produit ?",
    ...description.whyChoose.map((item) => `- ${item}`),
  ]
    .filter((line) => line.trim() !== "")
    .join("\n")
    .slice(0, 2000);
};

const sendEmail = async (
  data: IFormInput,
  date: Date | undefined,
  isMonthlyTarif: boolean,
  router: ReturnType<typeof useRouter>,
  selectedProduct: {
    image: string;
    title: string;
    description: { intro: string; whyChoose: string[]; pricing: string[]; callToAction: string };
  }
) => {
  try {
    const emailData = {
      clientName: data.name,
      clientEmail: data.email,
      clientPhone: data.phone,
      clientAdresse: data.adressepostale,
      date: formatDate(date, isMonthlyTarif),
      quantity: data.quantity,
      category: data.category,
      productTitle: selectedProduct.title,
      productDescription: formatDescriptionForEmail(selectedProduct.description),
    };

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Demande de réservation Sovedah-CI",
        to: [data.email, "infos@sovedah-ci.com"],
        emailData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    router.push(
      `/recap?type=reservation&name=${encodeURIComponent(
        data.name
      )}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(
        data.phone
      )}&adressepostale=${encodeURIComponent(data.adressepostale)}&date=${formatDate(
        date,
        isMonthlyTarif
      )}&quantity=${encodeURIComponent(data.quantity)}&category=${encodeURIComponent(
        data.category
      )}&productImage=${encodeURIComponent(
        selectedProduct.image
      )}&productTitle=${encodeURIComponent(selectedProduct.title)}&productDescription=${encodeURIComponent(
        formatDescriptionForEmail(selectedProduct.description)
      )}`
    );
  } catch (error) {
    toast("Erreur", {
      description: "Une erreur est survenue lors de l'envoi de la demande",
    });
  }
};

// Main Component
export default function ListeSpaceCardProd() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17));
  const [isMonthlyTarif, setIsMonthlyTarif] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(AVANTAGES[0]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<IFormInput>({ mode: "onChange", defaultValues: { quantity: "1", category: "" } });

  // Watch form fields
  const category = watch("category");

  // Read query parameters to set selected product
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const title = query.get("title");
    if (title) {
      const decodedTitle = decodeURIComponent(title);
      const foundProduct = AVANTAGES.find(
        (item) => item.title.toLowerCase() === decodedTitle.toLowerCase()
      );
      if (foundProduct) {
        setSelectedProduct(foundProduct);
      } else {
        toast("Erreur", {
          description: "Produit non trouvé, veuillez sélectionner un produit valide",
        });
        setSelectedProduct(AVANTAGES[0]);
      }
    } else {
      toast("Avertissement", {
        description: "Aucun produit spécifié, produit par défaut sélectionné",
      });
      setSelectedProduct(AVANTAGES[0]);
    }
  }, []);

  // Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    if (!selectedProduct) {
      toast("Erreur", {
        description: "Aucun produit sélectionné, veuillez choisir un produit",
      });
      return;
    }
    setIsSubmitting(true);
    await sendEmail(formData, date, isMonthlyTarif, router, selectedProduct);
    setIsSubmitting(false);
  };

  // Effects
  useEffect(() => {
    setValue("date", date, { shouldValidate: true });
    setIsMonthlyTarif(category.toLowerCase().includes("mois"));
  }, [date, category, setValue]);

  return (
    <>
      {/* Product Section */}
      <section className="container min-h-[200px] mb-14 relative mt-14">
        <div className="relative gap-8 items-center md:items-stretch py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <Image
            className="w-full z-10 object-cover max-w-[430px] max-h-[430px]"
            src={selectedProduct.image}
            width={100}
            height={100}
            alt={`${selectedProduct.title} image`}
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">
              {selectedProduct.title}
            </h2>
            {selectedProduct.description && (
              <div className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                <p className="mb-4">{selectedProduct.description.intro}</p>
                <h3 className="text-base font-semibold mb-2">Pourquoi choisir ce produit ?</h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedProduct.description.whyChoose.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="container min-h-[300px] py-14 relative">
        <TitleSection title="Détail de réservation" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4"
        >
          {/* Personal Information */}
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
                  {errors.name && (
                    <p role="alert" className="text-red-600 text-sm">
                      {errors.name.message}
                    </p>
                  )}
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
                    {errors.email && (
                      <p role="alert" className="text-red-600 text-sm">
                        {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: "Téléphone est requis" })}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p role="alert" className="text-red-600 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="adressepostale">Localisation/Adresse</Label>
                <Input
                  id="adressepostale"
                  type="text"
                  {...register("adressepostale", { required: "Adresse postale est requise" })}
                  aria-invalid={errors.adressepostale ? "true" : "false"}
                />
                {errors.adressepostale && (
                  <p role="alert" className="text-red-600 text-sm">
                    {errors.adressepostale.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Détail de la réservation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="quantity">Quantité</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  {...register("quantity", {
                    required: "La quantité est requise",
                    min: { value: 1, message: "La quantité doit être supérieure à 0" },
                  })}
                  aria-invalid={errors.quantity ? "true" : "false"}
                />
                {errors.quantity && (
                  <p role="alert" className="text-red-600 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Type d&apos;achat</Label>
                <select
                  id="category"
                  {...register("category", { required: "La catégorie est requise" })}
                  className="rounded-md border p-2 w-full"
                >
                  <option value="">Sélectionner le type d&apos;achat</option>
                  <option value="Détail">Détail</option>
                  <option value="En gros">En gros</option>
                </select>
                {errors.category && (
                  <p role="alert" className="text-red-600 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Date de livraison</Label>
              <Calendar
                id="date"
                date={date}
                setDate={(newDate) => {
                  setDate(newDate);
                  setValue("date", newDate, { shouldValidate: true });
                }}
                showOutsideDays={true}
                className="rounded-md border"
                disabled={(date) =>
                  category.toLowerCase().includes("mois") ? date.getDate() !== 1 : false
                }
              />
              {date ? (
                <p className="text-sm text-gray-600">
                  Date de livraison sélectionnée : {formatDate(date, isMonthlyTarif)}
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
                Demander une réservation
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  </>
);
}