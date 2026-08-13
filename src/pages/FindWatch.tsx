import { useMemo, useState } from "react";
import { site } from "../config/site";
import { ProductCard } from "../components/ui/ProductCard";
import { MagneticButton } from "../components/ui/MagneticButton";

type Answers = {
  occasion?: string;
  size?: string;
  metal?: string;
};

export function FindWatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const matches = useMemo(() => {
    let list = [...site.products];
    const occasion = site.quiz[0].options.find((option) => option.id === answers.occasion);
    if (occasion && "collections" in occasion && occasion.collections) {
      list = list.filter((product) => occasion.collections.includes(product.collection));
    }
    const size = site.quiz[1].options.find((option) => option.id === answers.size);
    if (size && "max" in size && size.max) list = list.filter((product) => product.diameter <= (size.max as number));
    if (size && "min" in size && size.min) list = list.filter((product) => product.diameter >= (size.min as number));
    const metal = site.quiz[2].options.find((option) => option.id === answers.metal);
    if (metal && "metals" in metal && metal.metals) {
      list = list.filter((product) => metal.metals.includes(product.design.caseMetal));
    }
    return list.slice(0, 4);
  }, [answers]);

  const current = site.quiz[step];
  const done = step >= site.quiz.length;

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">Matching</div>
        <h1 className="display">Find your watch.</h1>
        <p className="lede">Three questions. A shortlist a boutique advisor would actually put on the tray.</p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        {!done ? (
          <div className="quiz">
            <div className="eyebrow">
              Question {step + 1} of {site.quiz.length}
            </div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "12px 0 28px" }}>
              {current.question}
            </h2>
            <div className="quiz-options">
              {current.options.map((option) => (
                <button
                  key={option.id}
                  className={`quiz-option ${answers[current.key as keyof Answers] === option.id ? "is-on" : ""}`}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [current.key]: option.id }));
                    setStep((value) => value + 1);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="section-head">
              <h2 className="display">Your shortlist</h2>
              <MagneticButton variant="ghost" onClick={() => { setStep(0); setAnswers({}); }}>
                Start again
              </MagneticButton>
            </div>
            <div className="product-grid">
              {matches.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
            {matches.length === 0 && <p className="empty">No exact match. Browse the Watch Finder instead.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
