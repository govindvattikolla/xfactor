import { useState } from "react";

import axios from "axios";
import { Upload, Button, Input, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function UploadSession() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

 

  // Handle video file selection
  const handleFileChange = (info) => {
    const file = info.file.originFileObj || info.file; // Ensure correct file selection
    if (file) {
      setVideo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video file");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", title);
      formData.append("timestamp", timestamp?.toISOString());

      const response = await axios.post("http://localhost:5000/api/upload", formData);
      alert("Video uploaded successfully: " + response.data.videoUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload video");
    }

    setUploading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload Session</h2>
      <Input
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <DatePicker
        showTime
        placeholder="Select Timestamp"
        onChange={(date) => setTimestamp(date)}
        className="mb-2 w-full"
      />
      <Upload
        beforeUpload={() => false} // Prevent auto-upload
        onChange={handleFileChange}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Select Video</Button>
      </Upload>
      {video && (
       <p className="mt-2 text-gray-600">Selected File: {video.name}</p>
            )}
      <Button
        type="primary"
        loading={uploading}
        onClick={handleUpload}
        className="mt-4 w-full"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </Button>
    </div>
  );
}
