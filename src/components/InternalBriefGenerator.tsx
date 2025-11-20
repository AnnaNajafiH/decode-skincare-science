import React, { useState, useEffect } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Loader2,
  BookOpen,
  Users,
} from "lucide-react";
import { RDDocument, InternalBrief } from "../types";
import { contentService } from "../services/contentService";

const InternalBriefGenerator: React.FC = () => {
  const [rdDocuments, setRdDocuments] = useState<RDDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState(
    "Marketing & Communications Teams"
  );
  const [generating, setGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<InternalBrief | null>(
    null
  );
  const [briefs, setBriefs] = useState<InternalBrief[]>([]);

  useEffect(() => {
    loadRDDocuments();
    loadBriefs();
  }, []);

  const loadRDDocuments = async () => {
    try {
      const docs = await contentService.getRDDocuments();
      setRdDocuments(docs);
      if (docs.length > 0) setSelectedDoc(docs[0].id);
    } catch (error) {
      console.error("Failed to load R&D documents:", error);
    }
  };

  const loadBriefs = async () => {
    try {
      const data = await contentService.getInternalBriefs();
      setBriefs(data);
    } catch (error) {
      console.error("Failed to load briefs:", error);
    }
  };

  const handleGenerate = async () => {
    if (!selectedDoc) return;

    setGenerating(true);
    setGeneratedBrief(null);

    try {
      const brief = await contentService.generateInternalBrief(
        selectedDoc,
        targetAudience
      );
      setGeneratedBrief(brief);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setGenerating(false);
    }
  };

  const selectedDocData = rdDocuments.find((doc) => doc.id === selectedDoc);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <FileText className="w-7 h-7 text-orange-600" />
          Internal Brief Generator
        </h2>
        <p className="text-gray-600">
          Convert R&D research into campaign briefs and training materials
        </p>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ✨ <strong>No approval required</strong> — Content is generated
            instantly for internal use
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Select R&D Document
              </label>
              <select
                value={selectedDoc}
                onChange={(e) => setSelectedDoc(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent"
              >
                {rdDocuments.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.title}
                  </option>
                ))}
              </select>

              {selectedDocData && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Summary
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedDocData.summary}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Key Ingredients
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDocData.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-xs px-2 py-1 bg-white rounded-md text-gray-600"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Study Type
                    </p>
                    <span className="text-sm px-2 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-md">
                      {selectedDocData.studyType}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Marketing Teams, Sales, Training"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !selectedDoc}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-beiersdorf-blue text-white rounded-lg hover:from-orange-700 hover:to-beiersdorf-navy transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Brief...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Internal Brief
                </>
              )}
            </button>
          </div>

          {/* Previous Briefs */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recent Briefs
            </h3>
            <div className="space-y-3">
              {briefs.map((brief) => (
                <div
                  key={brief.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {brief.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(brief.generatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          {!generatedBrief && !generating && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <FileText className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a document and generate a brief</p>
            </div>
          )}

          {generating && (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-12 h-12 animate-spin text-beiersdorf-blue mb-4" />
              <p className="text-gray-600">Creating internal brief...</p>
              <p className="text-sm text-gray-500 mt-2">
                Extracting key insights and formatting
              </p>
            </div>
          )}

          {generatedBrief && (
            <div className="space-y-6 max-h-[800px] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 pb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {generatedBrief.title}
                </h3>
                <button className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div>
                <h4 className="text-lg font-bold text-beiersdorf-blue mb-2">
                  {generatedBrief.headline}
                </h4>
                <p className="text-sm text-gray-600">
                  Target: {generatedBrief.targetAudience}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Key Proof Points
                </h4>
                <div className="space-y-4">
                  {generatedBrief.keyProofPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-beiersdorf-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {point.point}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            {point.evidence}
                          </p>
                          <p className="text-xs text-gray-500 italic">
                            📚 {point.citation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Creative Hooks
                </h4>
                <div className="space-y-2">
                  {generatedBrief.creativeHooks.map((hook, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg"
                    >
                      <span className="text-yellow-600">💡</span>
                      <p className="text-sm text-gray-900">{hook}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Sample Social Captions
                </h4>
                <div className="space-y-3">
                  {generatedBrief.sampleCaptions.map((caption, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <p className="text-sm text-gray-900">{caption}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Training Snippets
                </h4>
                <div className="space-y-2">
                  {generatedBrief.trainingSnippets.map((snippet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <span className="text-green-600 font-bold">→</span>
                      <p className="text-sm text-gray-900">{snippet}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">
                  Generated:{" "}
                  {new Date(generatedBrief.generatedAt).toLocaleString()}
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download DOCX
                  </button>
                  <button className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternalBriefGenerator;
