import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Save } from 'lucide-react'; // Import Save icon

const EmailEditor = ({ initialContent, onSave }) => {
  const [content, setContent] = useState(initialContent || "");

  const handleEditorChange = (newContent) => { // Renamed parameter for clarity
    setContent(newContent);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  return (
    // Apply Tailwind classes for max-width and centering
    <div className="email-editor w-full max-w-4xl mx-auto px-4 py-8">
       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Compose Your Email</h2>
      {/* Apply Tailwind classes for border, rounded corners, and overflow */}
      <div className="email-editor-container border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-6">
        <Editor
          apiKey="your-tinymce-api-key" // Replace with your TinyMCE API key
          value={content}
          init={{
            height: 500,
            menubar: true, // Keep menubar for full features
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap",
              "preview", "anchor", "searchreplace", "visualblocks", "code",
              "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
            ],
            toolbar:
              "undo redo | styles | bold italic underline | " + // Updated toolbar for common actions
              "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image media | " +
              "removeformat | code | fullscreen | help",
            content_style:
              'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 14px; }',
             // Optional: Add custom skin or content CSS if needed
             // skin: 'oxide', // Default skin
             // content_css: 'default'
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      {/* Apply Tailwind classes for alignment and margin */}
      <div className="email-editor-actions mt-4 text-right">
        {/* Apply Tailwind classes for button styling (indigo theme) */}
        <button
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          onClick={handleSave}
        >
          <Save size={18} className="mr-2" /> {/* Add Save icon */}
          Save Email
        </button>
      </div>
      {/* Removed the <style jsx> block */}
    </div>
  );
};

export default EmailEditor;
