"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { updateBundleDetail } from "../actions/updateBundle";
import { useRouter } from "next/navigation";
import { HymmListype } from "@/store.tsx/slices/appSlice";

interface Verse {
  label: string;
  value: string;
}

interface FormData {
  title: string;
  content: string;
  chorus: string;
  verses: Verse[];
}

const EditHymm = ({
  hymm,
  isModalOpen,
  closeModalAction,
}: {
  hymm: HymmListype[0] | undefined;
  closeModalAction: () => void;
  isModalOpen: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [verse, setVerse] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    chorus: "",
    verses: [],
  });

  // Initialize form data when hymm changes
  useEffect(() => {
    if (hymm) {
      setFormData({
        title: hymm.title || "",
        content: hymm.content || "",
        chorus: hymm.chorus || "",
        verses: hymm.verses?.map((v) => ({ ...v })) || [],
      });
    }
  }, [hymm]);
  const handleVerseInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setVerse((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerseChange = (
    index: number,
    field: keyof Verse,
    value: string
  ) => {
    setFormData((prev) => {
      const newVerses = [...prev.verses];
      newVerses[index] = { ...newVerses[index], [field]: value };
      return { ...prev, verses: newVerses };
    });
  };

    const appVerse = () => {
    setFormData((pre) => ({ ...pre, verses: [...formData.verses, verse] }));
    setVerse({
      label: "",
      value: "",
    });
  };
  const removeVerse = (verse: Verse) => {    
    setFormData((pre) => ({ ...pre, verses: formData.verses.filter(item => item.label !== verse.label)}));
  }



  const handleUpdateBundle = async () => {
    if (!formData.title || !formData.content) {
      alert("Title and content are required");
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateBundleDetail({
        ...formData,
        _id: hymm?._id || "",
      });

      alert(result.responseMessage || "Hymm updated successfully");
      router.refresh();
      closeModalAction();
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update hymm");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModalAction}>
      <div className="gap-y-3 max-h-[80vh] overflow-y-auto flex flex-col p-4">
        <div className="flex flex-col items-center mb-4 justify-center">
          <h2 className="text-lg text-gray-800 font-bold">
            Update Hymm {hymm?.hymm_number}
          </h2>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block  text-sm font-medium text-gray-700"
          >
            Hymm Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Hymm Content *
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="mt-1 block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="chorus"
            className="block text-sm font-medium text-gray-700"
          >
            Chorus
          </label>
          <textarea
            id="chorus"
            name="chorus"
            rows={4}
            value={formData.chorus}
            onChange={handleInputChange}
            className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">Verses</h3>
          {formData.verses.map((verse, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative"
            >
              <button onClick={() =>removeVerse(verse)} className=" bg-red-400 text-sm  h-6 w-6 absolute right-2 top-1 shadow-2xl rounded-3xl" >x</button>
              <div>
                <label
                  htmlFor={`verse-label-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Label
                </label>
                <input
                  type="text"
                  id={`verse-label-${index}`}
                  value={verse.label}
                  onChange={(e) =>
                    handleVerseChange(index, "label", e.target.value)
                  }
                  className="mt-1 text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor={`verse-value-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id={`verse-value-${index}`}
                  rows={3}
                  value={verse.value}
                  onChange={(e) =>
                    handleVerseChange(index, "value", e.target.value)
                  }
                  className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="font-bold text-gray-600 my-2.5">Create More Verses</div>
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
                className="mt-1 block w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        <div className="mt-4">
          <button
            onClick={handleUpdateBundle}
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update Hymm"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditHymm;
