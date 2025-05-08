"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import dayjs from "dayjs";
import { toast } from "sonner";

import { usePay } from "@/hooks/usePay";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface TarifItem {
  title: string;
  price: string;
  description?: string;
}

interface TarifGroup {
  name: string;
  horaire: string;
  items?: TarifItem[];
}

interface Space {
  id: number | null;
  title: string;
  tarifs?: TarifGroup[];
  adresse?: string;
  images?: { src: string }[];
}

interface ListeSpaceProps {
  group?: { id: number | null; title: string };
  space?: Space;
}

// Utility Functions
const formatDate = (date: Date | undefined, isMonthlyTarif: boolean): string => {
  return date ? dayjs(date).format(isMonthlyTarif ? "YYYY-MM" : "YYYY-MM-DD") : "";
};

const calculateAmount = (
  quantity: string,
  category: string,
  date: Date | undefined,
  hasTarifs: boolean,
  space: Space
): number => {
  if (!quantity || !category || !date || !hasTarifs) return 0;

  const qty = parseInt(quantity) || 0;
  if (qty <= 0) return 0;

  let pricePerUnit = 0;
  if (space.tarifs) {
    for (const tarifGroup of space.tarifs) {
      if (tarifGroup.items) {
        const tarifItem = tarifGroup.items.find((item) =>
          item.title.toLowerCase().includes(category.toLowerCase())
        );
        if (tarifItem?.price) {
          const priceStr = tarifItem.price.toString().replace(/\D/g, "");
          pricePerUnit = parseInt(priceStr) || 0;
          break;
        }
      }
    }
  }

  return pricePerUnit * qty;
};

// Convert structured description to a string for email and recap
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
    "",
    ...description.pricing,
    "",
    description.callToAction,
  ].join("\n");
};

const sendEmail = async (
  data: IFormInput,
  amount: number,
  space: Space,
  group: { id: number | null; title: string },
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
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Facture Sovedah-CI",
        to: [data.email, "INFOS@sovedahci.com"],
        emailData: {
          coworkingName: space.title,
          category: group.title,
          location: space.adresse,
          clientName: data.name,
          clientEmail: data.email,
          clientPhone: data.phone,
          reservationPrice: amount,
          date: formatDate(date, isMonthlyTarif),
          priceType: `${data.quantity} ${data.category}`,
          coworkingImage: selectedProduct.image,
          description: formatDescriptionForEmail(selectedProduct.description),
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    router.push(
      `/recap?type=payment&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(
        data.email
      )}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${
        space.id
      }&date=${formatDate(date, isMonthlyTarif)}&amount=${amount}&quantity=${encodeURIComponent(
        data.quantity
      )}&category=${encodeURIComponent(data.category)}&productImage=${encodeURIComponent(
        selectedProduct.image
      )}&productTitle=${encodeURIComponent(selectedProduct.title)}&productDescription=${encodeURIComponent(
        formatDescriptionForEmail(selectedProduct.description)
      )}`
    );
  } catch (error) {
    toast("Erreur", {
      description: "Une erreur est survenue lors de l'envoi de la facture",
    });
  }
};

