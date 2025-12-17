import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import verifyToken from "../../utils/TokenVerify";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // extraemos el usuario aqui ya que navbar no permite la verifyToken (que es un server component y navbar es client component) //
  const user = await verifyToken();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar user={user} />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
