import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import PointerFX from "../../components/PointerFX";
import { siteConfig } from "@/lib/site";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-sans",
});

export const metadata = {
  title: `${siteConfig.name} — ${siteConfig.role ?? "Portfolio"}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: ["/og"], // dynamic OG route ishlatilsa
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={font.variable}>
      <body className="font-sans bg-[#0B1020] text-slate-100 antialiased">
        <PointerFX />
        {/* Glowli fon va noise */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[#0B1020]" />
          <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,.25),transparent_60%)] blur-2xl" />
          <div className="absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,.25),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-[-160px] left-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,.22),transparent_60%)] blur-2xl" />
          {/* pointer-follow glow */}
          <div
            className="absolute inset-0 transition-[background] duration-100"
            style={{
              background:
                "radial-gradient(280px 280px at var(--pg-x,50%) var(--pg-y,50%), rgba(59,130,246,0.20), transparent 45%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%22440%22 viewBox=%220 0 40 40%22><g fill=%22%23fff%22 opacity=%220.35%22><circle cx=%222%22 cy=%222%22 r=%220.7%22/><circle cx=%2222%22 cy=%2212%22 r=%220.6%22/><circle cx=%2212%22 cy=%2228%22 r=%220.6%22/></g></svg>')" }} />
        </div>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 md:pl-64 pl-20">
            <Topbar />
            <main className="px-4 md:px-8 pb-10">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}