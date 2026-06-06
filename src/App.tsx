import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
