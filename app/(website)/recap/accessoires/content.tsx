
"use client";

import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import React from "react";

export default function ContentAccessoire() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const adressepostale = searchParams.get("adressepostale");
  const date = searchParams.get("date");
  const quantity = searchParams.get("quantity");
  const productTitle = searchParams.get("productTitle");
  const productDescription = searchParams.get("productDescription");

  // Validation pour productTitle
  React.useEffect(() => {
    if (!productTitle) {
      toast("Avertissement", {
        description: "Aucun produit spécifié dans la réservation",
      });
    }
  }, [productTitle]);

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
              <strong>Email :</strong> {email || "Non spécifié"}
            </div>
            <div>
              <strong>Téléphone :</strong> {phone || "Non spécifié"}
            </div>
            <div>
              <strong>Adresse :</strong> {adressepostale || "Non spécifiée"}
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
              <strong>Produit commandé :</strong> {productTitle || "Non spécifié"}
            </div>
            <div>
              <strong>Quantité :</strong> {quantity || "Non spécifiée"}
            </div>
            <div>
              <strong>Date :</strong> {formatDate(date)}
            </div>
          </div>
          {productDescription && (
            <div className="mt-4">
              <strong>Description du produit :</strong>
              <p className="text-gray-600 whitespace-pre-line">
                {decodeURIComponent(productDescription)}
              </p>
            </div>
          )}
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
