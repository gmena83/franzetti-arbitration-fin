import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, Upload, FileText, CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import siteContentData from "@/data/siteContent.json";

// Types for our content structure
type SiteContent = typeof siteContentData;

export default function Admin() {
    const [content, setContent] = useState<SiteContent>(siteContentData);
    const [isSaving, setIsSaving] = useState(false);
    const [currentSection, setCurrentSection] = useState("profile");

    // General handler for text changes
    const handleContentChange = (path: string[], value: string) => {
        setContent((prev) => {
            const newContent = JSON.parse(JSON.stringify(prev));
            let current = newContent;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newContent;
        });
    };

    // Generic list field updater (works for simple array of strings)
    const handleListChange = (path: string[], newList: string[]) => {
        setContent((prev) => {
            const newContent = JSON.parse(JSON.stringify(prev));
            let current = newContent;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = newList;
            return newContent;
        });
    }

    // Generic logic for updating an item in an array of objects (like professionalBackground)
    const handleArrayItemChange = (arrayPath: string[], index: number, field: string, value: string) => {
        setContent((prev) => {
            const newContent = JSON.parse(JSON.stringify(prev));
            let currentArray = newContent;
            for (let i = 0; i < arrayPath.length; i++) {
                currentArray = currentArray[arrayPath[i]];
            }
            currentArray[index][field] = value;
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

    const sections = [
        { value: "profile", label: "Profile (About)" },
        { value: "experience", label: "Experience (Lists)" },
        { value: "thoughtLeadership", label: "Thought Leadership" },
        { value: "contact", label: "Contact Info" },
        { value: "cv", label: "CV Management" },
        { value: "translations", label: "Translations & UI Labels" }
    ];

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-semibold text-charcoal">Content Management</h2>
                    <p className="text-gray-600">Select a section to edit.</p>
                </div>
                {currentSection !== "cv" && (
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

            <div className="grid gap-8">
                {/* Context Selector */}
                <Card>
                    <CardHeader>
                        <CardTitle>Section Selector</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select value={currentSection} onValueChange={setCurrentSection}>
                            <SelectTrigger className="w-full md:w-[300px]">
                                <SelectValue placeholder="Select section to edit" />
                            </SelectTrigger>
                            <SelectContent>
                                {sections.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Profile / About Section */}
                {currentSection === "profile" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile & About Section</CardTitle>
                            <CardDescription>Edit the main biography, intro text, and arbitrator services.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                                    <h4 className="font-medium">Quote 1 (The Legal 500)</h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Text</Label>
                                            <Textarea value={content.content.about.quote1} onChange={(e) => handleContentChange(["content", "about", "quote1"], e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Source</Label>
                                            <Input value={content.content.about.quoteSource1} onChange={(e) => handleContentChange(["content", "about", "quoteSource1"], e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Arbitrator Experience Paragraph</Label>
                                    <Textarea value={content.content.about.p2} onChange={(e) => handleContentChange(["content", "about", "p2"], e.target.value)} className="min-h-[100px]" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Arbitrator Services List (One per line)</Label>
                                    <Textarea
                                        value={content.content.about.serviceList1.join("\n")}
                                        onChange={(e) => handleListChange(["content", "about", "serviceList1"], e.target.value.split("\n").filter(l => l.trim() !== ""))}
                                        className="min-h-[100px] font-mono text-sm"
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Counsel Services Header</Label>
                                    <Input value={content.content.about.p3} onChange={(e) => handleContentChange(["content", "about", "p3"], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Counsel Services List (One per line)</Label>
                                    <Textarea
                                        value={content.content.about.serviceList2.join("\n")}
                                        onChange={(e) => handleListChange(["content", "about", "serviceList2"], e.target.value.split("\n").filter(l => l.trim() !== ""))}
                                        className="min-h-[100px] font-mono text-sm"
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Jurisdictions Paragraph</Label>
                                    <Textarea value={content.content.about.p4} onChange={(e) => handleContentChange(["content", "about", "p4"], e.target.value)} className="min-h-[100px]" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sectors List (One per line)</Label>
                                    <Textarea
                                        value={content.content.about.sectorList.join("\n")}
                                        onChange={(e) => handleListChange(["content", "about", "sectorList"], e.target.value.split("\n").filter(l => l.trim() !== ""))}
                                        className="min-h-[100px] font-mono text-sm"
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="font-medium">Recognition & Background</h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Recognition Paragraph</Label>
                                            <Textarea value={content.content.about.p5} onChange={(e) => handleContentChange(["content", "about", "p5"], e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Speaking/Teaching Paragraph</Label>
                                            <Textarea value={content.content.about.p6} onChange={(e) => handleContentChange(["content", "about", "p6"], e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Background/Admissions Paragraph</Label>
                                            <Textarea value={content.content.about.p7} onChange={(e) => handleContentChange(["content", "about", "p7"], e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Experience Lists Section */}
                {currentSection === "experience" && (
                    <div className="space-y-8">
                        {/* Professional Background */}
                        <Card>
                            <CardHeader><CardTitle>Professional Background</CardTitle><CardDescription>Edit roles and history.</CardDescription></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.professionalBackground.map((item, index) => (
                                    <div key={index} className="grid md:grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-2"><Label>Title/Firm</Label><Input value={item.title} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "title", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Role</Label><Input value={item.role} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "role", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Location</Label><Input value={item.location} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "location", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Period</Label><Input value={item.period} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "period", e.target.value)} /></div>
                                        <div className="space-y-2 md:col-span-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "url", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card>
                            <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.education.map((item, index) => (
                                    <div key={index} className="grid md:grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-2"><Label>Institution</Label><Input value={item.institution} onChange={(e) => handleArrayItemChange(["content", "education"], index, "institution", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Degree</Label><Input value={item.degree} onChange={(e) => handleArrayItemChange(["content", "education"], index, "degree", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Location</Label><Input value={item.location} onChange={(e) => handleArrayItemChange(["content", "education"], index, "location", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Year</Label><Input value={item.year} onChange={(e) => handleArrayItemChange(["content", "education"], index, "year", e.target.value)} /></div>
                                        <div className="space-y-2 md:col-span-2"><Label>Note</Label><Input value={item.note || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "note", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Professional Associations */}
                        <Card>
                            <CardHeader><CardTitle>Professional Associations</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.professionalAssociations.map((item, index) => (
                                    <div key={index} className="grid gap-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-2"><Label>Name</Label><Input value={item.name} onChange={(e) => handleArrayItemChange(["content", "professionalAssociations"], index, "name", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "professionalAssociations"], index, "url", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Bar Admissions */}
                        <Card>
                            <CardHeader><CardTitle>Bar Admissions</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.barAdmissions.map((item, index) => (
                                    <div key={index} className="grid gap-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-2"><Label>Name</Label><Input value={item.name} onChange={(e) => handleArrayItemChange(["content", "barAdmissions"], index, "name", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "barAdmissions"], index, "url", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Thought Leadership */}
                {currentSection === "thoughtLeadership" && (
                    <Card>
                        <CardHeader><CardTitle>Academia</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            {content.content.academia.map((item, index) => (
                                <div key={index} className="grid md:grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
                                    <div className="space-y-2"><Label>Institution</Label><Input value={item.institution} onChange={(e) => handleArrayItemChange(["content", "academia"], index, "institution", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Role</Label><Input value={item.role} onChange={(e) => handleArrayItemChange(["content", "academia"], index, "role", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Course</Label><Input value={item.course} onChange={(e) => handleArrayItemChange(["content", "academia"], index, "course", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Period</Label><Input value={item.period} onChange={(e) => handleArrayItemChange(["content", "academia"], index, "period", e.target.value)} /></div>
                                    <div className="space-y-2 md:col-span-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "academia"], index, "url", e.target.value)} /></div>
                                </div>
                            ))}
                        </CardContent>
                        {/* Note: Publications/Speaking are currently static paragraphs in "About", or not fully implemented as lists. Leaving as is for minimal scope unless requested. */}
                    </Card>
                )}

                {/* Contact Section */}
                {currentSection === "contact" && (
                    <Card>
                        <CardHeader><CardTitle>Contact Information</CardTitle><CardDescription>Update global contact details used in the Footer and Contact page.</CardDescription></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input value={content.content.contactInfo.email} onChange={(e) => handleContentChange(["content", "contactInfo", "email"], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input value={content.content.contactInfo.phone} onChange={(e) => handleContentChange(["content", "contactInfo", "phone"], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>LinkedIn (Personal Profile) URL</Label>
                                    <Input value={content.content.contactInfo.linkedinPersonal} onChange={(e) => handleContentChange(["content", "contactInfo", "linkedinPersonal"], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>LinkedIn (Company Page) URL</Label>
                                    <Input value={content.content.contactInfo.linkedinCompany} onChange={(e) => handleContentChange(["content", "contactInfo", "linkedinCompany"], e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Translations / UI Labels */}
                {currentSection === "translations" && (
                    <Card>
                        <CardHeader><CardTitle>UI Labels & Translations</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            {Object.entries(content.translations).map(([key, trans]) => (
                                <div key={key} className="p-4 bg-gray-50 rounded border">
                                    <h4 className="font-mono text-xs text-gray-500 mb-2">{key.replace(/\./g, " > ")}</h4>
                                    <div className="grid gap-3 md:grid-cols-3">
                                        <div className="space-y-1"><Label className="text-xs">English</Label><Input value={trans.EN} onChange={(e) => handleContentChange(["translations", key, "EN"], e.target.value)} /></div>
                                        <div className="space-y-1"><Label className="text-xs">Español</Label><Input value={trans.ES} onChange={(e) => handleContentChange(["translations", key, "ES"], e.target.value)} /></div>
                                        <div className="space-y-1"><Label className="text-xs">Português</Label><Input value={trans.PT} onChange={(e) => handleContentChange(["translations", key, "PT"], e.target.value)} /></div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* CV Manager */}
                {currentSection === "cv" && <CVManager />}

            </div>
        </div>
    );
}

function CVManager() {
    const [uploading, setUploading] = useState(false);

    // Updated list with Mini CVs in other languages
    const cvFiles = [
        { name: "English CV", filename: "Franzetti-CV-English.pdf", lang: "EN" },
        { name: "English Mini CV", filename: "cv-english-mini.pdf", lang: "EN (Mini)" },
        { name: "Spanish CV", filename: "Franzetti-CV-Spanish.pdf", lang: "ES" },
        { name: "Spanish Mini CV", filename: "cv-spanish-mini.pdf", lang: "ES (Mini)" },
        { name: "Portuguese CV", filename: "Franzetti-CV-Portuguese.pdf", lang: "PT" },
        { name: "Portuguese Mini CV", filename: "cv-portuguese-mini.pdf", lang: "PT (Mini)" },
    ];

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetFilename: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Invalid file type", { description: "Please upload a PDF file." });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", targetFilename); // Force filename

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
