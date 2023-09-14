import { useState } from "react";
import Loading from "./Loading";

interface PdfUploadProps {
  email: string;
}
function PdfUpload({ email }: PdfUploadProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPdfFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (pdfFile) {
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      formData.append("email", email);

      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/upload-pdf", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // File uploaded successfully
          console.log("PDF file uploaded successfully");
          setPdfFile(null);
          setUploadError(null);
          setLoading(false);
          setUploadSuccess(true);
        } else {
          // Handle upload error
          const data = await response.json();
          setUploadError(data.error || "Upload failed");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading PDF file:", error);
        setUploadError("Upload failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upload a PDF</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-2"
      />
      {loading ? (
        <Loading />
      ) : (
        <button
          onClick={handleUpload}
          className="bg-red text-white px-4 py-2 rounded-lg hover:bg-pink"
        >
          Upload
        </button>
      )}
      {uploadError && <p className="text-red mt-2">Error: {uploadError}</p>}
      {uploadSuccess && <p className="text-green mt-2">Upload Success</p>}
    </div>
  );
}

export default PdfUpload;
