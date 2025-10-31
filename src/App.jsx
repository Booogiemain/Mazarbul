import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar as páginas
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import MediaDetailsPage from "./pages/MediaDetailsPage/MediaDetailsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage.jsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx"; // NOVA IMPORTAÇÃO

// Importar os hooks
import { useTheme } from "./hooks/useTheme";
import { useI18n } from "./hooks/useI18n";

function App() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useI18n();

  // Props globais para passar para todas as páginas
  const pageProps = { theme, setTheme, lang, setLang, t };

  // Efeito para aplicar o TEMA (Dark/Light)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]); // Roda toda vez que 'theme' mudar

  // Efeito para aplicar o IDIOMA
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("lang", lang.toLowerCase());
  }, [lang]); // Roda toda vez que 'lang' mudar

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas principais */}
        <Route path="/" element={<HomePage {...pageProps} />} />
        <Route
          path="/profile/:handle"
          element={<ProfilePage {...pageProps} />}
        />
        {/* NOVA ROTA */}
        <Route
          path="/profile/:handle/favorites"
          element={<FavoritesPage {...pageProps} />}
        />
        <Route path="/dashboard" element={<DashboardPage {...pageProps} />} />
        <Route
          path="/media/:mediaId"
          element={<MediaDetailsPage {...pageProps} />}
        />

        {/* ROTAS DE AUTENTICAÇÃO */}
        <Route path="/login" element={<LoginPage {...pageProps} />} />
        <Route path="/register" element={<RegisterPage {...pageProps} />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage {...pageProps} />}
        />
        {/* NOVA ROTA DE RESETAR SENHA */}
        <Route
          path="/reset-password"
          element={<ResetPasswordPage {...pageProps} />}
        />

        {/* ROTA DE CONFIGURAÇÕES */}
        <Route path="/settings" element={<SettingsPage {...pageProps} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
