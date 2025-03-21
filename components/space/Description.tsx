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
  datenaissance:string;
  sexe:string;
  email: string;
  numeropassport:string;
  nationnalité:string;
  phone: string;
  quantity: string;
  category: string;
  destination:string;
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

  const calculateAmount = useCallback((quantity: string, category: string, dates: Date[]): number => {
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
  }, [hasTarifs,selectedSpace.tarifs]);

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
  }, [quantity, category, dates,calculateAmount]);

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
                <Label htmlFor="datenaissance">Date Naissance</Label>
                <Input
                  id="datenaissance"
                  type="text"
                  {...register("datenaissance", { required: true })}
                  aria-invalid={errors.datenaissance ? "true" : "false"}
                />
                {errors.datenaissance?.type === "required" && (
                  <p role="alert">Date de Naissance est requise</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="sexe">Sexe</Label>
                    <Input
                    id="sexe"
                    type="sexe"
                    {...register("sexe", { required: true })}
                    aria-invalid={errors.sexe ? "true" : "false"}
                    />
                    {errors.sexe?.type === "required" && (
                    <p role="alert">sexe est requis</p>
                    )}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="Nationnalité">Nationnalité</Label>
                    <Input
                    id="Nationnalité"
                    type="Nationnalité"
                    {...register("nationnalité", { required: true })}
                    aria-invalid={errors.nationnalité? "true" : "false"}
                    />
                    {errors.nationnalité?.type === "required" && (
                    <p role="alert">Nationnalité est requis</p>
                    )}
                </div>
             </div>
             <div className="grid gap-3">
                <Label htmlFor="numeropassport">Numero de passport</Label>
                <Input
                  id="numeropassport"
                  type="text"
                  {...register("numeropassport", { required: true })}
                  aria-invalid={errors.numeropassport? "true" : "false"}
                />
                {errors.numeropassport?.type === "required" && (
                  <p role="alert">Date de Naissance est requise</p>
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
            {/* {hasTarifs && (
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
                    placeholder="Ex: Mois, Heure"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </>
            )} */}


            <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="email">Option de voyage</Label>
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
                    <Label htmlFor="phone">Nombre de passagers</Label>
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
                <Label htmlFor="destination">Destination</Label>
                <select
                    id="destination"
                    {...register("destination", { required: true })} // Intégration avec react-hook-form
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="border rounded p-2" // Style basique, adapte selon ton design
                    aria-invalid={errors.destination ? "true" : "false"}
                >
                    <option value="">Sélectionnez un pays</option>
                    {countryList.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                    ))}
                </select>
                {errors.destination?.type === "required" && (
                    <p role="alert">La destination est requise</p>
                )}
                  </div>
                  <div className="grid gap-3">
                  <Label>Sélectionner une plage de dates</Label>
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
              disabled={!isValid || dates.length === 0}
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