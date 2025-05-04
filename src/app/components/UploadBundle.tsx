"use client";

import { useRouter } from "next/navigation";

import React, { useRef, useState } from "react";

interface AppDetail {
  message: string;

  data: {
    id: string;
    appName: string;
    appLogo: string;
    platform: string;
    stagingKey: string;
    productionKey: string;
  };
}

const ActiveBundle = ({
  app,
  environment,
}: {
  app: AppDetail["data"];
  environment: string;
}) => {
  const router = useRouter();
  const bundleInputRef = useRef(null);
  const assetsInputRef = useRef(null);
  const [bundle, setBundle] = useState(null);
  const [assets, setAssets] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    targetedVersion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBundle(file);

      // Create preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAssets(file);

      // Create preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("targetedVersion", formData.targetedVersion);
    data.append(
      "envKey",
      environment === "production" ? app.productionKey : app.stagingKey
    );
    data.append("platform", app.platform);
    data.append("bundle", bundle);
    data.append("assets", assets);

    try {
      const response = await fetch("/api/upload-bundle", {
        method: "POST",
        body: data,
        // Headers are automatically set by browser for FormData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("result");

      if (result.message === "Success") {
        router.refresh();
      }

      // Reset form
      setFormData({
        targetedVersion: "",
      });
      setBundle(null);
      setAssets(null);
      if (bundleInputRef.current) {
        bundleInputRef.current.value = "";
      }
      if (assetsInputRef.current) {
        assetsInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    assetsInputRef.current?.click();
  };
  const handleBunbleButtonClick = () => {
    bundleInputRef.current?.click();
  };

  return (
    <div className=" flex-col p-3 border-green-200 border-1 rounded-xl bg-white w-fit  shadow  flex gap-3 py-2">
      <div className="font-bold text-gray-700 text-sm">Upload Bundle</div>
      <div className=" flex-wrap p-6 flex gap-3 py-2">
        <div className="max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* App Icon Upload */}
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={"/bundle.png"}
                  alt="App icon preview"
                  className="w-10 h-10 bg-blue-100 p-2 rounded-full object-cover"
                />

                <input
                  type="file"
                  ref={bundleInputRef}
                  onChange={handleFileChange}
                  accept=".jsbundle,.bundle"
                  required
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleBunbleButtonClick}
                  className="px-4 py-2 rounded-md border-blue-600 border-1 text-blue-600 font-semibold hover:bg-blue-300 text-sm"
                >
                  Choose Bundle
                </button>
                {bundle?.name && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{bundle?.name}</span>
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={"/assets.png"}
                  alt="App icon preview"
                  className="w-10 h-10 bg-blue-100 p-2 rounded-full object-cover"
                />

                <input
                  type="file"
                  ref={assetsInputRef}
                  onChange={handleAssetsChange}
                  accept=".zip"
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="px-4 py-2 rounded-md border-blue-600 border-1 text-blue-600 font-semibold hover:bg-blue-300 text-sm"
                >
                  Choose Assets (.zip)
                </button>

                {assets?.name && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{assets?.name}</span>
                  </p>
                )}
              </div>
            </div>

            {/* App Name */}
            <div>
              <label
                htmlFor="targetedVersion"
                className="block text-sm font-medium text-gray-700"
              >
                Targeted Version
              </label>
              <input
                type="text"
                id="targetedVersion"
                name="targetedVersion"
                value={formData.targetedVersion}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>


            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActiveBundle;
