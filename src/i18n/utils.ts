import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, lang] = url.pathname.split('/');

    if (lang in ui) { return lang as keyof typeof ui; }
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function translate(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}
