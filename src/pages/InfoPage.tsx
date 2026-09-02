interface InfoPageProps {
  title: string;
  eyebrow?: string;
}

export function InfoPage({ title, eyebrow }: InfoPageProps) {
  return (
    <section className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
      {eyebrow && <p className="text-cyan-400 font-ui font-medium text-sm uppercase tracking-wide mb-3">{eyebrow}</p>}
      <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">{title}</h1>
      <div className="space-y-4 text-white/60 font-body leading-relaxed">
        <p>DigiCon is a relationship-first professional networking platform. We help founders, consultants, freelancers, sales professionals, and growth-oriented people create their professional identity, share it instantly, capture the people they meet, and turn everyday networking into relationships they can actually manage.</p>
        <p>Our mission is simple: never lose a valuable connection again. The card is the entry point. The relationship is the product.</p>
        <p className="text-white/40 text-sm">For questions about this page or our practices, reach out through the Support page.</p>
      </div>
    </section>
  );
}
