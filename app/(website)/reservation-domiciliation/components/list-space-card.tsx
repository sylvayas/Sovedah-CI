"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Formula } from "@/config/data"; // Adjust import path as needed

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  dates: Date[];
}

export default function ListSpaceCard({ formulas }: { formulas: Formula[] }) {
  return (
    <div className="container flex flex-col items-center mt-12 space-y-8">
      {formulas.map((formula, index) => (
        <FormulaReservationCard key={index} formula={formula} />
      ))}
    </div>
  );
}

const FormulaReservationCard = ({ formula }: { formula: Formula }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `Demande de réservation Formule ${formula.name}`,
          to: [data.email, "info@noviscoworking.com"],
          emailData: {
            formulaName: formula.name,
            formulaImage: formula.image,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            reservationPrice: formula.price,
            period: formula.period,
            date: dayjs(dates[0]).format("YYYY-MM-DD"),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi de la demande");
      }

      toast.success("Votre demande de réservation a été envoyée avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'envoi de la demande");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-screen-lg flex flex-col gap-6 mx-auto p-6 border shadow-lg">
      <Image
        src={formula.image}
        alt={`Image de la formule ${formula.name}`}
        width={500}
        height={500}
        className="mx-auto object-contain w-full h-72 md:h-96"
      />
      <div className="text-center space-y-4">
        <CardHeader>
          <CardTitle className={`text-3xl md:text-5xl font-bold ${formula.color}`}>
            FORMULE {formula.name}
          </CardTitle>
          <CardDescription className="text-xl md:text-2xl text-muted-foreground">
            {formula.tarif}
          </CardDescription>
        </CardHeader>
        <p className="text-base md:text-lg font-medium text-gray-700">
          {formula.paymentDetails}
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          {formula.benefits}
        </p>
      </div>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <a
            href={`mailto:${formula.contact.email}`}
            className="text-sm md:text-base font-medium text-primary hover:underline"
          >
            {formula.contact.email}
          </a>
          <a
            href={`tel:${formula.contact.phone}`}
            className="text-sm md:text-base font-medium text-primary hover:underline"
          >
            {formula.contact.phone}
          </a>
          <p className="text-sm md:text-base text-gray-600">
            {formula.contact.address}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Demander une réservation</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Réservation Formule {formula.name}</DialogTitle>
              <DialogDescription>
                Veuillez remplir les informations pour votre demande de réservation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Nom & Prénoms</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p role="alert" className="text-red-500">
                    Nom & Prénom sont requis
                  </p>
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
                {errors.email && (
                  <p role="alert" className="text-red-500">
                    Email est requis
                  </p>
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
                {errors.phone && (
                  <p role="alert" className="text-red-500">
                    Téléphone est requis
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label>Date de début</Label>
                <Calendar
                  mode="single"
                  selected={dates[0]}
                  onSelect={(day) => setDates(day ? [day] : [])}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
                {formula.period && (
                  <p className="text-sm text-muted-foreground">
                    La période de réservation est de {formula.period} à partir de la date sélectionnée.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={!isValid || dates.length === 0 || isLoading}
                className="w-full"
              >
                {isLoading ? "En cours..." : "Confirmer la demande"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};