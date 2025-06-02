
"use client";

import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import React from "react";

export default function ContentBillet() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const lastname=searchParams.get("lastname");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const dateNaissance=searchParams.get("datenaissance");
  const nationality=searchParams.get("nationality");
  const sexe=searchParams.get("sexe");
  const typePiece=searchParams.get("typePiece");
  const numeroPiece=searchParams.get("numeroPiece");
  const date = searchParams.get("date");
  const travelOption= searchParams.get(" travelOption");
  const passengerCount = searchParams.get("passengerCount ");
  const departureCountry = searchParams.get("departureCountry");
  const arrivalCountry = searchParams.get("arrivalCountry");

  // Validation pour productTitle
 

  const formatDate = (date: string | null) => {
    if (!date) return "Non spécifiée";
    return dayjs(date).format("DD MMMM YYYY");
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Récapitulatif de votre demande de réservation
      </h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Nom :</strong> {name || "Non spécifié"}
            </div>
             <div>
              <strong>Prenom :</strong> {lastname || "Non spécifié"}
            </div>
            <div>
              <strong>Email :</strong> {email || "Non spécifié"}
            </div>
            <div>
              <strong>Téléphone :</strong> {phone || "Non spécifié"}
            </div>
            <div>
              <strong>Date de naissance</strong> {dateNaissance || "Non spécifiée"}
            </div>
             <div>
              <strong>Nationnalité</strong> {nationality || "Non spécifiée"}
            </div>
             <div>
              <strong>Sexe</strong> {sexe || "Non spécifiée"}
            </div>
            <div>
              <strong>Type de pièce</strong> {typePiece || "Non spécifiée"}
            </div>
             <div>
              <strong>Numéro de la pièce</strong> {numeroPiece || "Non spécifiée"}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Détails de la réservation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Option de voyage:</strong> {travelOption || "Non spécifié"}
            </div>
             <div>
              <strong>Nombre de passagers:</strong> {passengerCount || "Non spécifiée"}
            </div>
             <div>
              <strong>Pays de depart:</strong> {departureCountry || "Non spécifiée"}
            </div>
             <div>
              <strong>Pays d&apos;arrivée:</strong> {arrivalCountry || "Non spécifiée"}
            </div>
            <div>
              <strong>Date :</strong> {formatDate(date)}
            </div>
          </div>
         
        </CardContent>
      </Card>
      <div className="text-center">
        <p className="text-novis_green font-semibold">
          Votre demande de réservation a été envoyée avec succès. Nous vous contacterons bientôt.
        </p>
      </div>
    </div>
  );
}
