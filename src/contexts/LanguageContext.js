"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
  lang: "fr",
  setLanguage: (_lang) => {},
});

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function applyDirAndLang(lang) {
  if (typeof document === "undefined") return;
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", dir);
}

export function LanguageProvider({ children }) {
  // Initialize from server-rendered <html lang>, avoids hydration mismatch
  const initial = typeof document !== "undefined"
    ? document.documentElement.getAttribute("lang") || "fr"
    : "fr";
  const [lang, setLang] = useState(initial);

  useEffect(() => {
    // Sync from cookie if present (e.g., after first navigation)
    const fromCookie = getCookie("najm_lang");
    if (fromCookie && fromCookie !== lang) {
      setLang(fromCookie);
      applyDirAndLang(fromCookie);
    } else {
      applyDirAndLang(lang);
    }
  }, []);

  const setLanguage = (next) => {
    if (!next || next === lang) return;
    setLang(next);
    setCookie("najm_lang", next, 365);
    applyDirAndLang(next);
    // Reload to allow any server components and API calls to pick up the new locale
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const value = useMemo(() => ({ lang, setLanguage }), [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
