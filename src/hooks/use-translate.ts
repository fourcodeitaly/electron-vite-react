import { useLanguage } from "./use-language";
import { translations } from "../lib/translations";

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string, params?: Record<string, string | number>) => {
    const translation =
      translations[language]?.[
        key as keyof (typeof translations)[typeof language]
      ] ||
      translations.zh[key as keyof typeof translations.zh] ||
      key;

    if (params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, String(value));
      }, translation);
    }

    return translation;
  };

  return { t, language };
}
