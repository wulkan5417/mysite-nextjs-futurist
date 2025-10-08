import { siteConfig } from "@/lib/site";
export const dynamic = "error";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-4">Aloqa</h1>
      <p className="text-slate-300">
        Email: <a className="underline text-cyan-400" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        {/* Google Form iframe code'ini shu yerga joylang */}
        {/* <iframe src="FORM_URL" className="w-full h-[600px]" /> */}
        <p className="text-slate-400 text-sm">Google Form URL'ingizni qo'shing.</p>
      </div>
    </div>
  );
}