import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
