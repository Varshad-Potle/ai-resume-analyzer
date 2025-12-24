import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="group flex flex-col justify-between bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full animate-in fade-in duration-1000"
    >
      {/* --- HEADER: Text (Left) + Score (Right) --- */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1 pr-4">
          {companyName ? (
            <h2 className="text-2xl font-bold text-gray-900 break-words group-hover:text-blue-600 transition-colors">
              {companyName}
            </h2>
          ) : (
            // Fallback if no company name
            <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
          )}

          {jobTitle && (
            <h3 className="text-base font-medium text-gray-500 break-words">
              {jobTitle}
            </h3>
          )}
        </div>

        {/* Score Component */}
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* --- BODY: Image (Bottom) ---
      {/* Removed 'gradient-border' to match the clean white design in your image */}
      {/* <div className="w-full h-[300px] rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shadow-inner mt-auto">
        <img
          src={imagePath}
          alt="resume"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div> */}
    </Link>
  );
};

export default ResumeCard;
