import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const MyMails = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-mails")
      .then((res) => {
        setMails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
      <Navbar />
      <div className="flex-1 container mx-auto px-2 sm:px-4 py-8 w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-indigo-600 text-center border-b-4 border-indigo-500 w-fit mx-auto pb-2 shadow-sm">
          My Mails
        </h1>
        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : mails.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No mails found.</div>
        ) : (
          <div className="overflow-x-auto border-indigo-600 border rounded-xl">
            <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-indigo-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-indigo-700">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-indigo-700">Scheduled Time</th>
                </tr>
              </thead>
              <tbody>
                {mails.map((mail, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-indigo-50 transition-colors even:bg-gray-50"
                  >
                    <td className="py-3 px-4 border-b border-gray-200">{mail.name || "-"}</td>
                    <td className="py-3 px-4 border-b border-gray-200 break-all">{mail.email || "-"}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {mail.scheduledTime
                        ? new Date(mail.scheduledTime).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyMails;