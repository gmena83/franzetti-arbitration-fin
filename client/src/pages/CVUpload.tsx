import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadState {
  english: UploadStatus;
  spanish: UploadStatus;
  portuguese: UploadStatus;
}

export default function CVUpload() {
  const { t, language } = useLanguage();
  const [uploadState, setUploadState] = useState<UploadState>({
    english: "idle",
    spanish: "idle",
    portuguese: "idle",
  });
  const [messages, setMessages] = useState<Record<string, string>>({});

  const handleFileUpload = async (lang: keyof UploadState, file: File) => {
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setMessages((prev) => ({
        ...prev,
        [lang]: "Please upload a PDF file",
      }));
      setUploadState((prev) => ({ ...prev, [lang]: "error" }));
      return;
    }

    setUploadState((prev) => ({ ...prev, [lang]: "uploading" }));
    setMessages((prev) => ({ ...prev, [lang]: "Uploading..." }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", lang);

    try {
      const response = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadState((prev) => ({ ...prev, [lang]: "success" }));
        setMessages((prev) => ({
          ...prev,
          [lang]: `Successfully uploaded: ${data.filename}`,
        }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setUploadState((prev) => ({ ...prev, [lang]: "error" }));
      setMessages((prev) => ({
        ...prev,
        [lang]: "Upload failed. Please try again.",
      }));
    }
  };

  const renderUploadSection = (
    lang: keyof UploadState,
    label: string,
    description: string
  ) => {
    const status = uploadState[lang];
    const message = messages[lang];

    return (
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          {status === "success" && (
            <CheckCircle className="w-6 h-6 text-green-600" />
          )}
          {status === "error" && (
            <AlertCircle className="w-6 h-6 text-red-600" />
          )}
        </div>

        <div className="space-y-3">
          <label
            htmlFor={`upload-${lang}`}
            className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              status === "uploading"
                ? "border-blue-400 bg-blue-50"
                : status === "success"
                ? "border-green-400 bg-green-50"
                : status === "error"
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload
                className={`w-10 h-10 mb-3 ${
                  status === "uploading"
                    ? "text-blue-500"
                    : status === "success"
                    ? "text-green-500"
                    : status === "error"
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              />
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PDF files only</p>
            </div>
            <input
              id={`upload-${lang}`}
              type="file"
              className="hidden"
              accept=".pdf,application/pdf"
              disabled={status === "uploading"}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(lang, file);
                }
              }}
            />
          </label>

          {message && (
            <p
              className={`text-sm ${
                status === "success"
                  ? "text-green-600"
                  : status === "error"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === "ES"
              ? "Subir CVs"
              : language === "PT"
              ? "Enviar CVs"
              : "Upload CVs"}
          </h1>
          <p className="text-gray-600">
            {language === "ES"
              ? "Sube versiones actualizadas de tu CV en cada idioma. Solo se aceptan archivos PDF."
              : language === "PT"
              ? "Envie versões atualizadas do seu CV em cada idioma. Apenas arquivos PDF são aceitos."
              : "Upload updated versions of your CV in each language. PDF files only."}
          </p>
        </div>

        <div className="space-y-6">
          {renderUploadSection(
            "english",
            language === "ES"
              ? "CV en Inglés"
              : language === "PT"
              ? "CV em Inglês"
              : "English CV",
            language === "ES"
              ? "Sube la versión en inglés de tu CV"
              : language === "PT"
              ? "Envie a versão em inglês do seu CV"
              : "Upload the English version of your CV"
          )}

          {renderUploadSection(
            "spanish",
            language === "ES"
              ? "CV en Español"
              : language === "PT"
              ? "CV em Espanhol"
              : "Spanish CV",
            language === "ES"
              ? "Sube la versión en español de tu CV"
              : language === "PT"
              ? "Envie a versão em espanhol do seu CV"
              : "Upload the Spanish version of your CV"
          )}

          {renderUploadSection(
            "portuguese",
            language === "ES"
              ? "CV en Portugués"
              : language === "PT"
              ? "CV em Português"
              : "Portuguese CV",
            language === "ES"
              ? "Sube la versión en portugués de tu CV"
              : language === "PT"
              ? "Envie a versão em português do seu CV"
              : "Upload the Portuguese version of your CV"
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>
              {language === "ES" ? "Nota:" : language === "PT" ? "Nota:" : "Note:"}
            </strong>{" "}
            {language === "ES"
              ? "Los CVs subidos serán inmediatamente accesibles en el pie de página del sitio web."
              : language === "PT"
              ? "Os CVs enviados estarão imediatamente acessíveis no rodapé do site."
              : "Uploaded CVs will be immediately accessible in the website footer."}
          </p>
        </div>
      </div>
    </div>
  );
}
