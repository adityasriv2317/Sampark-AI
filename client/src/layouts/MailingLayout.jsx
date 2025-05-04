import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CSVParser from "../components/CSVparser";

const Hero = () => {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-44">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Create an instant mailing list
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                // scroll to the CSV parser section
                const csvParserSection = document.getElementById("csv-parser");
                if (csvParserSection) {
                  csvParserSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Start
            </button>
            <a
              href="#features"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MailingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        <CSVParser />
      </main>
      <Footer />
    </div>
  );
};

export default MailingLayout;
