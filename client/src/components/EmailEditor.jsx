import React, { useState, useEffect } from "react";
// Remove ReactQuill imports
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { Save, User, Eye } from "lucide-react";

// Remove the getFirstName helper function
// const getFirstName = (fullName) => { ... };

// Accept recipients prop
const EmailEditor = ({ initialContent, onSave, recipients = [] }) => {
  const [content, setContent] = useState(initialContent || "");
  const [selectedRecipientIndex, setSelectedRecipientIndex] = useState(0);
  const [previewContent, setPreviewContent] = useState("");

  // Update selected index if recipients list changes and current index is out of bounds
  useEffect(() => {
    if (recipients.length > 0 && selectedRecipientIndex >= recipients.length) {
      setSelectedRecipientIndex(0);
    } else if (recipients.length === 0) {
      setSelectedRecipientIndex(0);
      setPreviewContent(""); // Clear preview when recipients are cleared
    }
    // No change needed here, seems correct.
  }, [recipients, selectedRecipientIndex]);

  // Refined useEffect for generating preview content
  useEffect(() => {
    // Ensure content is treated as a string
    const currentContent = String(content || "");
    let processedContent = currentContent; // Start with the current template content

    // console.log(
    //   "Preview useEffect triggered. Content:",
    //   JSON.stringify(currentContent),
    //   "Index:",
    //   selectedRecipientIndex,
    //   "Recipients:",
    //   recipients
    // );

    // Check if there are recipients and the selected index is valid
    if (
      recipients.length > 0 &&
      selectedRecipientIndex >= 0 &&
      selectedRecipientIndex < recipients.length
    ) {
      const selectedRecipient = recipients[selectedRecipientIndex];

      // Double-check if the selected recipient object actually exists
      if (selectedRecipient) {
        // console.log("Selected Recipient:", selectedRecipient);
        try {
          // Replace placeholders using a function for robustness
          // This will find all occurrences of {{key}}
          processedContent = currentContent.replace(
            /\{\{(\w+)\}\}/g,
            (match, key) => {
              // 'match' is the full placeholder e.g., "{{Name}}"
              // 'key' is the captured group e.g., "Name"
              // Access the property on the recipient object
              // Use || '' to provide an empty string if the property doesn't exist or is null/undefined
              return selectedRecipient[key] !== undefined &&
                selectedRecipient[key] !== null
                ? String(selectedRecipient[key]) // Ensure it's a string
                : ""; // Default to empty string if key not found or value is null/undefined
            }
          );

          //   console.log(
          //     "Final processed content:",
          //     JSON.stringify(processedContent)
          //   );
          setPreviewContent(processedContent);
        } catch (error) {
          //   console.error("Error during placeholder replacement:", error);
          setPreviewContent("<p>Error generating preview.</p>"); // Show error in preview
        }
      } else {
        // Fallback if recipient data is unexpectedly invalid
        // console.log(
        //   "Selected recipient data is invalid at index:",
        //   selectedRecipientIndex
        // );
        setPreviewContent(currentContent); // Show original template
      }
    } else {
      // Case: No recipients available, or index is somehow invalid
      //   console.log(
      //     "No valid recipient selected or recipients list empty, showing original template."
      //   );
      setPreviewContent(currentContent); // Show the original template content without replacements
    }
  }, [content, selectedRecipientIndex, recipients]); // Dependencies remain the same

  // Handle change directly from the textarea event
  const handleEditorChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content); // Save the template content
    }
  };

  const handleRecipientChange = (event) => {
    setSelectedRecipientIndex(Number(event.target.value));
  };

  return (
    <div className="email-editor w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl border-b-2 text-indigo-500 border-b-indigo-600 w-fit mx-auto font-semibold text-center mb-6">
        Compose Your Email
      </h2>

      {/* Updated hint text */}
      <div className="w-full text-center">
        <p className="text-xs text-gray-500">
          Use placeholders like FirstName, Email, Organization, Achievement,
          Role in your email.
        </p>
        <p className="mt-1 mb-2 text-xs text-gray-500">
          You can use HTML tags (e.g., `&lt;b&gt;bold&lt;/b&gt;`,
          `&lt;p&gt;paragraph&lt;/p&gt;`) for formatting.
        </p>
      </div>

      <div className="email-editor-container border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-6 bg-white p-1">
        {" "}
        {/* Added padding */}
        <textarea
          value={content}
          onChange={handleEditorChange}
          className="w-full h-96 p-2 border-none focus:ring-0 focus:outline-none resize-none text-sm font-mono" // Basic styling, monospace font helps with HTML
          placeholder="Enter your email content here. Use HTML tags for formatting..."
        />
      </div>

      {/* Recipient Selector - Only show if recipients exist */}
      {recipients.length === 0 && (
        <p className="mb-6 text-center text-gray-500 italic">
          Upload and confirm a recipient list above to enable preview.
        </p>
      )}

      {/* Preview Section - Only show if recipients exist */}
      {recipients.length > 0 && (
        <div className="email-preview mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Eye size={20} /> Live Preview (for{" "}
              {recipients[selectedRecipientIndex]?.FirstName || "Selected User"}
              )
            </h3>

            {recipients.length > 0 && (
              <div className="mb-6 flex gap-2">
                <label
                  htmlFor="recipient-select"
                  className="text-sm w-fit font-medium text-gray-700 flex items-center gap-2"
                >
                  <User size={16} /> Recipient:
                </label>
                <select
                  id="recipient-select"
                  value={selectedRecipientIndex}
                  onChange={handleRecipientChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-1 transition-all ease-in-out focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                  {recipients.map((recipient, index) => (
                    // Use FirstName directly
                    <option key={index} value={index}>
                      {`${recipient.FirstName || "N/A"} (${
                        recipient.Email || "N/A"
                      })`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div
            className="preview-content p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-[200px] shadow-inner prose max-w-none"
            // Ensure previewContent is always a string
            dangerouslySetInnerHTML={{ __html: String(previewContent || "") }}
          />
        </div>
      )}

      {/* Save Button */}
      <div className="email-editor-actions mt-6 text-right">
        <button
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          onClick={handleSave}
          disabled={recipients.length === 0}
        >
          <Save size={18} className="mr-2" />
          Save Email Template
        </button>
      </div>
    </div>
  );
};

export default EmailEditor;
