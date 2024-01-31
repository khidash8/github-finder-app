import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/about";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./components/context/GithubContext";
import { AlertProvider } from "./components/context/Alert/AlertContext";
import Alert from "./components/layout/Alert";
import SingleUser from "./pages/SingleUser";

const App = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <BrowserRouter>
          <div className="flex h-screen flex-col justify-between">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<SingleUser />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AlertProvider>
    </GithubProvider>
  );
};

export default App;
