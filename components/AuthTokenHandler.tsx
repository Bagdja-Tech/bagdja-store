"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setAccessToken } from "@/lib/auth";

/**
 * Captures `token` from query params on ANY page, stores it, then cleans the URL.
 * This enables redirect_url to point directly to any store page (not only /auth/callback).
 */
export function AuthTokenHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    setAccessToken(token);
    // notify header / other listeners
    window.dispatchEvent(new Event("bagdja:auth-changed"));

    // Clean URL (remove token)
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("token");
    // optional: don't keep redirect helper param around
    nextParams.delete("redirect");

    const nextUrl = `${pathname}${nextParams.toString() ? `?${nextParams.toString()}` : ""}`;
    router.replace(nextUrl);
  }, [searchParams, pathname, router]);

  return null;
}

