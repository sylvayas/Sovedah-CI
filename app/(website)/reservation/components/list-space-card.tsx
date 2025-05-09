"use client";

import TitleSection from "@/components/title-section";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { usePay } from "@/hooks/usePay";
import { espaces } from "@/config/data";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { countries } from "countries-list";
import dayjs from "dayjs";

interface IFormInput {
  name: string;
  datenaissance: string;
  Numerodepiècedidentite: string;
  typevehicule: string;
  email: string;
  numeropassport: string;
  nationnalité: string;
  phone: string;
  adressepostale: string;
  Numérodepermisdeconduire: string;
  quantity: string;
  category: string;
  lieuprise: string;
  destination: string;
  date: Date | undefined; // Une seule date
}

export default function Description({ group = { id: null, title: "Inconnu" }, space = { id: null, title: "Inconnu" } }: { group?: any; space?: any }) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17)); // 17 avril 2025
  const [quantity, setQuantity] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [data, setData] = useState<any>();
  const [isMonthlyTarif, setIsMonthlyTarif] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const [selectedCountry, setSelectedCountry] = useState("");

  // Transforme l'objet countries en tableau pour le select
  const countryList = Object.entries(countries).map(([code, info]) => ({
    code,
    name: info.name,
  }));

  const selectedSpace = space || {};
  const hasTarifs = Array.isArray(selectedSpace.tarifs) && selectedSpace.tarifs.length > 0;

  const calculateAmount = useCallback((quantity: string, category: string, date: Date | undefined): number => {
    if (!quantity || !category || !date) return 0;

    const qty = parseInt(quantity) || 0;
    if (qty <= 0) return 0;

    let pricePerUnit = 0;
    if (hasTarifs) {
      for (const tarifGroup of selectedSpace.tarifs) {
        const tarifItem = tarifGroup.items.find((item: any) =>
          item.title.toLowerCase().includes(category.toLowerCase())
        );
        if (tarifItem) {
          pricePerUnit = parseInt(tarifItem.price.replace(/\D/g, ""));
          break;
        }
      }
    }

    if (!pricePerUnit) return 0;

    if (category.toLowerCase().includes("mois")) {
      return pricePerUnit * qty;
    } else if (category.toLowerCase().includes("heure")) {
      return pricePerUnit * qty; // Une seule date
    } else if (category.toLowerCase().includes("demie journée")) {
      return pricePerUnit * qty; // Une seule date
    } else if (category.toLowerCase().includes("journée")) {
      return pricePerUnit * qty; // Une seule date
    }
    return pricePerUnit * qty;
  }, [hasTarifs, selectedSpace.tarifs]);

  const { open, paymentStatus } = usePay();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setData(data);
    if (hasTarifs) {
      const amount = calculateAmount(data.quantity, data.category, date);
      open({
        amount,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } else {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Demande de réservation Sovedah-CI",
            to: [data.email, "sylvayas@gmail.com"],
            emailData: {
              coworkingName: space.title,
              category: group.title,
              location: space.adresse,
              clientName: data.name,
              clientEmail: data.email,
              clientPhone: data.phone,
              reservationPrice: 5000,
              date: date ? dayjs(date).format(isMonthlyTarif ? "YYYY-MM" : "YYYY-MM-DD") : "", // Une seule date
              priceType: `${data.quantity} ${data.category}`,
              coworkingImage: space.images[0].src,
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send email");
        }
        router.push(
          `/recap?type=reservation&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${space.id}&date=${date ? dayjs(date).format(isMonthlyTarif ? "YYYY-MM" : "YYYY-MM-DD") : ""}&quantity=${encodeURIComponent(data.quantity)}&category=${encodeURIComponent(data.category)}`
        );
      } catch (error) {
        toast("Erreur", {
          description: "Une erreur est survenue lors de l'envoi de la demande",
        });
      }
    }
  };

  const formatDate = (date: Date | undefined): string => {
    return date ? dayjs(date).format(isMonthlyTarif ? "YYYY-MM" : "YYYY-MM-DD") : "";
  };

  useEffect(() => {
    if (quantity && category && date) {
      const amount = calculateAmount(quantity, category, date);
      setTotalAmount(amount);
      setIsMonthlyTarif(category.toLowerCase().includes("mois"));
    } else {
      setTotalAmount(0);
    }
  }, [quantity, category, date, calculateAmount]);

  useEffect(() => {
    if (paymentStatus === "success") {
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Facture Sovedah-CI",
          to: [data.email, "sylvayas@gmail.com"],
          emailData: {
            coworkingName: space.title,
            category: group.title,
            location: space.adresse,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            reservationPrice: totalAmount,
            date: formatDate(date), // Une seule date
            priceType: `${data.quantity} ${data.category}`,
            coworkingImage: space.images[0].src,
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send email");
          }
          router.push(
            `/recap?type=payment&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${space.id}&date=${formatDate(date)}&amount=${totalAmount}&quantity=${encodeURIComponent(data.quantity)}&category=${encodeURIComponent(data.category)}`
          );
        })
        .catch(() => {
          toast("Erreur", {
            description: "Une erreur est survenue lors de l'envoi de la facture",
          });
        });
    } else if (paymentStatus === "error") {
      toast("Paiement échoué", {
        description: "Une erreur est survenue lors du paiement",
      });
    }
  }, [paymentStatus, data, date, totalAmount, group.id, space.id,router]);

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
                <Label htmlFor="adressepostale">Adresse postale</Label>
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
        <Card>
          <CardHeader>
            <CardTitle>Détail du paiement</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <>
              <div className="grid gap-3">
                <Label htmlFor="quantity">Quantité</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Entrez la quantité"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Entrez la catégorie"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </>
            <div className="grid gap-3">
              <Label>Sélectionner une date</Label>
              <Calendar
                id="date"
                date={date}
                setDate={setDate}
                showOutsideDays={true}
                fromDate={new Date()} // Désactive les dates passées
                className="rounded-md border"
                disabled={(date) => (isMonthlyTarif ? date.getDate() !== 1 : false)}
              />
              {date ? (
                <p className="text-sm text-gray-600">
                  Date sélectionnée : {formatDate(date)}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Aucune date sélectionnée</p>
              )}
            </div>
            {hasTarifs && (
              <div className="text-right font-bold">
                Total: {totalAmount} FCFA
              </div>
            )}
            <Button
              type="submit"
              disabled={!isValid || !date}
              className="ml-auto gap-1"
            >
              <span>
                {hasTarifs ? "Confirmer le paiement" : "Demander une réservation"}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}