// Main Component
export default function ListeSpace({
  group = { id: null, title: "Inconnu" },
  space = { id: null, title: "Inconnu" },
}: ListeSpaceProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17));
  const [quantity, setQuantity] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [data, setData] = useState<IFormInput | undefined>();
  const [isMonthlyTarif, setIsMonthlyTarif] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IFormInput>({ mode: "onChange" });

  const { open, paymentStatus } = usePay();
  const selectedSpace = space || {};
  const hasTarifs = selectedSpace.tarifs
    ? Array.isArray(selectedSpace.tarifs) && selectedSpace.tarifs.length > 0
    : false;

  // Read query parameters to set initial category
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const productTitle = query.get("title");
    if (productTitle) {
      setCategory(decodeURIComponent(productTitle));
    }
  }, []);

  // Select product based on category
  const selectedProduct = AVANTAGES.find((item) =>
    item.title.toLowerCase() === category.toLowerCase()
  ) || AVANTAGES[0];

  // Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setData(formData);
    if (hasTarifs) {
      const amount = calculateAmount(formData.quantity, formData.category, date, hasTarifs, space);
      open({
        amount,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
    } else {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "Demande de réservation Sovedah-CI",
            to: [formData.email, "INFOS@sovedahci.com"],
            emailData: {
              coworkingName: space.title,
              category: group.title,
              location: space.adresse,
              clientName: formData.name,
              clientEmail: formData.email,
              clientPhone: formData.phone,
              reservationPrice: 5000,
              date: formatDate(date, isMonthlyTarif),
              priceType: `${formData.quantity} ${formData.category}`,
              coworkingImage: selectedProduct.image,
              description: formatDescriptionForEmail(selectedProduct.description),
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to send email");
        }

        router.push(
          `/recap?type=reservation&name=${encodeURIComponent(
            formData.name
          )}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(
            formData.phone
          )}&groupId=${group.id}&spaceId=${space.id}&date=${formatDate(
            date,
            isMonthlyTarif
          )}&quantity=${encodeURIComponent(formData.quantity)}&category=${encodeURIComponent(
            formData.category
          )}&productImage=${encodeURIComponent(
            selectedProduct.image
          )}&productTitle=${encodeURIComponent(
            selectedProduct.title
          )}&productDescription=${encodeURIComponent(
            formatDescriptionForEmail(selectedProduct.description)
          )}`
        );
      } catch (error) {
        toast("Erreur", {
          description: "Une erreur est survenue lors de l'envoi de la demande",
        });
      }
    }
  };

  // Effects
  useEffect(() => {
    if (quantity && category && date) {
      const amount = calculateAmount(quantity, category, date, hasTarifs, space);
      setTotalAmount(amount);
      setIsMonthlyTarif(category.toLowerCase().includes("mois"));
    } else {
      setTotalAmount(0);
    }
  }, [quantity, category, date, hasTarifs, space,selectedProduct]);

  useEffect(() => {
    setValue("date", date);
  }, [date, setValue]);

  useEffect(() => {
    if (paymentStatus === "success" && data) {
      sendEmail(data, totalAmount, space, group, date, isMonthlyTarif, router, selectedProduct);
    } else if (paymentStatus === "error") {
      toast("Paiement échoué", {
        description: "Une erreur est survenue lors du paiement",
      });
    }
  }, [paymentStatus, data, totalAmount, space, group, date, isMonthlyTarif, router]);

  return (
    <>
      {/* Product Section */}
      <section className="container min-h-[300px] mb-14 relative mt-14">
        <div className="relative gap-8 items-center md:items-stretch py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <Image
            className="w-full z-10 object-cover max-w-[420px] max-h-[420px]"
            src={selectedProduct.image}
            width={100}
            height={100}
            alt={`${selectedProduct.title} image`}
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">
              {selectedProduct.title}
            </h2>
            {selectedProduct.description ? (
              <div className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                <p>{selectedProduct.description.intro}</p>
                <h3 className="mt-4 font-semibold">Pourquoi choisir ce produit ?</h3>
                <ul className="list-disc pl-5">
                  {selectedProduct.description.whyChoose.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  {selectedProduct.description.pricing.map((price, index) => (
                    <p key={index} className="font-bold">{price}</p>
                  ))}
                </div>
                <p className="mt-4">{selectedProduct.description.callToAction}</p>
              </div>
            ) : (
              <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                Aucune description disponible
              </p>
            )}
            {/* <Link
              className={cn(
                buttonVariants({ size: "sm" }),
                "max-w-52 gap-2 overflow-hidden whitespace-pre",
                "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
              )}
              href="/reservation"
            >
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
              <div className="flex items-center">
                <span className="ml-1 text-sm sm:text-md">Réservez</span>
              </div>
            </Link> */}
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
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert">Nom & Prénom sont requis</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { required: true })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === "required" && (
                      <p role="alert">Email est requis</p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone", { required: true })}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone?.type === "required" && (
                      <p role="alert">Téléphone est requis</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="adressepostale">Localisation/Adresse</Label>
                  <Input
                    id="adressepostale"
                    type="text"
                    {...register("adressepostale", { required: true })}
                    aria-invalid={errors.adressepostale ? "true" : "false"}
                  />
                  {errors.adressepostale?.type === "required" && (
                    <p role="alert">Adresse postale est requise</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Détail du paiement</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="quantity">Quantité</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  defaultValue="1" // Valeur par défaut dans l'input
                  {...register("quantity", { required: "La quantité est requise", min: { value: 1, message: "La quantité doit être supérieure à 0" } })}
                  aria-invalid={errors.quantity ? "true" : "false"}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {errors.quantity && <p role="alert" className="text-red-600 text-sm">{errors.quantity.message}</p>}
              </div>
                <div className="grid gap-3 w-full">
                  <Label htmlFor="category">Type d&apos;achat</Label>
                  <select
                    id="category"
                    {...register("category", { required: true })}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-md border p-2"
                    value={category}
                  >
                    <option value="">Sélectionner le type d&apos;achat</option>
                    <option value="Détail">Détails</option>
                    <option value="En gros">En gros</option>
                    
                  </select>
                  {errors.category?.type === "required" && (
                    <p role="alert">La catégorie est requise</p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label>Date de livraison</Label>
                <Calendar
                  id="date"
                  date={date}
                  setDate={setDate}
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
              {hasTarifs && (
                <div className="text-right font-bold">Total: {totalAmount} FCFA</div>
              )}
              <Button type="submit" disabled={!isValid || !date} className="ml-auto gap-1">
                <span>
                  {hasTarifs ? "Confirmer le paiement" : "Demander une réservation"}
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