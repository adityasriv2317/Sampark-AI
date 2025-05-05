import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const MyMails = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .get("http://localhost:3000/api/mymails")
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">My Mails</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : mails.length === 0 ? (
          <div className="text-center text-gray-500">No mails found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Recipient</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Body</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {mails.map((mail, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {mail.recipient?.FirstName || "-"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {mail.recipient?.Email || "-"}
                    </td>
                    <td className="py-2 px-4 border-b">{mail.subject}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="max-w-xs truncate" title={mail.body}>
                        {mail.body}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {mail.date ? new Date(mail.date).toLocaleString() : "-"}
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
