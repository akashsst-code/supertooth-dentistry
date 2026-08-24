import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Placeholder } from "@/components/Placeholder";
import { contact, emergencyService, practice, serviceCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | Super Tooth Dentistry",
  description:
    "General, cosmetic, restorative, and orthodontic dental care in Queen Anne, Seattle — same-day crowns, Invisalign, implants, whitening, and more.",
};

/**
 * The "Services" nav link (Nav.tsx / content.ts `nav`) has pointed at
 * /services since the nav was built, but no page ever existed here
 * (404). This is that page — the full service catalog, separate from
 * the homepage's locked 4-item `ServicesSection` teaser, which stays
 * exactly as it is (no links, no changes here). Data lives in
 * `serviceCategories` in content.ts; see that file for sourcing notes.
 *
 * `pt-16` matches Nav's fixed h-16 header height (same convention every
 * other section on the homepage relies on via ViewportHero) since Nav
 * is `fixed`, not part of normal document flow.
 */
export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <section className="bg-sand/40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta mb-3">Services</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-espresso leading-tight">
              Comprehensive dental care for your whole family
            </h1>
            <p className="mt-4 text-espresso/70">
              General, cosmetic, restorative, and orthodontic care under one roof at {practice.name}, close to
              home in {practice.neighborhood}.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 flex flex-col gap-16">
          {serviceCategories.map((group) => (
            <div key={group.category}>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso mb-6">
                {group.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl overflow-hidden border border-sand bg-warm-ivory"
                  >
                    {"image" in item && item.image ? (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes="(min-width: 640px) 32rem, 100vw"
                        className="w-full h-auto"
                      />
                    ) : null}
                    <div className="p-5 sm:p-6">
                      <h3 className="font-display text-lg font-semibold text-espresso mb-1">{item.title}</h3>
                      <p className="text-sm text-espresso/70">
                        {item.real ? item.detail : <Placeholder>{item.detail}</Placeholder>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Emergency dentistry — deliberately not styled/linked like the
              categories above; see content.ts `emergencyService` for why
              it calls the office directly instead of routing to /contact. */}
          <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso mb-2">
              {emergencyService.title}
            </h2>
            <p className="text-espresso/70 mb-1">{emergencyService.detail}</p>
            <p className="text-sm text-espresso/60 mb-5">{emergencyService.note}</p>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
            >
              Call {contact.phone}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
