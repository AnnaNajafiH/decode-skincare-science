import React, { useState, useEffect } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Loader2,
  BookOpen,
  Users,
  Mail,
  Send,
  X,
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
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentAck, setEmailSentAck] = useState<string | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

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

  const handleOpenEmailModal = () => {
    setEmailRecipients("");
    setEmailSentAck(null);
    setEmailModalOpen(true);
  };

  const handleExportBrief = () => {
    if (!generatedBrief) return;
    // Create a simple text export for demo purposes
    const parts: string[] = [];
    parts.push(generatedBrief.title);
    parts.push("\n");
    parts.push(generatedBrief.headline);
    parts.push("\n\nKey Proof Points:\n");
    generatedBrief.keyProofPoints.forEach((p, idx) => {
      parts.push(
        `${idx + 1}. ${p.point}\n${p.evidence}\nCitation: ${p.citation}\n\n`
      );
    });
    parts.push("Creative Hooks:\n");
    generatedBrief.creativeHooks.forEach((h) => parts.push(`- ${h}\n`));
    parts.push("\nSample Captions:\n");
    generatedBrief.sampleCaptions.forEach((c) => parts.push(`- ${c}\n`));

    const blob = new Blob([parts.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeTitle = generatedBrief.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    a.download = `${safeTitle}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = async () => {
    if (!generatedBrief) return;
    const recipients = emailRecipients
      .split(/[;,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      setEmailSentAck("Please add at least one email address.");
      return;
    }

    setEmailSending(true);
    setEmailSentAck(null);
    try {
      await contentService.sendBriefByEmail(generatedBrief.id, recipients);
      setEmailSentAck("Brief sent successfully!");
      setTimeout(() => setEmailModalOpen(false), 900);
    } catch (err) {
      console.error("Failed to send brief:", err);
      setEmailSentAck("Failed to send. Try again.");
    } finally {
      setEmailSending(false);
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

          {/* Email Modal */}
          {emailModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setEmailModalOpen(false)}
              />
              <div className="relative z-10 w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">
                    Send Brief via Email
                  </h4>
                  <button
                    onClick={() => setEmailModalOpen(false)}
                    className="p-2 rounded hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Enter recipient emails (comma, semicolon or newline
                  separated).
                </p>

                <textarea
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  placeholder="alice@example.com, bob@example.com"
                  className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] mb-3"
                />

                {emailSentAck && (
                  <p
                    className={`text-sm mb-3 ${
                      emailSentAck.includes("success")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {emailSentAck}
                  </p>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEmailModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={emailSending}
                    className="px-4 py-2 rounded-lg bg-beiersdorf-blue text-white flex items-center gap-2"
                  >
                    {emailSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </div>
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
                <div className="relative flex items-center gap-3">
                  <button
                    onClick={handleExportBrief}
                    className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <div>
                    <button
                      onClick={() => setShareMenuOpen((s) => !s)}
                      className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition flex items-center gap-2 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Share
                    </button>
                  </div>

                  {shareMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <button
                        onClick={() => {
                          setShareMenuOpen(false);
                          handleOpenEmailModal();
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Mail className="w-4 h-4 text-gray-700" />
                        <span className="text-sm text-gray-900">
                          Send via Email
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setShareMenuOpen(false);
                          // Open the product shopping page (Nivea example)
                          window.open(
                            "https://login.microsoftonline.com/beiersdorf.com/oauth2/v2.0/authorize?client_id=c1c74fed-04c9-4704-80dc-9f79a2e515cb&scope=https%3A%2F%2Fwww.yammer.com%2Fuser_impersonation%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fweb.yammer.com%2Fmain%2Fauthredirect&client-request-id=019aa6bb-7602-7902-9a98-9fd7fe6aa8c3&response_mode=fragment&client_info=1&nonce=019aa6bb-7605-712f-8339-13091f4bd1e2&state=eyJpZCI6IjAxOWFhNmJiLTc2MDMtNzRkMi04MjY4LWM1MzM0YjRlNWQ4MiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=msal.js.browser&x-client-VER=4.13.2&response_type=code&code_challenge=BXcQWYQn8UBmp7LufLrWo4oX6QgryHNd7A_OBt0Lczo&code_challenge_method=S256",
                            "_blank"
                          );
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <svg
                          className="w-4 h-4 text-gray-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 3h6v6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 14L21 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm text-gray-900">
                          Viva engage
                        </span>
                      </button>
                    </div>
                  )}
                </div>
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
                  <div className="relative flex-1">
                    <button
                      onClick={() => setShareMenuOpen((s) => !s)}
                      className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Share
                    </button>

                    {shareMenuOpen && (
                      <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <button
                          onClick={() => {
                            setShareMenuOpen(false);
                            handleOpenEmailModal();
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <Mail className="w-4 h-4 text-gray-700" />
                          <span className="text-sm text-gray-900">
                            Send via Email
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setShareMenuOpen(false);
                            window.open(
                              "https://www.nivea.de/produkte/q10-anti-falten-extra-reichhaltig-tagespflege--lsf-15-50ml-lsf-15-50ml-40060000851280001.html",
                              "_blank"
                            );
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <svg
                            className="w-4 h-4 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 3h6v6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 14L21 3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-sm text-gray-900">
                            Open product page
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
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
