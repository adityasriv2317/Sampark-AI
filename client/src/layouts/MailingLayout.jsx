import React, { useState } from "react"; // Import useState
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CSVParser from "../components/CSVparser";
import EmailEditor from "../components/EmailEditor";

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
  // State to hold the confirmed data from CSVParser
  const [confirmedRecipients, setConfirmedRecipients] = useState([]);


  // Callback function for CSVParser to update the confirmed data
  const handleDataConfirm = (data) => {
    // Add FirstName if only Name exists (optional fallback)
    const processedData = data.map(recipient => ({
        ...recipient,
        FirstName: recipient.FirstName || (recipient.Name ? recipient.Name.split(' ')[0] : '') // Ensure FirstName exists
    }));
    setConfirmedRecipients(processedData);
    // console.log("Recipients confirmed in MailingLayout:", processedData);
    // Optionally, scroll to the editor after confirming data
    const emailEditorSection = document.querySelector(".email-editor");
    if (emailEditorSection) {
        emailEditorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Callback function for EmailEditor to save the email content (example)
  const handleEmailSave = (content) => {
    // console.log("Email content saved:", content);
    // Here you would typically send the content and recipient list to your backend
    // alert("Email content saved! Check the console.");
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8"> {/* Added container styling */}
        <Hero />

        {/* Pass the handler down to CSVParser */}
        <CSVParser onDataConfirm={handleDataConfirm} />

        {/* Pass the confirmed recipients and save handler down to EmailEditor */}
        {/* Conditionally render EmailEditor only when recipients are confirmed? Optional. */}
        {/* {confirmedRecipients.length > 0 && ( */}
          <EmailEditor
            recipients={confirmedRecipients}
            onSave={handleEmailSave}
            initialContent="<p>Hello {{FirstName}},</p><p>We noticed your recent achievement: {{Achievement}} at {{Organization}}.</p><p>Best regards,</p><p>Team Sampark AI</p>" // Use FirstName placeholder
          />
        {/* )} */}
      </main>
      <Footer />
    </div>
  );
};

export default MailingLayout;
