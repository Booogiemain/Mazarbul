import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar as páginas que serão usadas nas rotas
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import MediaDetailsPage from "./pages/MediaDetailsPage/MediaDetailsPage.jsx";

// Importar os hooks para passar as props
import { useTheme } from "./hooks/useTheme";
import { useI18n } from "./hooks/useI18n";

function App() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useI18n();

  const pageProps = { theme, setTheme, lang, setLang, t };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage {...pageProps} />} />
        <Route
          path="/profile/:handle"
          element={<ProfilePage {...pageProps} />}
        />
        <Route path="/dashboard" element={<DashboardPage {...pageProps} />} />
        <Route
          path="/media/:mediaId"
          element={<MediaDetailsPage {...pageProps} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
