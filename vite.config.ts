import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            themeName: "DSFR",
            accountThemeImplementation: "Multi-Page",
            // Un seul jar, nommé de façon déterministe, ciblant Keycloak 26.2+ (keycloak-csm = 26.6.3).
            // L'URL de release est ainsi stable pour le `curl` du Dockerfile keycloak-csm.
            // NB: en mode "Multi-Page" les clés valides sont 21-and-below / 23 / 24 / 25 /
            // 26.0-to-26.1 / 26.2-and-above (pas 22-to-25 / all-other-versions, qui sont
            // silencieusement ignorées -> aucun jar produit).
            keycloakVersionTargets: {
                "21-and-below": false,
                "23": false,
                "24": false,
                "25": false,
                "26.0-to-26.1": false,
                "26.2-and-above": "keycloak-theme-dsfr.jar"
            },
            environmentVariables: [
                { name: "DSFR_THEME_HOME_URL", default: "" },
                { name: "DSFR_THEME_SERVICE_TITLE", default: "" },
                { name: "DSFR_THEME_SERVICE_TAG_LINE", default: "" },
                { name: "DSFR_THEME_BRAND_TOP", default: "République<br/>Française" },
                { name: "DSFR_NOTICE_TITLE", default: "" },
                { name: "DSFR_NOTICE_DESCRIPTION", default: "" },
                { name: "DSFR_NOTICE_SEVERITY", default: "info" },
            ]
        })
    ]
});
