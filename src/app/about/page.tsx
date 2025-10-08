import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { Github, Twitter, Youtube, Linkedin, Mail } from "lucide-react";

export const dynamic = "error";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">About — {siteConfig.name}</h1>
      <p className="text-slate-300">Frontend Developer — futuristik UI va tezkor web ilovalar.</p>
      
      <div className="mt-8 glass p-6 rounded-2xl border border-white/10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">Salom, men {siteConfig.name}</h2>
            <p className="text-slate-300 mt-2">
              Men frontend developerman va zamonaviy veb-ilovalar yaratishga qiziqaman. 
              Toza kod yozish, foydalanuvchi tajribasini yaxshilash va innovatsion dizaynlar 
              yaratish — mening asosiy maqsadlarim.
            </p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <Link 
                href={`mailto:${siteConfig.email}`} 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Mail className="w-4 h-4" />
                Email
              </Link>
              {siteConfig.socials.github && (
                <Link 
                  href={siteConfig.socials.github} 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Ko'nikmalar</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-cyan-400">Frontend</h3>
              <p className="text-slate-300 text-sm">Next.js, React, TypeScript, Tailwind CSS</p>
            </div>
            <div>
              <h3 className="font-medium text-cyan-400">UI/UX</h3>
              <p className="text-slate-300 text-sm">shadcn/ui, Framer Motion, animatsiya</p>
            </div>
            <div>
              <h3 className="font-medium text-cyan-400">Boshqalar</h3>
              <p className="text-slate-300 text-sm">Design systems, accessibility, performance</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Tajriba</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Senior Frontend Developer</h3>
              <p className="text-slate-300 text-sm">Kompaniya nomi • 2022 - hozir</p>
              <p className="text-slate-400 text-sm mt-1">
                Zamonaviy veb-ilovalar yaratish, jamoada mentoring, 
                frontend arxitektura ishlab chiqish.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Frontend Developer</h3>
              <p className="text-slate-300 text-sm">Boshqa kompaniya • 2020 - 2022</p>
              <p className="text-slate-400 text-sm mt-1">
                React va Next.js asosida loyihalar ishlab chiqish, 
                UI komponentlar kutubxonasini yaratish.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 glass p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Aloqa</h2>
        <p className="text-slate-300">
          Menga xabar yuborish uchun quyidagi kontaktlarga murojaat qiling:
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link 
            href={`mailto:${siteConfig.email}`} 
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Mail className="w-5 h-5" />
            {siteConfig.email}
          </Link>
          {siteConfig.socials.github && (
            <Link 
              href={siteConfig.socials.github} 
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </Link>
          )}
          {siteConfig.socials.twitter && (
            <Link 
              href={siteConfig.socials.twitter} 
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}