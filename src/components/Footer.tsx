import Link from "next/link";
import { Placeholder } from "./Placeholder";
import { contact, hours, practice } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-sand">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-lg font-semibold text-espresso">{practice.name}</p>
          <p className="mt-2 text-sm text-espresso/70">{contact.address}</p>
          <p className="text-sm text-espresso/70">
            <Placeholder>{contact.parkingNote}</Placeholder>
          </p>
        </div>

        <div>
          <p className="font-medium text-espresso mb-2">Hours</p>
          <ul className="text-sm text-espresso/70 space-y-1">
            {hours.map((h) => (
              <li key={h.days}>
                {h.days} · <Placeholder>{h.time}</Placeholder>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium text-espresso mb-2">Contact</p>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="text-sm text-espresso/70 hover:text-terracotta"
          >
            <Placeholder>{contact.phone}</Placeholder>
          </a>
          <div className="mt-4">
            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-warm-ivory"
            >
              Book a visit
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-xs text-espresso/50">
          © {new Date().getFullYear()} {practice.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
