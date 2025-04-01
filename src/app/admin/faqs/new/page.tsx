"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, Loader2, X } from "lucide-react";
import { createFaq } from "@/services/faqService";
import { FAQ } from "@/types";
import { FAQ_CATEGORIES } from "@/data"; // Import FAQ categories

export default function AddFaqPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 폼 상태 관리
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("general"); // 기본 카테고리
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  // 태그 추가 핸들러
  const handleAddTag = () => {
    const newTag = currentTag.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setCurrentTag("");
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim() || !category.trim()) {
      setError("질문, 답변, 카테고리는 필수 항목입니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newFaq: Omit<FAQ, "id" | "createdAt" | "updatedAt"> = {
        question,
        answer,
        category,
        tags: tags.length > 0 ? tags : undefined,
      };

      await createFaq(newFaq);
      alert("새 FAQ가 성공적으로 추가되었습니다.");
      router.push("/admin/faqs");
    } catch (err) {
      console.error("FAQ 생성 중 오류가 발생했습니다:", err);
      setError("FAQ를 저장하는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/faqs"
          className="mb-2 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ChevronLeft size={16} className="mr-1" /> FAQ 목록으로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">새 FAQ 작성</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* 질문 */}
          <div className="mb-4">
            <label htmlFor="question" className="mb-2 block font-medium">
              질문 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="질문을 입력하세요"
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 답변 */}
          <div className="mb-4">
            <label htmlFor="answer" className="mb-2 block font-medium">
              답변 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력하세요"
              className="h-32 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* 카테고리 */}
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block font-medium">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 태그 */}
          <div className="mb-6">
            <label htmlFor="tags" className="mb-2 block font-medium">
              태그
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                placeholder="태그 입력 후 Enter 또는 추가 버튼 클릭"
                className="flex-1 rounded-l-md border border-gray-300 p-2"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                추가
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-6 flex justify-end space-x-2">
            <Link
              href="/admin/faqs"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center rounded-md bg-blue-500 px-4 py-2 text-white ${
                loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-600"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "FAQ 저장"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
