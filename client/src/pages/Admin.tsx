import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import siteContentData from "@/data/siteContent.json";

// Types for our content structure
type SiteContent = typeof siteContentData;

export default function Admin() {
    const [content, setContent] = useState<SiteContent>(siteContentData);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("content");

    // Handler for text changes in the content editor
    const handleContentChange = (path: string[], value: string) => {
        setContent((prev) => {
            // Deep clone to avoid mutation
            const newContent = JSON.parse(JSON.stringify(prev));

            // Navigate to the nested property
            let current = newContent;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }

            // Update the value
            current[path[path.length - 1]] = value;
            return newContent;
        });
    };

    const handleSaveContent = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("/api/save-content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error("Failed to save content");
            }

            toast.success("Content saved successfully!", {
                description: "Changes will be live in a few minutes after the site rebuilds.",
            });
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Error saving content", {
                description: "Please try again later.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-semibold text-charcoal">Content Management</h2>
                    <p className="text-gray-600">Manage website content and CV files</p>
                </div>
                {activeTab === "content" && (
                    <Button onClick={handleSaveContent} disabled={isSaving} className="bg-aquamarine text-charcoal hover:bg-aquamarine/90">
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full md:w-auto grid grid-cols-2 mb-8">
                    <TabsTrigger value="content">Text Content</TabsTrigger>
                    <TabsTrigger value="cv">CV Management</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Website Text</CardTitle>
                            <CardDescription>
                                Edit the text content of the website. Changes affect all languages where applicable.
                                Use the "Translations" section for UI labels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {/* About Section */}
                                <AccordionItem value="about">
                                    <AccordionTrigger className="text-lg font-medium">About Section</AccordionTrigger>
                                    <AccordionContent className="space-y-6 pt-4">
                                        <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 text-sm text-yellow-800 mb-6">
                                            <strong>Formatting Note:</strong> Text entered here will be displayed as plain text.
                                            Do not include HTML tags. Paragraphs are separated by the fields below.
                                        </div>

                                        <div className="grid gap-6">
                                            <div className="space-y-2">
                                                <Label>Intro Paragraph</Label>
                                                <Textarea
                                                    value={content.content.about.p1}
                                                    onChange={(e) => handleContentChange(["content", "about", "p1"], e.target.value)}
                                                    className="min-h-[120px]"
                                                />
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium">Embedded Quote 1 (The Legal 500)</h4>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label>Quote Text</Label>
                                                        <Textarea
                                                            value={content.content.about.quote1}
                                                            onChange={(e) => handleContentChange(["content", "about", "quote1"], e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Source</Label>
                                                        <Input
                                                            value={content.content.about.quoteSource1}
                                                            onChange={(e) => handleContentChange(["content", "about", "quoteSource1"], e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-2">
                                                <Label>Arbitrator Experience Paragraph</Label>
                                                <Textarea
                                                    value={content.content.about.p2}
                                                    onChange={(e) => handleContentChange(["content", "about", "p2"], e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Arbitrator Services (One per line)</Label>
                                                <Textarea
                                                    value={content.content.about.serviceList1.join("\n")}
                                                    onChange={(e) => {
                                                        const list = e.target.value.split("\n").filter(line => line.trim() !== "");
                                                        // We can't easily use the generic handler for arrays that change length/structure easily without complex logic
                                                        // Ideally we just replace the whole array.
                                                        setContent(prev => ({
                                                            ...prev,
                                                            content: {
                                                                ...prev.content,
                                                                about: {
                                                                    ...prev.content.about,
                                                                    serviceList1: list
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    className="min-h-[100px] font-mono text-sm"
                                                />
                                                <p className="text-xs text-muted-foreground">Enter each item on a new line.</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Counsel Services Header</Label>
                                                <Input
                                                    value={content.content.about.p3}
                                                    onChange={(e) => handleContentChange(["content", "about", "p3"], e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Counsel Services (One per line)</Label>
                                                <Textarea
                                                    value={content.content.about.serviceList2.join("\n")}
                                                    onChange={(e) => {
                                                        const list = e.target.value.split("\n").filter(line => line.trim() !== "");
                                                        setContent(prev => ({
                                                            ...prev,
                                                            content: {
                                                                ...prev.content,
                                                                about: {
                                                                    ...prev.content.about,
                                                                    serviceList2: list
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    className="min-h-[100px] font-mono text-sm"
                                                />
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium">Embedded Quote 2 (Chambers USA)</h4>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label>Quote Text</Label>
                                                        <Textarea
                                                            value={content.content.about.quote2}
                                                            onChange={(e) => handleContentChange(["content", "about", "quote2"], e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Source</Label>
                                                        <Input
                                                            value={content.content.about.quoteSource2}
                                                            onChange={(e) => handleContentChange(["content", "about", "quoteSource2"], e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-2">
                                                <Label>Jurisdictions Paragraph</Label>
                                                <Textarea
                                                    value={content.content.about.p4}
                                                    onChange={(e) => handleContentChange(["content", "about", "p4"], e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Sectors (One per line)</Label>
                                                <Textarea
                                                    value={content.content.about.sectorList.join("\n")}
                                                    onChange={(e) => {
                                                        const list = e.target.value.split("\n").filter(line => line.trim() !== "");
                                                        setContent(prev => ({
                                                            ...prev,
                                                            content: {
                                                                ...prev.content,
                                                                about: {
                                                                    ...prev.content.about,
                                                                    sectorList: list
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    className="min-h-[120px] font-mono text-sm"
                                                />
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium">Embedded Quote 3 (Lexology)</h4>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label>Quote Text</Label>
                                                        <Textarea
                                                            value={content.content.about.quote3}
                                                            onChange={(e) => handleContentChange(["content", "about", "quote3"], e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Source</Label>
                                                        <Input
                                                            value={content.content.about.quoteSource3}
                                                            onChange={(e) => handleContentChange(["content", "about", "quoteSource3"], e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-2">
                                                <Label>Recognition Paragraph</Label>
                                                <Textarea
                                                    value={content.content.about.p5}
                                                    onChange={(e) => handleContentChange(["content", "about", "p5"], e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Speaking/Teaching Paragraph</Label>
                                                <Textarea
                                                    value={content.content.about.p6}
                                                    onChange={(e) => handleContentChange(["content", "about", "p6"], e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Background/Admissions Paragraph</Label>
                                                <Textarea
                                                    value={content.content.about.p7}
                                                    onChange={(e) => handleContentChange(["content", "about", "p7"], e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            </div>

                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Translations / UI Labels */}
                                <AccordionItem value="translations">
                                    <AccordionTrigger className="text-lg font-medium">Translations & UI Labels</AccordionTrigger>
                                    <AccordionContent className="pt-4">
                                        <p className="text-sm text-gray-500 mb-4">Edit the labels for navigation, footer, and section headers in all supported languages.</p>
                                        <div className="grid gap-6">
                                            {Object.entries(content.translations).map(([key, trans]) => (
                                                <div key={key} className="p-4 bg-gray-50 rounded border">
                                                    <h4 className="font-mono text-xs text-gray-500 mb-2">{key}</h4>
                                                    <div className="grid gap-3 md:grid-cols-3">
                                                        <div className="space-y-1">
                                                            <Label className="text-xs">English</Label>
                                                            <Input
                                                                value={trans.EN}
                                                                onChange={(e) => handleContentChange(["translations", key, "EN"], e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-xs">Español</Label>
                                                            <Input
                                                                value={trans.ES}
                                                                onChange={(e) => handleContentChange(["translations", key, "ES"], e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-xs">Português</Label>
                                                            <Input
                                                                value={trans.PT}
                                                                onChange={(e) => handleContentChange(["translations", key, "PT"], e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cv">
                    <CVManager />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function CVManager() {
    const [uploading, setUploading] = useState(false);

    // Hardcoded list of expected CV files to manage
    const cvFiles = [
        { name: "English CV", filename: "Franzetti-CV-English.pdf", lang: "EN" },
        { name: "Spanish CV", filename: "Franzetti-CV-Spanish.pdf", lang: "ES" },
        { name: "Portuguese CV", filename: "Franzetti-CV-Portuguese.pdf", lang: "PT" },
        { name: "English Mini CV", filename: "cv-english-mini.pdf", lang: "EN (Mini)" },
    ];

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetFilename: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.type !== "application/pdf") {
            toast.error("Invalid file type", { description: "Please upload a PDF file." });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", targetFilename); // We force the filename to match the target

        setUploading(true);
        try {
            const response = await fetch("/api/upload-cv", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            toast.success("CV uploaded successfully!", {
                description: `${targetFilename} has been updated. Changes will be reflected after the site rebuilds.`
            });
        } catch (error) {
            console.error(error);
            toast.error("Upload failed", {
                description: "There was an error uploading the file. Please try again."
            });
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>CV Management</CardTitle>
                <CardDescription>
                    Update the downloadable CV documents. Uploading a new file will automatically replace the existing one, keeping the download links working.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    {cvFiles.map((file) => (
                        <div key={file.filename} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-red-100 rounded flex items-center justify-center text-red-600">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-charcoal">{file.name}</p>
                                    <p className="text-xs text-gray-500">{file.filename}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Input
                                    type="file"
                                    className="hidden"
                                    id={`upload-${file.filename}`}
                                    accept=".pdf"
                                    onChange={(e) => handleFileUpload(e, file.filename)}
                                    disabled={uploading}
                                />
                                <Button asChild variant="outline" disabled={uploading} className="cursor-pointer">
                                    <label htmlFor={`upload-${file.filename}`}>
                                        {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                        Replace File
                                    </label>
                                </Button>
                                <Button asChild variant="ghost" size="icon" title="View Current">
                                    <a href={`/cv/${file.filename}`} target="_blank" rel="noopener noreferrer">
                                        <FileText className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
