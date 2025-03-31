"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Upload, Copy, Trash2, Check } from "lucide-react";
// Firebase 연동 시 주석 해제
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/app/firebase";

export default function AdminImagesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<
    { name: string; url: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);

      // Firebase 연동 후 아래 코드로 대체
      const imagesRef = ref(storage, "images");
      const result = await listAll(imagesRef);
      const urls = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        }),
      );
      setUploadedImages(urls);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("이미지를 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      // Firebase 연동 후 아래 코드로 대체
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      const uploadTask = uploadBytes(storageRef, selectedFile);

      // 업로드 진행 상황을 시뮬레이션합니다 (Firebase는 진행 상황 업데이트를 직접 제공하지 않음)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) clearInterval(progressInterval);
          return Math.min(prev + 10, 90);
        });
      }, 300);

      await uploadTask;
      clearInterval(progressInterval);
      setUploadProgress(100);
      // 업로드된 이미지의 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);
      setUploadedImages((prev) => [
        ...prev,
        { name: selectedFile.name, url: downloadURL },
      ]);

      // 임시로 업로드 프로세스 시뮬레이션
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      const fakeUrl = `/images/uploads/${selectedFile.name}`;
      setUploadedImages((prev) => [
        ...prev,
        { name: selectedFile.name, url: fakeUrl },
      ]);

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploading(false);
      setUploadProgress(0);

      alert(
        "이미지가 업로드되었습니다. (Firebase 연동 시 실제로 업로드됩니다)",
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
      })
      .catch((err) => {
        console.error("Error copying URL:", err);
      });
  };

  const handleDeleteImage = async (name: string) => {
    if (!window.confirm("정말로 이 이미지를 삭제하시겠습니까?")) {
      return;
    }

    try {
      // Firebase 연동 후 아래 코드로 대체
      const imageRef = ref(storage, `images/${name}`);
      await deleteObject(imageRef);

      setUploadedImages((prev) => prev.filter((img) => img.name !== name));
      alert("이미지가 삭제되었습니다. (Firebase 연동 시 실제로 삭제됩니다)");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("이미지 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> 대시보드로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">이미지 업로드</h1>
      </div>

      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">새 이미지 업로드</h2>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
            disabled={uploading}
            ref={fileInputRef}
          />
          <p className="mt-1 text-xs text-gray-500">
            SVG, PNG, JPG 또는 GIF 파일 (최대 5MB)
          </p>
        </div>

        {selectedFile && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">
              선택한 파일: {selectedFile.name} (
              {(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          </div>
        )}

        {uploading && (
          <div className="mb-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-1 text-center text-xs text-gray-500">
              {uploadProgress}% 업로드됨
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
        >
          <Upload size={16} className="mr-2" /> 업로드
        </button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">업로드된 이미지</h2>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
              <p>이미지를 불러오는 중...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-700">{error}</div>
        ) : uploadedImages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            업로드된 이미지가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {uploadedImages.map((image) => (
              <div
                key={image.name}
                className="overflow-hidden rounded-lg border bg-white shadow-sm"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="mb-2 overflow-hidden text-sm font-medium text-ellipsis">
                    {image.name}
                  </p>
                  <div className="mb-2 flex items-center">
                    <input
                      type="text"
                      value={image.url}
                      readOnly
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs"
                    />
                    <button
                      onClick={() => handleCopyUrl(image.url)}
                      className="ml-2 rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                      title="URL 복사"
                    >
                      {copiedUrl === image.url ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteImage(image.name)}
                    className="inline-flex items-center rounded-md bg-red-100 px-3 py-1 text-xs text-red-700 hover:bg-red-200"
                  >
                    <Trash2 size={12} className="mr-1" /> 삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
