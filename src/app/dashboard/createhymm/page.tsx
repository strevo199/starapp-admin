"use client";
import React, { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState<{
    hymm_number: number;
    content: string;
    chorus?: string;
    language: "english" | "yoruba" | "igbo";
    title: string;
    verses: { label: string; value: string }[];
  }>({
    hymm_number: 0,
    verses: [],

    title: "",
    chorus: "",
    language: "english",
    content: "",
  });
  const [verse, setVerse] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleVerseInputChange = (e) => {
    const { name, value } = e.target;
    setVerse((prev) => ({ ...prev, [name]: value }));
  };

  const appVerse = () => {
    setFormData((pre) => ({ ...pre, verses: [...formData.verses, verse] }));
    setVerse({
      label: "",
      value: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("formData", formData);

    try {
      const response = await fetch("/api/upload-hymm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("result--------", result);

      if (result.statusCode === 200) {
        alert(result.responseMessage);
      }

      // Reset form
      setFormData({
        hymm_number: 0,
        verses: [{ label: "", value: "" }],
        title: "",
        chorus: "",
        content: "",
        language: "english",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Operation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto   p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Hymm</h1>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        {/* hymm_number */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Hymm Title
          </label>
          <input
            type="text"
            placeholder="enter title here"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* hymm_number */}
        <div>
          <label
            htmlFor="hymm_number"
            className="block text-sm font-medium text-gray-700"
          >
            Hymm Number
          </label>
          <input
            type="text"
            placeholder="enter hymm_number here"
            id="hymm_number"
            name="hymm_number"
            value={formData.hymm_number}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Hymm Content
          </label>
          <input
            type="text"
            placeholder="enter content here"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Platform Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="language"
                value="english"
                checked={formData.language === "english"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">English</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="language"
                value="yoruba"
                checked={formData.language === "yoruba"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Yoruba</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="language"
                value="english"
                checked={formData.language === "igbo"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Igbo</span>
            </label>
          </div>
        </div>
        {/* chorus */}
        <div className="mt-2">
          <label
            htmlFor="chorus"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Chorus
          </label>
          <textarea
            id="chorus"
            name="chorus"
            rows={4}
            value={formData.chorus}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter chorus here..."
          />
        </div>
        <div>
          <div className="font-bold my-2.5"> Verses</div>

          {formData.verses.map((item, index) => (
            <div
              className={`p-2  ${
                index % 2 ? "bg-gray-100" : " bg-transparent"
              } flex gap-x-3`}
              key={index.toString()}
            >
              <div>{item.label}</div>
              <pre>{item.value}</pre>
            </div>
          ))}
        </div>
        {/* Verses */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="font-bold my-2.5">Create Verses</div>
          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Label
            </label>
            <input
              type="text"
              placeholder="enter label here"
              id="label"
              name="label"
              value={verse.label}
              onChange={handleVerseInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Value
            </label>
            <textarea
              id="value"
              name="value"
              rows={4}
              value={verse.value}
              onChange={handleVerseInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter value here..."
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className={`w-30 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              `}
              onClick={appVerse}
            >
              Add verse
            </button>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Submit Hymm"}
          </button>
        </div>
      </form>
    </div>
  );
}
