import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LearnPage = () => {
  return (
    <div className="bg-indigo-50 min-h-screen p-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-indigo-800 mb-4">
          How to Send Emails with Sampark.AI
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Sampark.AI automates the process of sending personalized invitation
          and follow-up emails, enabling seamless communication with VBDA
          participants.
        </p>

        <div className="space-y-8">
          <div className="bg-indigo-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Step 1: Upload Recipient Data
            </h2>
            <p className="text-gray-600">
              Upload a CSV file containing the recipient data (e.g., name,
              email, organization). The app will use this data to personalize
              your email messages.
            </p>
          </div>

          <div className="bg-indigo-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Step 2: Preview Email Templates
            </h2>
            <p className="text-gray-600">
              Preview and edit email templates before sending. You can
              personalize emails based on the recipient’s information like their
              achievements, role, or organization.
            </p>
          </div>

          <div className="bg-indigo-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Step 3: Schedule and Send Emails
            </h2>
            <p className="text-gray-600">
              Schedule emails for a specific time or send them immediately. You
              can set up bulk email sends to save time and reach many recipients
              at once.
            </p>
          </div>

          <div className="bg-indigo-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Step 4: Track Email Interactions
            </h2>
            <p className="text-gray-600">
              Track open rates, responses, and RSVPs through the dashboard. Get
              insights on the engagement and effectiveness of your email
              campaigns.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-xl text-indigo-700">
            Get started now and simplify your email outreach with Sampark.AI!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnPage;
