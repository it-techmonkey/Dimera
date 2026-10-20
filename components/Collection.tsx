"use client";

import { useState } from "react";
import Image from "next/image";
import { priceMenu } from "@/lib/data";
import Price from "./Price";

const categoryImages: Record<string, string> = {
  pedicure: "/images/pedicure.jpg",
  nails: "/images/manicure.jpg",
  "lashes-brows": "/images/lash-suite.jpg",
  threading: "/images/hero-mobile-salon.jpg",
  hair: "/images/hair-color.jpg",
};

export default function Collection({ onBook }: { onBook: (id: string) => void }) {
  const [active, setActive] = useState(priceMenu[0].id);
  const group = priceMenu.find((item) => item.id === active) ?? priceMenu[0];

  return (
    <section id="collection" className="treatment-section section-wrap" aria-labelledby="collection-title">
      <div className="section-rule"><span>The Collection</span><span>24 treatments · 5 categories</span></div>
      <div className="treatment-heading">
        <div><p className="eyebrow">The full menu</p><h2 id="collection-title" tabIndex={-1}>Find your ritual.</h2></div>
        <p>Explore the treatments and choose the one that fits your moment.</p>
      </div>
      <div className="treatment-layout">
        <div className="treatment-image collection-desktop-image" aria-hidden="true">
          <Image key={group.id} src={categoryImages[group.id]} alt="" fill sizes="(min-width: 768px) 42vw, 100vw" className="directory-photo is-current" />
          <span className="image-frame" />
        </div>
        <div className="treatment-menu">
          {priceMenu.map((category, index) => {
            const expanded = active === category.id;
            return (
              <div className="portal-group collection-group" key={category.id}>
                <h3>
                  <button
                    type="button"
                    className="collection-category"
                    aria-expanded={expanded}
                    aria-controls={`collection-panel-${category.id}`}
                    onClick={() => setActive(category.id)}
                  >
                    <span className="collection-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="collection-name">{category.title}</span>
                    <span className="collection-count">{category.items.length} treatments</span>
                    <span className="collection-symbol" aria-hidden="true">{expanded ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={`collection-panel-${category.id}`} className="collection-panel" hidden={!expanded}>
                  <div className="collection-mobile-image" aria-hidden="true">
                    <Image src={categoryImages[category.id]} alt="" fill sizes="(max-width: 767px) 90vw, 1px" />
                  </div>
                  <ul>
                    {category.items.map((item) => (
                      <li key={item.id}>
                        <button type="button" className="portal-service collection-service" onClick={() => onBook(item.id)}>
                          <span className="service-name">{item.name}</span>
                          <span className="service-rule" aria-hidden="true" />
                          <span className="service-meta"><Price price={item.price} comparePrice={item.comparePrice} /></span>
                          <span className="collection-arrow" aria-hidden="true">↗</span>
                          <span className="sr-only">— request this treatment</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <p className="collection-note">All prices in AED. Ranged services are confirmed with your artisan before treatment begins.</p>
        </div>
      </div>
    </section>
  );
}
