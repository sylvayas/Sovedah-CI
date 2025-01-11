// usePay.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useKKiaPay } from "kkiapay-react";

type PaymentStatus = "idle" | "loading" | "success" | "error";

export function usePay() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } =
    useKKiaPay();

  const open = useCallback(
    (paymentData: any) => {
      if (paymentData) {
        setPaymentStatus("loading");
        const data_params: any = {
          ...paymentData,
          api_key: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_API_KEY!, // Utilisation de la clé publique
          theme: "#ce6109", // Couleur orange en hexadécimal
        };
        openKkiapayWidget(data_params);
      }
    },
    [openKkiapayWidget]
  );

  const successHandler = useCallback((response: any) => {
    console.log(response);
    setPaymentStatus("success");
  }, []);

  const failureHandler = useCallback((error: any) => {
    console.log(error);
    setPaymentStatus("error");
  }, []);

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    addKkiapayListener("failed", failureHandler);

    return () => {
      removeKkiapayListener("success");
      removeKkiapayListener("failed");
    };
  }, [
    addKkiapayListener,
    removeKkiapayListener,
    successHandler,
    failureHandler,
  ]);

  return {
    open,
    paymentStatus,
  };
}