"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "Currently we support Cash on Delivery (COD). You pay when your order arrives at your doorstep.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 2–5 business days depending on your location within Bangladesh.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes. If you receive a damaged or incorrect product, contact us within 48 hours of delivery and we will arrange a replacement.",
  },
  {
    question: "Are all products authentic?",
    answer:
      "Absolutely. FastPlay only sources products from verified suppliers and authorised brand distributors.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "Our AI assistant is powered by Gemini. It can help you find the right product, answer questions about your order, and guide you through the store.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "Yes, you need to register and log in to add items to your cart and place an order.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-(--slate)/15 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-(--mist) transition-colors duration-200"
      >
        <span className="text-sm sm:text-base font-medium text-(--navy) pr-4">
          {question}
        </span>
        <FiChevronDown
          size={18}
          className="shrink-0 text-(--copper) transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="px-5 py-4 bg-white border-t border-(--slate)/10">
          <p className="text-sm text-(--slate) leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-bold text-(--navy) mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Frequently Asked Questions
        </h2>
        <p className="text-(--slate) text-sm sm:text-base max-w-md mx-auto">
          Everything you need to know about shopping at FastPlay
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  );
}
