
"use client";

import TitleSection from "@/components/title-section";
import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import * as countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";
import dayjs from "dayjs";
import debounce from "lodash.debounce";

// Register French locale for country names
countries.registerLocale(frLocale);

interface IFormInput {
  name: string;
  lastname: string;
  datenaissance: string;
  numerodocument: string;
  sexe: string;
  email: string;
  CNI: string;
  nationality: string;
  phone: string;
  travelOption: string;
  passengerCount: string;
  departureCountry: string;
  arrivalCountry: string;
  dates: Date[];
}

export default function Description() {
  const [dates, setDates] = useState<Date[]>([]);
  const [quantity, setQuantity] = useState<string>("");
  const [data, setData] = useState<any>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  // Watch the CNI field to adjust numerodocument validation
  const selectedCNI = watch("CNI");

  // Initialize client-side
  useEffect(() => {
    setDate(new Date(2025, 3, 17));
    setDates([new Date(2025, 3, 17)]);
    setIsLoading(false);
  }, []);

  // Get country list in French
  const countryList = useMemo(() => {
    return Object.entries(countries.getNames("fr", { select: "official" })).map(([code, name]) => ({
      code,
      name,
    }));
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setData(data);
    try {
      const response = await fetch("/api/send-email/billetreservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Demande de réservation",
          to: [data.email, "INFOS@sovedahci.com"],
          emailData: {
            clientName: data.name,
            clientLastname: data.lastname,
            clientEmail: data.email,
            clientPhone: data.phone,
            dateNaissance: data.datenaissance,
            nationality: countryList.find((c) => c.code === data.nationality)?.name,
            sexe: data.sexe,
            typePiece: data.CNI,
            numeroPiece: data.numerodocument,
            date: formatDates(dates),
            travelOption: data.travelOption,
            passengerCount: data.passengerCount,
            departureCountry: countryList.find((c) => c.code === data.departureCountry)?.name,
            arrivalCountry: countryList.find((c) => c.code === data.arrivalCountry)?.name,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Clear form inputs and states
      reset();
      setDates([]);
      setDate(undefined);
      setQuantity("");

      setIsModalOpen(true);
    } catch (error) {
      toast("Erreur", {
        description: "Une erreur est survenue lors de l'envoi de la demande",
      });
    }
  };

  const formatDates = (dates: Date[]): string => {
    return dates.map((d) => dayjs(d).format("YYYY-MM-DD")).join(",");
  };

  const debouncedSetQuantity = useMemo(
    () =>
      debounce((value: string) => {
        setQuantity(value);
      }, 300),
    []
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const handleDocumentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (selectedCNI === "CNI" && !value.startsWith("CI")) {
      value = "CI" + value.replace(/^CI/, "");
      setValue("numerodocument", value, { shouldValidate: true });
    }
  };

  useEffect(() => {
    return () => {
      debouncedSetQuantity.cancel();
    };
  }, [debouncedSetQuantity]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate && newDate.getTime() !== date?.getTime()) {
      setDate(newDate);
      setDates([newDate]);
    }
  };

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
              <div className="grid grid-cols-2 gap-2">
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
                      <select id="nationality" {...field} className="border rounded p-2 w-full">
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
              <div className="grid gap-3">
                <Label htmlFor="sexe">Sexe</Label>
                <select id="sexe" {...register("sexe", { required: "Sexe requis" })} className="border rounded p-4">
                  <option value="">-- Choisissez une option --</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
                {errors.sexe && <p role="alert" className="text-red-600 text-sm">{errors.sexe.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="CNI">Type de pièce</Label>
                  <select id="CNI" {...register("CNI", { required: "Document requis" })} className="border rounded p-2">
                    <option value="">-- Choisissez une option --</option>
                    <option value="CNI">CNI</option>
                    <option value="Passport">Passport</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.CNI && <p role="alert" className="text-red-600 text-sm">{errors.CNI.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="numerodocument">Numéro de la pièce</Label>
                  <Input
                    id="numerodocument"
                    type="text"
                    {...register("numerodocument", {
                      required: "Numéro de document requis",
                      validate: (value) => {
                        if (selectedCNI === "CNI") {
                          if (!value.startsWith("CI")) {
                            return "Le numéro doit commencer par 'CI' pour une CNI";
                          }
                          if (!/^CI\d{9}$/.test(value)) {
                            return "Le numéro doit contenir exactement 9 chiffres après 'CI'";
                          }
                        }
                        return true;
                      },
                    })}
                    onChange={handleDocumentNumberChange}
                  />
                  {errors.numerodocument && <p role="alert" className="text-red-600 text-sm">{errors.numerodocument.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Détail de la réservation</CardTitle>
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
                <Label htmlFor="arrivalCountry">Pays d&apos;arrivée</Label>
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
                setDate={handleDateChange}
                showOutsideDays={true}
              />
            </div>
            <Button type="submit" disabled={!isValid || dates.length === 0} className="ml-auto gap-1">
              <span>
                Demande de réservation
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Success Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              Réservation envoyée
            </DialogTitle>
            <DialogDescription>
              Votre demande de réservation a été envoyée avec succès. Nous vous contacterons bientôt !
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="bg-[#1A557A] text-[#F4E0D7] hover:bg-[#1A557A]"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
