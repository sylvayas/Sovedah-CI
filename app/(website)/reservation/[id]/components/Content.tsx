"use client";

import TitleSection from "@/components/title-section";
import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { usePay } from "@/hooks/usePay";
import { espaces } from "@/config/data";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useCallback } from 'react';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  tarif: string;
  dates: Date[];
}

export default function Content({ group, space }: { group: any; space: any }) {
  const router = useRouter();
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedTarif, setSelectedTarif] = useState<string>("");
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

  const selectedSpace =
    espaces
      .find((e) => e.id === group.id)
      ?.items?.find((i) => i.id === space.id) || space;
  const hasTarifs = selectedSpace.tarifs && selectedSpace.tarifs.length > 0;

  // Fonction pour calculer le montant total


// Dans votre composant
const calculateAmount = useCallback((tarifString: string, dates: Date[]): number => {
  if (!tarifString) return 0;

  const [tarifGroupName, tarifItemTitle] = tarifString.split("|");
  const tarifGroup = selectedSpace.tarifs.find(
    (t: any) => t.name === tarifGroupName
  );
  const tarifItem = tarifGroup?.items.find(
    (item: any) => item.title === tarifItemTitle
  );

  if (!tarifItem) return 0;

  const price = parseInt(tarifItem.price.replace(/\D/g, ""));
  if (tarifItem.title.toLowerCase().includes("mois")) {
    return price * dates.length;
  } else if (tarifItem.title.toLowerCase().includes("heure")) {
    return price * dates.length;
  } else if (tarifItem.title.toLowerCase().includes("demie journée")) {
    return price * Math.ceil(dates.length / 2);
  } else if (tarifItem.title.toLowerCase().includes("journée")) {
    return price * dates.length;
  }
  return 0;
}, [selectedSpace]); // Dépendance : selectedSpace

  const { open, paymentStatus } = usePay();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setData(data);
    if (hasTarifs) {
      const amount = calculateAmount(selectedTarif, dates);
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
            subject: "Demande de réservation Novis Coworking",
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
              priceType: selectedTarif,
              coworkingImage: space.images[0].src,
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send email");
        }
        router.push(
          `/recap?type=reservation&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${space.id}&dates=${formatDates(dates)}&tarif=${encodeURIComponent(selectedTarif)}`
        );
      } catch (error) {
        toast("Erreur", {
          description: "Une erreur est survenue lors de l'envoi de la demande",
        });
      }
    }
  };

  const formatDates = useCallback((dates: Date[]): string => {
    return isMonthlyTarif
      ? dates.map((d) => dayjs(d).format("YYYY-MM")).join(",")
      : dates.map((d) => dayjs(d).format("YYYY-MM-DD")).join(",");
  }, [isMonthlyTarif]);
  
  useEffect(() => {
    if (selectedTarif && dates.length > 0) {
      const amount = calculateAmount(selectedTarif, dates);
      setTotalAmount(amount);
    } else {
      setTotalAmount(0);
    }
  }, [selectedTarif, dates,calculateAmount,formatDates]);
  useEffect(() => {
    if (paymentStatus === "success") {
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Facture Novis Coworking",
          to: [data.email, "info@noviscoworking.com"],
          emailData: {
            coworkingName: space.title,
            category: group.title,
            location: space.adresse,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            reservationPrice: totalAmount,
            date: formatDates(dates),
            priceType: selectedTarif,
            coworkingImage: space.images[0].src,
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send email");
          }
          router.push(
            `/recap?type=payment&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&groupId=${group.id}&spaceId=${space.id}&dates=${formatDates(dates)}&amount=${totalAmount}&tarif=${encodeURIComponent(selectedTarif)}`
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
  }, [paymentStatus]);

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
              <CardTitle>Détail sur l&apos;espace</CardTitle>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Catégorie</p>
                </div>
                <div className="ml-auto text-sm font-medium">
                  {group?.title}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text font-medium leading-none">Nom</p>
                </div>
                <div className="ml-auto font-medium">{space?.title}</div>
              </div>
            </div>

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
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Détail du paiement</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {hasTarifs && (
              <div className="grid gap-3">
                <Label htmlFor="tarif">Tarifs</Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedTarif(value);
                    setIsMonthlyTarif(value.toLowerCase().includes("mois"));
                    setDates([]); // Réinitialiser les dates lors du changement de tarif
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un tarif" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSpace.tarifs.map(
                      (tarifGroup: any, groupIndex: number) => (
                        <React.Fragment key={groupIndex}>
                          <SelectItem value={`group-${groupIndex}`} disabled>
                            {tarifGroup.name}
                          </SelectItem>
                          {tarifGroup.items.map(
                            (item: any, itemIndex: number) => (
                              <SelectItem
                                key={`${groupIndex}-${itemIndex}`}
                                value={`${tarifGroup.name}|${item.title}`}
                              >
                                {item.title} - {item.price}
                              </SelectItem>
                            )
                          )}
                        </React.Fragment>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="date">
                {isMonthlyTarif ? "Choisissez les mois" : "Choisissez les dates"}
              </Label>
              <Calendar
                id="date"
                mode="multiple"
                selected={dates}
                onSelect={(days) => setDates(days || [new Date()])}
                numberOfMonths={2}
                className="rounded-md border"
                disabled={(date) =>
                  isMonthlyTarif ? date.getDate() !== 1 : false
                }
              />
            </div>
            {hasTarifs && (
              <div className="text-right font-bold">
                Total: {totalAmount} FCFA
              </div>
            )}
            <Button
              type="submit"
              disabled={
                !isValid || dates.length === 0 || (hasTarifs && !selectedTarif)
              }
              className="ml-auto gap-1"
            >
              <span>
                {hasTarifs
                  ? "Confirmer le paiement"
                  : "Demander une réservation"}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}