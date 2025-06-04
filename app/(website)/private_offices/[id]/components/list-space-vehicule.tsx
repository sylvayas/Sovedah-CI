"use client";

import TitleSection from "@/components/title-section";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";

interface IFormInput {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  drivingLicense: string;
  address: string;
  model: string;
  date: Date;
}

export default function ListSpaceVehicule() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 17));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const vehicleData = {
    category: searchParams.get("category") || "",
    model: searchParams.get("model") || "",
    image: searchParams.get("image") || "",
    people: searchParams.get("people") || "",
    bags: searchParams.get("bags") || "",
    description: searchParams.get("description") || "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      model: vehicleData.model,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("/api/send-email/voiturelocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Demande de réservation Sovedah-CI",
          to: [data.email, "infos@sovedahci.com"],
          emailData: {
            clientName: data.name,
            clientLastname: data.lastname,
            clientEmail: data.email,
            clientPhone: data.phone,
            drivingLicense: data.drivingLicense,
            address: data.address,
            vehicleModel: data.model,
            reservationDate: dayjs(date).format("YYYY-MM-DD"),
            vehicleCategory: vehicleData.category,

          },
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi de l'email");
      }

      setIsDialogOpen(true); // Ouvre le modal
      reset(); // Vide les champs du formulaire
      setDate(undefined); // Réinitialise la date
    } catch (error) {
      toast("Erreur", {
        description: "Une erreur est survenue lors de l'envoi de la demande",
      });
    }
  };

  return (
    <section className="container min-h-[300px] py-14 relative">
      <TitleSection title={"Détail de réservation"} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicleData.model && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Véhicule sélectionné</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              {vehicleData.image && (
                <div className="w-full md:w-1/2 h-64 relative">
                  <Image
                    src={vehicleData.image}
                    alt={vehicleData.model}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-green-700">{vehicleData.category}</h2>
                <p className="text-lg text-gray-600 mb-3">{vehicleData.model}</p>
                <p className="text-base text-gray-600 mb-3">{vehicleData.description}</p>
                <div className="flex gap-6">
                  <span className="flex items-center gap-2 text-base text-gray-600">
                    <span className="text-lg">👥</span> {vehicleData.people} Personnes
                  </span>
                  <span className="flex items-center gap-2 text-base text-gray-600">
                    <span className="text-lg">🧳</span> {vehicleData.bags} Bagages
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid w-full items-start gap-6">
            <div className="grid gap-6 rounded-lg border p-4">
              <CardTitle>Informations personnelles</CardTitle>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name", { required: "Nom requis" })}
                  />
                  {errors.name && <p role="alert" className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastname">Prénom</Label>
                  <Input
                    id="lastname"
                    type="text"
                    {...register("lastname", { required: "Prénom requis" })}
                  />
                  {errors.lastname && <p role="alert" className="text-red-600 text-sm">{errors.lastname.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email requis" })}
                  />
                  {errors.email && <p role="alert" className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: "Téléphone requis" })}
                  />
                  {errors.phone && <p role="alert" className="text-red-600 text-sm">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="drivingLicense">Numéro du permis de conduire</Label>
                  <Input
                    id="drivingLicense"
                    type="text"
                    {...register("drivingLicense", { required: "Numéro du permis requis" })}
                  />
                  {errors.drivingLicense && <p role="alert" className="text-red-600 text-sm">{errors.drivingLicense.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    type="text"
                    {...register("address", { required: "Adresse requise" })}
                  />
                  {errors.address && <p role="alert" className="text-red-600 text-sm">{errors.address.message}</p>}
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Détail sur le véhicule</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="grid gap-3">
                      <Label htmlFor="model">Modèle du véhicule</Label>
                      <select
                        id="model"
                        {...register("model", { required: "Modèle de véhicule requis" })}
                        className="border rounded p-2"
                      >
                        <option value="">-Choisissez un modèle de véhicule-</option>
                        <option value="Nissan Versa">Nissan Versa</option>
                        <option value="Mazda Miata MX-5">Mazda Miata MX-5</option>
                        <option value="Mitsubishi Mirage G4">Mitsubishi Mirage G4</option>
                        <option value="Chevrolet Malibu Specs">Chevrolet Malibu Specs</option>
                        <option value="Toyota Corolla Hybrid Buyer's">Toyota Corolla Hybrid Buyer&apos;s</option>
                        <option value="Mini Cooper Convertible Review">Mini Cooper Convertible Review</option>
                      </select>
                      {errors.model && <p role="alert" className="text-red-600 text-sm">{errors.model.message}</p>}
                    </div>
                    <div className="grid gap-3 ml-3">
                      <Label>Sélectionner une date</Label>
                      <Calendar
                        date={date}
                        setDate={(newDate: Date | undefined) => {
                          setDate(newDate);
                          if (newDate) {
                            setValue("date", newDate);
                          }
                        }}
                        showOutsideDays={true}
                      />
                      {errors.date && <p role="alert" className="text-red-600 text-sm">Date requise</p>}
                    </div>
                  </div>
                  <Button type="submit" disabled={!isValid || !date} className="ml-auto gap-1 w-full p-2">
                    Demander une réservation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Réservation réussie</DialogTitle>
          </DialogHeader>
          <p>Votre réservation a été enregistrée avec succès. Nous vous contacterons très bientôt pour confirmer les détails.</p>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#1A557A]">Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}