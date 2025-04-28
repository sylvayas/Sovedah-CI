"use client";

import TitleSection from "@/components/title-section";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { usePay } from "@/hooks/usePay";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { countries } from "countries-list";
import dayjs from "dayjs";

interface IFormInput {
  name: string;
  lastname: string;
  datenaissance: string;
  sexe: string;
  email: string;
  CNI: string;
  nationality: string;
  phone: string;
  travelOption: string;
  passengerCount: string;
  departureCountry: string;
  arrivalCountry: string;
  quantity: string;
  category: string;
  dates: Date[];
}

export default function Description({ group = { id: null, title: "Inconnu" }, space = { id: null, title: "Inconnu" } }: { group?: any; space?: any }) {
  const router = useRouter();
  const [dates, setDates] = useState<Date[]>([]);
  const [quantity, setQuantity] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [data, setData] = useState<any>();
  const [isMonthlyTarif, setIsMonthlyTarif] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17)); // 17 avril 2025

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  // Transforme l'objet countries en tableau pour le select
  const countryList = useMemo(() => {
    return Object.entries(countries).map(([code, info]) => ({
      code,
      name: info.name,
    }));
  }, []);

  const selectedSpace = space || {};
  const hasTarifs = Array.isArray(selectedSpace.tarifs) && selectedSpace.tarifs.length > 0;

  const calculateAmount = useCallback(
    (quantity: string, category: string, dates: Date[]): number => {
      if (!quantity || !category || !dates.length) return 0;

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
        return pricePerUnit * qty * dates.length;
      } else if (category.toLowerCase().includes("demie journée")) {
        return pricePerUnit * Math.ceil(dates.length / 2) * qty;
      } else if (category.toLowerCase().includes("journée")) {
        return pricePerUnit * dates.length * qty;
      }
      return pricePerUnit * qty;
    },
    [hasTarifs, selectedSpace.tarifs]
  );

  const { open, paymentStatus } = usePay();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setData(data);
    if (hasTarifs) {
      const amount = calculateAmount(data.quantity, data.category, dates);
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
            to: [data.email, "medesse.allao@sovedahci.com"],
            emailData: {
              coworkingName: space.title,
              category: group.title,
              location: space.adresse,
              clientName: data.name,
              clientEmail: data.email,
              clientPhone: data.phone,
              reservationPrice: 5000,
              date: formatDates(dates),
              priceType: `${data.quantity} ${data.category}`,
              coworkingImage: space.images[0].src,
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send email");
        }
        router.push(
          `/recap?type=reservation&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${space.id}&dates=${formatDates(dates)}&quantity=${encodeURIComponent(data.quantity)}&category=${encodeURIComponent(data.category)}`
        );
      } catch (error) {
        toast("Erreur", {
          description: "Une erreur est survenue lors de l'envoi de la demande",
        });
      }
    }
  };

  const formatDates = (dates: Date[]): string => {
    return isMonthlyTarif
      ? dates.map((d) => dayjs(d).format("YYYY-MM")).join(",")
      : dates.map((d) => dayjs(d).format("YYYY-MM-DD")).join(",");
  };

  useEffect(() => {
    if (quantity && category && dates.length > 0) {
      const amount = calculateAmount(quantity, category, dates);
      setTotalAmount(amount);
      setIsMonthlyTarif(category.toLowerCase().includes("mois"));
    } else {
      setTotalAmount(0);
    }
  }, [quantity, category, dates, calculateAmount]);

  useEffect(() => {
    if (paymentStatus === "success") {
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Facture Sovedah-CI",
          to: [data.email, "medesse.allao@sovedahci.com"],
          emailData: {
            coworkingName: space.title,
            category: group.title,
            location: space.adresse,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            reservationPrice: totalAmount,
            date: formatDates(dates),
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
            `/recap?type=payment&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${space.id}&dates=${formatDates(dates)}&amount=${totalAmount}&quantity=${encodeURIComponent(data.quantity)}&category=${encodeURIComponent(data.category)}`
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
  }, [paymentStatus, data, totalAmount, dates, router]);

  return (
    <section className="container min-h-[300px] py-14 relative">
      <TitleSection title={"Détail de réservation"} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4">
        <div className="relative flex-col items-start gap-8 flex">
          <div className="grid w-full items-start gap-6">
            <div className="grid gap-6 rounded-lg border p-4">
              <CardTitle>Informations personnelles</CardTitle>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" type="text" {...register("name", { required: "Nom requis" })} />
                  {errors.name && <p role="alert" className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastname">Prénom</Label>
                  <Input id="lastname" type="text" {...register("lastname", { required: "Prénom requis" })} />
                  {errors.lastname && <p role="alert" className="text-red-600 text-sm">{errors.lastname.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email", { required: "Email requis" })} />
                  {errors.email && <p role="alert" className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" {...register("phone", { required: "Téléphone requis" })} />
                  {errors.phone && <p role="alert" className="text-red-600 text-sm">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="datenaissance">Date de naissance</Label>
                  <Input
                    id="datenaissance"
                    type="date"
                    {...register("datenaissance", { required: "Date de naissance requise" })}
                  />
                  {errors.datenaissance && <p role="alert" className="text-red-600 text-sm">{errors.datenaissance.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="nationality">Nationalité</Label>
                  <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: "Nationalité requise" }}
                    render={({ field }) => (
                      <select id="nationality" {...field} className="border rounded p-2">
                        <option value="">Sélectionnez un pays</option>
                        {countryList.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.nationality && <p role="alert" className="text-red-600 text-sm">{errors.nationality.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="sexe">Sexe</Label>
                  <select id="sexe" {...register("sexe", { required: "Sexe requis" })} className="border rounded p-4">
                    <option value="">-- Choisissez une option --</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                  {errors.sexe && <p role="alert" className="text-red-600 text-sm">{errors.sexe.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="CNI">Type de document</Label>
                  <select id="CNI" {...register("CNI", { required: "Document requis" })} className="border rounded p-4">
                    <option value="">-- Choisissez une option --</option>
                    <option value="CNI">CNI</option>
                    <option value="Passport">Passport</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.CNI && <p role="alert" className="text-red-600 text-sm">{errors.CNI.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Détail du paiement</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="travelOption">Option de voyage</Label>
                <select
                  id="travelOption"
                  {...register("travelOption", { required: "Option de voyage requise" })}
                  className="border rounded p-4"
                >
                  <option value="">-- Choisissez une option --</option>
                  <option value="Eco">Eco</option>
                  <option value="Première">Première</option>
                  <option value="Affaire">Affaire</option>
                </select>
                {errors.travelOption && <p role="alert" className="text-red-600 text-sm">{errors.travelOption.message}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="passengerCount">Nombre de passagers</Label>
                <select
                  id="passengerCount"
                  {...register("passengerCount", { required: "Nombre de passagers requis" })}
                  className="border rounded p-4"
                >
                  <option value="">-- Choisissez une option --</option>
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                {errors.passengerCount && (
                  <p role="alert" className="text-red-600 text-sm">{errors.passengerCount.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="departureCountry">Pays de départ</Label>
                <Controller
                  name="departureCountry"
                  control={control}
                  rules={{ required: "Pays de départ requis" }}
                  render={({ field }) => (
                    <select id="departureCountry" {...field} className="border rounded p-2">
                      <option value="">Sélectionnez un pays</option>
                      {countryList.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.departureCountry && (
                  <p role="alert" className="text-red-600 text-sm">{errors.departureCountry.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="arrivalCountry">Pays d'arrivée</Label>
                <Controller
                  name="arrivalCountry"
                  control={control}
                  rules={{ required: "Pays d'arrivée requis" }}
                  render={({ field }) => (
                    <select id="arrivalCountry" {...field} className="border rounded p-2">
                      <option value="">Sélectionnez un pays</option>
                      {countryList.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.arrivalCountry && (
                  <p role="alert" className="text-red-600 text-sm">{errors.arrivalCountry.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Sélectionner une date</Label>
              <Calendar
                date={date}
                setDate={(newDate: Date | undefined) => {
                  if (newDate) {
                    setDate(newDate);
                    setDates([newDate]);
                  }
                }}
                showOutsideDays={true}
              />
            </div>
            {hasTarifs && <div className="text-right font-bold">Total: {totalAmount} FCFA</div>}
            <Button type="submit" disabled={!isValid || dates.length === 0} className="ml-auto gap-1">
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