"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Image from "next/image";

type GalleryEvent = {
  slug: string;
  title: string;
  count: number;
  images: string[];
};

const galleryEvents: GalleryEvent[] = [
  { slug: "afritalent-training-at-the-african-union", title: "Afri\u2019Talent Training at the African Union", count: 5, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg"] },
  { slug: "hosting-the-nyff-debates-at-the-platform-nigeria", title: "Hosting The NYFF Debates at The Platform Nigeria", count: 12, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg","10.jpeg","11.jpeg","12.jpeg"] },
  { slug: "hosting-the-nigeria-youth-futures-fund-grant-awarding-ceremony-organized-by-macarthur-foundation-and-leap-africa", title: "Hosting the Nigeria Youth Futures Fund Grant Awarding Ceremony", count: 5, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg"] },
  { slug: "hosting-the-roundtable-discussion-on-youth-empowerment-and-christian-education", title: "Hosting the Roundtable Discussion on Youth Empowerment and Christian Education", count: 9, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg"] },
  { slug: "interviewing-and-training-facilitators-under-the-ready-set-work-programme-by-lagos-state-government", title: "Interviewing and Training Facilitators under the Ready Set Work Programme", count: 8, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg"] },
  { slug: "speaking-at-the-futures-nigeria-event-by-funmi-iyanda", title: "Speaking at the Futures Nigeria Event by Funmi Iyanda", count: 6, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg"] },
  { slug: "speaking-at-the-responsible-business-practices-forum-at-lagos-business-school", title: "Speaking at the Responsible Business Practices Forum at Lagos Business School", count: 7, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg"] },
  { slug: "speaking-at-the-west-africa-impact-summit-in-ghana", title: "Speaking at the West Africa Impact Summit in Ghana", count: 3, images: ["1.jpeg","2.jpeg","3.jpeg"] },
  { slug: "training-high-school-students-from-the-us", title: "Training High School Students from the US", count: 10, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg","10.jpeg"] },
  { slug: "training-at-babban-gona", title: "Training at Babban Gona", count: 3, images: ["1.jpeg","2.jpeg","3.jpeg"] },
  { slug: "training-at-channels-tv-funditforward-programme", title: "Training at Channels TV FundItForward Programme", count: 3, images: ["1.jpeg","2.jpeg","3.jpeg"] },
  { slug: "training-at-citiserve", title: "Training at Citiserve", count: 6, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg"] },
  { slug: "training-at-ibm", title: "Training at IBM", count: 7, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg"] },
  { slug: "training-at-jci-eko", title: "Training at JCI Eko", count: 6, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg"] },
  { slug: "training-at-the-ready-set-work-programme-under-lagos-state-government-initiative", title: "Training at The Ready Set Work Programme", count: 7, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg"] },
  { slug: "training-at-unillag", title: "Training at Unillag", count: 4, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg"] },
  { slug: "training-at-united-nations-global-compact-ungc-business-program", title: "Training at United Nations Global Compact (UNGC)", count: 4, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg"] },
  { slug: "training-at-wimbiz", title: "Training at WIMBIZ", count: 2, images: ["1.jpeg","2.jpeg"] },
  { slug: "training-at-the-america-nigeria-chanber-of-commerce-exhibition-and-conference", title: "Training at the America-Nigeria Chamber of Commerce", count: 8, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg"] },
  { slug: "training-at-the-lagos-ministry", title: "Training at the Lagos Ministry", count: 9, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg"] },
  { slug: "training-on-childrens-day-by-total-energies-and-rainbow-book-club", title: "Training on Children\u2019s Day by Total Energies and Rainbow Book Club", count: 6, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg"] },
  { slug: "training-with-mastercard-foundation", title: "Training with Mastercard Foundation", count: 6, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg"] },
  { slug: "training-with-penel-consulting-under-a-lagos-state-ministry-of-wealth-creation-initiative", title: "Training with Penel Consulting", count: 4, images: ["1.jpeg","2.jpeg","3.jpeg","4.jpeg"] },
  { slug: "ilead-teachers-training-at-leap-africa", title: "iLEAD Teachers Training at LEAP Africa", count: 3, images: ["1.jpeg","2.jpeg","3.jpeg"] },
];

const categories = ["All", "Training", "Speaking", "Hosting"] as const;

function getCategory(title: string): string {
  if (title.toLowerCase().startsWith("hosting")) return "Hosting";
  if (title.toLowerCase().startsWith("speaking")) return "Speaking";
  return "Training";
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ event: GalleryEvent; index: number } | null>(null);

  const filtered = activeCategory === "All"
    ? galleryEvents
    : galleryEvents.filter((e) => getCategory(e.title) === activeCategory);

  const openLightbox = (event: GalleryEvent, index: number) => {
    setLightbox({ event, index });
  };

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = useCallback(
    (direction: number) => {
      if (!lightbox) return;
      const total = lightbox.event.images.length;
      const next = (lightbox.index + direction + total) % total;
      setLightbox({ ...lightbox, index: next });
    },
    [lightbox]
  );

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, navigateLightbox]);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Gallery</h1>
            <p className="text-xl lg:text-2xl text-charcoal/70 italic">
              Moments captured across stages, training rooms, and events
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-lg text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold text-charcoal shadow-luxury"
                    : "bg-cream text-charcoal/60 hover:bg-gold/20 hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => (
              <div
                key={event.slug}
                className="group cursor-pointer"
                onClick={() => openLightbox(event, 0)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300">
                  <div className="relative w-full h-72">
                    <Image
                      src={`/images/gallery/${event.slug}/1.jpeg`}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-lg font-serif leading-snug mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Camera size={14} />
                      <span>{event.count} photos</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Event Title */}
          <div className="absolute top-6 left-6 right-20 z-10">
            <h3 className="text-white font-serif text-lg truncate">
              {lightbox.event.title}
            </h3>
            <p className="text-white/50 text-sm mt-1">
              {lightbox.index + 1} / {lightbox.event.images.length}
            </p>
          </div>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[80vh] mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/gallery/${lightbox.event.slug}/${lightbox.event.images[lightbox.index]}`}
              alt={`${lightbox.event.title} - Photo ${lightbox.index + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain rounded-lg w-auto h-auto"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="flex justify-center gap-2 overflow-x-auto py-2 px-4">
              {lightbox.event.images.map((img, i) => (
                <button
                  key={img}
                  onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: i }); }}
                  className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                    i === lightbox.index
                      ? "ring-2 ring-gold opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image
                    src={`/images/gallery/${lightbox.event.slug}/${img}`}
                    alt=""
                    width={64}
                    height={48}
                    className="w-16 h-12 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
