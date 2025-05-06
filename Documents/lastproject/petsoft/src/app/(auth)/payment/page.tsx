// src/app/(auth)/payment/page.tsx
"use client";

import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ExtendedSession {
  user?: {
    id: string;
    email?: string;
    hasAccess?: boolean;
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const {
    data: session,
    update,
    status,
  } = useSession() as {
    data: ExtendedSession | null;
    update: (data: any) => Promise<ExtendedSession | null>;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();

  const handleCheckout = () => {
    startTransition(async () => {
      setError(null);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
        });
        const result = await response.json();

        if (result.url) {
          window.location.href = result.url;
        } else {
          setError("Failed to initiate checkout.");
        }
      } catch (err) {
        setError("Something went wrong during checkout.");
      }
    });
  };

  const handleAccess = async () => {
    await update({ hasAccess: true });
    router.push("/app/dashboard");
  };

  return (
    <main className="flex flex-col justify-center items-center space-y-10 min-h-screen p-4">
      <H1>PetSoft access requires payment</H1>
      {searchParams.success && (
        <>
          <Button
            onClick={handleAccess}
            disabled={status === "loading" || session?.user?.hasAccess}
            className="px-6 py-3 text-lg"
          >
            Access PetSoft
          </Button>
          <p className="text-sm text-green-700" role="alert">
            Payment successful! You now have lifetime access to PetSoft.
          </p>
        </>
      )}
      {searchParams.cancelled && (
        <p className="text-sm text-red-700" role="alert">
          Payment cancelled. You can try again.
        </p>
      )}
      {!searchParams.success && !searchParams.cancelled && (
        <Button
          onClick={handleCheckout}
          disabled={isPending || status === "loading"}
          className="px-6 py-3 text-lg"
        >
          {isPending ? "Processing..." : "Buy lifetime access for $299"}
        </Button>
      )}
      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </main>
  );
}
