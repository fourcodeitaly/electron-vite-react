import { useLanguage as useLanguageContext } from "../lib/language-provider";

export function useLanguage() {
  return useLanguageContext();
}
