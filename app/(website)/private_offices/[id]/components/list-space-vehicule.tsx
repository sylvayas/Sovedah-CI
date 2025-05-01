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
  modele:string;
  CNI: string;
  nationality: string;
  datereserv:string;
  phone: string;
  localisation:string;
  travelOption: string;
  passengerCount: string;
  numerodimmatri:string;
  departureCountry: string;
  numeropermis:string;
  arrivalCountry: string;
  quantity: string;
  category: string;
  dates: Date[];
}

export default function ListSpaceVehicule({ group = { id: null, title: "Inconnu" }, space = { id: null, title: "Inconnu" } }: { group?: any; space?: any }) {
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
    <section className="container min-h-[300px] py-14 ml-96 relative ">
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
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input id="phone" type="tel" {...register("phone", { required: "Téléphone requis" })} />
                  {errors.phone && <p role="alert" className="text-red-600 text-sm">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="numeropermis">Numéro du permis de conduire</Label>
                  <Input
                    id="numeropermis"
                    type="text"
                    {...register("numeropermis", { required: "Date de naissance requise" })}
                  />
                  
                  {errors.numeropermis && <p role="alert" className="text-red-600 text-sm">{errors.numeropermis.message}</p>}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="sexe">Numéro d&apos;immatriculation</Label>
                  <Input
                    id="numerodimmatri"
                    type="text"
                    {...register("numerodimmatri", { required: "Date de naissance requise" })}
                  />
                  {errors.numerodimmatri && <p role="alert" className="text-red-600 text-sm">{errors.numerodimmatri.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="CNI">Localisation/adresse</Label>
                  <Input
                    id="localisation"
                    type="text"
                    {...register("localisation", { required: "Date de naissance requise" })}
                  />
                  {errors.localisation && <p role="alert" className="text-red-600 text-sm">{errors.localisation.message}</p>}
                </div>
              </div>
             
              <Card>
          <CardHeader>
            <CardTitle>Détail sur le véhicule</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="grid gap-3">
                <Label htmlFor="travelOption">Modèle du véhicule</Label>
                <select
                  id="modele"
                  {...register("modele", { required: "Option de voyage requise" })}
                  className="border rounded p-2"
                >
                  <option value="">-Choisissez une modèle de véhicule-</option>
                  <option value="Nissan Versa">Nissan Verse</option>
                  <option value="Mazda Miata MX-5">Mazda Miata MX-5</option>
                  <option value="Mitsubishi Mirage G4">Mitsubishi Mirage G4</option>
                  <option value="Chevrolet Malibu Specs">Chevrolet Malibu Specs</option>
                  <option value="Toyota Corolla Hybrid Buyer's">Toyota Corolla Hybrid Buyer&apos;s</option>
                  <option value="Mini Cooper ConvertileReview"></option>
                </select>
                {errors.modele && <p role="alert" className="text-red-600 text-sm">{errors.modele.message}</p>}
              </div>

              <div className="grid gap-3 ml-3 ">
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
               </div>
                    {hasTarifs && <div className="text-right font-bold">Total: {totalAmount} FCFA</div>}
                    <Button type="submit" disabled={!isValid || dates.length === 0} className="ml-auto gap-1 w-full p-2">
                    <span>
                        {hasTarifs ? "Confirmer le paiement" : "Demander une réservation"}
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                    </Button>
                </CardContent>
                </Card>
              </div>
              

            </div>
            
          </div>
      
       
      </form>
    </section>
  );
}