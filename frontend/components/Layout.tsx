import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body className="bg-gray-50">

  <Navbar />

  {children}

  <Footer />

</body>

    </html>

  );

}