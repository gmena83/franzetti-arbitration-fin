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
        { value: "cases", label: "Cases (Arbitrator/Counsel)" },
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
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold">Intro Paragraph (p1)</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2"><Label>English</Label><Textarea value={content.content.about.p1.EN} onChange={(e) => handleContentChange(["content", "about", "p1", "EN"], e.target.value)} className="min-h-[100px]" /></div>
                                        <div className="space-y-2"><Label>Español</Label><Textarea value={content.content.about.p1.ES} onChange={(e) => handleContentChange(["content", "about", "p1", "ES"], e.target.value)} className="min-h-[100px]" /></div>
                                        <div className="space-y-2"><Label>Português</Label><Textarea value={content.content.about.p1.PT} onChange={(e) => handleContentChange(["content", "about", "p1", "PT"], e.target.value)} className="min-h-[100px]" /></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold">Quote 1 (The Legal 500)</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2"><Label>English</Label><Textarea value={content.content.about.quote1.EN} onChange={(e) => handleContentChange(["content", "about", "quote1", "EN"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Español</Label><Textarea value={content.content.about.quote1.ES} onChange={(e) => handleContentChange(["content", "about", "quote1", "ES"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Português</Label><Textarea value={content.content.about.quote1.PT} onChange={(e) => handleContentChange(["content", "about", "quote1", "PT"], e.target.value)} /></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold">Arbitrator Experience (p2)</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2"><Label>English</Label><Textarea value={content.content.about.p2.EN} onChange={(e) => handleContentChange(["content", "about", "p2", "EN"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Español</Label><Textarea value={content.content.about.p2.ES} onChange={(e) => handleContentChange(["content", "about", "p2", "ES"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Português</Label><Textarea value={content.content.about.p2.PT} onChange={(e) => handleContentChange(["content", "about", "p2", "PT"], e.target.value)} /></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-medium">Arbitrator Services List</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2"><Label>English</Label><Textarea value={(content.content.about.serviceList1.EN || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "serviceList1", "EN"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                        <div className="space-y-2"><Label>Español</Label><Textarea value={(content.content.about.serviceList1.ES || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "serviceList1", "ES"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                        <div className="space-y-2"><Label>Português</Label><Textarea value={(content.content.about.serviceList1.PT || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "serviceList1", "PT"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold">Counsel Services (p3 & List)</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2"><Label>EN Header</Label><Input value={content.content.about.p3.EN} onChange={(e) => handleContentChange(["content", "about", "p3", "EN"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>ES Header</Label><Input value={content.content.about.p3.ES} onChange={(e) => handleContentChange(["content", "about", "p3", "ES"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>PT Header</Label><Input value={content.content.about.p3.PT} onChange={(e) => handleContentChange(["content", "about", "p3", "PT"], e.target.value)} /></div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3 border-t pt-4">
                                        <div className="space-y-2"><Label>EN List</Label><Textarea value={(content.content.about.serviceList2.EN || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "serviceList2", "EN"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                        <div className="space-y-2"><Label>ES List</Label><Textarea value={(content.content.about.serviceList2.ES || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "serviceList2", "ES"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                        <div className="space-y-2"><Label>PT List</Label><Textarea value={(content.content.about.serviceList2.PT || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "serviceList2", "PT"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold">Jurisdictions & Sectors (p4 & List)</Label>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2"><Label>EN Summary</Label><Textarea value={content.content.about.p4.EN} onChange={(e) => handleContentChange(["content", "about", "p4", "EN"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>ES Summary</Label><Textarea value={content.content.about.p4.ES} onChange={(e) => handleContentChange(["content", "about", "p4", "ES"], e.target.value)} /></div>
                                        <div className="space-y-2"><Label>PT Summary</Label><Textarea value={content.content.about.p4.PT} onChange={(e) => handleContentChange(["content", "about", "p4", "PT"], e.target.value)} /></div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3 border-t pt-4">
                                        <div className="space-y-2"><Label>EN Sectors</Label><Textarea value={(content.content.about.sectorList.EN || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "sectorList", "EN"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                        <div className="space-y-2"><Label>ES Sectors</Label><Textarea value={(content.content.about.sectorList.ES || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "sectorList", "ES"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                        <div className="space-y-2"><Label>PT Sectors</Label><Textarea value={(content.content.about.sectorList.PT || []).join("\n")} onChange={(e) => handleListChange(["content", "about", "sectorList", "PT"], e.target.value.split("\n").filter(l => l.trim() !== ""))} className="min-h-[120px] font-mono text-sm" /></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-6">
                                    <Label className="text-lg font-semibold">Final Paragraphs (p5, p6, p7)</Label>
                                    <div className="space-y-4 border-l-4 border-charcoal/20 pl-4">
                                        <Label className="text-sm text-gray-500 uppercase tracking-wider">Recognition (p5)</Label>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2"><Label>EN</Label><Textarea value={content.content.about.p5.EN} onChange={(e) => handleContentChange(["content", "about", "p5", "EN"], e.target.value)} /></div>
                                            <div className="space-y-2"><Label>ES</Label><Textarea value={content.content.about.p5.ES} onChange={(e) => handleContentChange(["content", "about", "p5", "ES"], e.target.value)} /></div>
                                            <div className="space-y-2"><Label>PT</Label><Textarea value={content.content.about.p5.PT} onChange={(e) => handleContentChange(["content", "about", "p5", "PT"], e.target.value)} /></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 border-l-4 border-charcoal/20 pl-4">
                                        <Label className="text-sm text-gray-500 uppercase tracking-wider">Academic/Speaking (p6)</Label>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2"><Label>EN</Label><Textarea value={content.content.about.p6.EN} onChange={(e) => handleContentChange(["content", "about", "p6", "EN"], e.target.value)} /></div>
                                            <div className="space-y-2"><Label>ES</Label><Textarea value={content.content.about.p6.ES} onChange={(e) => handleContentChange(["content", "about", "p6", "ES"], e.target.value)} /></div>
                                            <div className="space-y-2"><Label>PT</Label><Textarea value={content.content.about.p6.PT} onChange={(e) => handleContentChange(["content", "about", "p6", "PT"], e.target.value)} /></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 border-l-4 border-charcoal/20 pl-4">
                                        <Label className="text-sm text-gray-500 uppercase tracking-wider">Experience Summary (p7)</Label>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2"><Label>EN</Label><Textarea value={content.content.about.p7.EN} onChange={(e) => handleContentChange(["content", "about", "p7", "EN"], e.target.value)} /></div>
                                            <div className="space-y-2"><Label>ES</Label><Textarea value={content.content.about.p7.ES} onChange={(e) => handleContentChange(["content", "about", "p7", "ES"], e.target.value)} /></div>
                                            <div className="space-y-2"><Label>PT</Label><Textarea value={content.content.about.p7.PT} onChange={(e) => handleContentChange(["content", "about", "p7", "PT"], e.target.value)} /></div>
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
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Title/Firm</Label><Input value={item.title} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "title", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Period</Label><Input value={item.period} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "period", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Role (EN)</Label><Input value={item.role} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "role", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Role (ES)</Label><Input value={item.roleES || ""} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "roleES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Role (PT)</Label><Input value={item.rolePT || ""} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "rolePT", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Location (EN)</Label><Input value={item.location} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "location", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Location (ES)</Label><Input value={item.locationES || ""} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "locationES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Location (PT)</Label><Input value={item.locationPT || ""} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "locationPT", e.target.value)} /></div>
                                        </div>
                                        <div className="space-y-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "professionalBackground"], index, "url", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card>
                            <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.education.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Institution (EN)</Label><Input value={item.institution} onChange={(e) => handleArrayItemChange(["content", "education"], index, "institution", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Institution (PT/ES if diff)</Label><Input value={item.institutionPT || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "institutionPT", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Year</Label><Input value={item.year} onChange={(e) => handleArrayItemChange(["content", "education"], index, "year", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Degree (EN)</Label><Input value={item.degree} onChange={(e) => handleArrayItemChange(["content", "education"], index, "degree", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Degree (ES)</Label><Input value={item.degreeES || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "degreeES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Degree (PT)</Label><Input value={item.degreePT || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "degreePT", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Note (EN)</Label><Input value={item.note || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "note", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Note (ES)</Label><Input value={item.noteES || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "noteES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Note (PT)</Label><Input value={item.notePT || ""} onChange={(e) => handleArrayItemChange(["content", "education"], index, "notePT", e.target.value)} /></div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Professional Associations */}
                        <Card>
                            <CardHeader><CardTitle>Professional Associations</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.professionalAssociations.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Name (EN)</Label><Input value={item.name} onChange={(e) => handleArrayItemChange(["content", "professionalAssociations"], index, "name", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Name (ES)</Label><Input value={item.nameES || ""} onChange={(e) => handleArrayItemChange(["content", "professionalAssociations"], index, "nameES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Name (PT)</Label><Input value={item.namePT || ""} onChange={(e) => handleArrayItemChange(["content", "professionalAssociations"], index, "namePT", e.target.value)} /></div>
                                        </div>
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
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Name (EN)</Label><Input value={item.name} onChange={(e) => handleArrayItemChange(["content", "barAdmissions"], index, "name", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Name (ES)</Label><Input value={item.nameES || ""} onChange={(e) => handleArrayItemChange(["content", "barAdmissions"], index, "nameES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Name (PT)</Label><Input value={item.namePT || ""} onChange={(e) => handleArrayItemChange(["content", "barAdmissions"], index, "namePT", e.target.value)} /></div>
                                        </div>
                                        <div className="space-y-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "barAdmissions"], index, "url", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Thought Leadership */}
                {currentSection === "thoughtLeadership" && (
                    <div className="space-y-8">
                        {/* Academia / Teaching */}
                        <Card>
                            <CardHeader><CardTitle>Teaching Experience</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.teachingExperience.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Institution</Label><Input value={item.institution} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "institution", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Period</Label><Input value={item.period} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "period", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Role (EN)</Label><Input value={item.role} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "role", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Role (ES)</Label><Input value={item.roleES || ""} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "roleES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Role (PT)</Label><Input value={item.rolePT || ""} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "rolePT", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Course (EN)</Label><Input value={item.course} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "course", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Course (ES)</Label><Input value={item.courseES || ""} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "courseES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Course (PT)</Label><Input value={item.coursePT || ""} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "coursePT", e.target.value)} /></div>
                                        </div>
                                        <div className="space-y-2"><Label>URL</Label><Input value={item.url} onChange={(e) => handleArrayItemChange(["content", "teachingExperience"], index, "url", e.target.value)} /></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recognitions */}
                        <Card>
                            <CardHeader><CardTitle>Recognitions</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.thoughtLeadership.recognitions.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2 md:col-span-2"><Label>Name</Label><Input value={item.name} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "recognitions"], index, "name", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Year</Label><Input value={item.year} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "recognitions"], index, "year", e.target.value)} /></div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2"><Label>Details (EN)</Label><Input value={item.details} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "recognitions"], index, "details", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Details (ES)</Label><Input value={item.detailsES || ""} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "recognitions"], index, "detailsES", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Details (PT)</Label><Input value={item.detailsPT || ""} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "recognitions"], index, "detailsPT", e.target.value)} /></div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Speaking */}
                        <Card>
                            <CardHeader><CardTitle>Speaking Engagements</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.thoughtLeadership.speakingEngagements.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-4">
                                            <Label className="font-semibold">Title</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2"><Label>EN</Label><Textarea value={item.title.EN} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "speakingEngagements"], index, "title", { ...item.title, EN: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>ES</Label><Textarea value={item.title.ES} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "speakingEngagements"], index, "title", { ...item.title, ES: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>PT</Label><Textarea value={item.title.PT} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "speakingEngagements"], index, "title", { ...item.title, PT: e.target.value })} /></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="font-semibold">Event / Location</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2"><Label>EN</Label><Input value={item.event.EN} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "speakingEngagements"], index, "event", { ...item.event, EN: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>ES</Label><Input value={item.event.ES} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "speakingEngagements"], index, "event", { ...item.event, ES: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>PT</Label><Input value={item.event.PT} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "speakingEngagements"], index, "event", { ...item.event, PT: e.target.value })} /></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Publications */}
                        <Card>
                            <CardHeader><CardTitle>Publications</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.thoughtLeadership.publications.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-4">
                                            <Label className="font-semibold">Title</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2"><Label>EN</Label><Textarea value={item.title.EN} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "publications"], index, "title", { ...item.title, EN: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>ES</Label><Textarea value={item.title.ES} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "publications"], index, "title", { ...item.title, ES: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>PT</Label><Textarea value={item.title.PT} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "publications"], index, "title", { ...item.title, PT: e.target.value })} /></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="font-semibold">Publication Details</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2"><Label>EN</Label><Input value={item.publication.EN} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "publications"], index, "publication", { ...item.publication, EN: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>ES</Label><Input value={item.publication.ES} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "publications"], index, "publication", { ...item.publication, ES: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>PT</Label><Input value={item.publication.PT} onChange={(e) => handleArrayItemChange(["content", "thoughtLeadership", "publications"], index, "publication", { ...item.publication, PT: e.target.value })} /></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Cases Section */}
                {currentSection === "cases" && (
                    <div className="space-y-8">
                        {/* Arbitrator Appointments */}
                        <Card>
                            <CardHeader><CardTitle>Arbitrator Appointments</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.cases.arbitratorAppointments.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-4">
                                            <Label className="font-semibold">Description</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2"><Label>EN</Label><Textarea value={item.text.EN} onChange={(e) => handleArrayItemChange(["content", "cases", "arbitratorAppointments"], index, "text", { ...item.text, EN: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>ES</Label><Textarea value={item.text.ES} onChange={(e) => handleArrayItemChange(["content", "cases", "arbitratorAppointments"], index, "text", { ...item.text, ES: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>PT</Label><Textarea value={item.text.PT} onChange={(e) => handleArrayItemChange(["content", "cases", "arbitratorAppointments"], index, "text", { ...item.text, PT: e.target.value })} /></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Categories (One per line)</Label>
                                            <Textarea
                                                value={(item.categories || []).join("\n")}
                                                onChange={(e) => handleArrayItemChange(["content", "cases", "arbitratorAppointments"], index, "categories", e.target.value.split("\n").filter(l => l.trim() !== ""))}
                                                className="min-h-[80px] font-mono text-xs"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Matters as Counsel */}
                        <Card>
                            <CardHeader><CardTitle>Matters as Counsel</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {content.content.cases.mattersAsCounsel.map((item, index) => (
                                    <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <div className="space-y-4">
                                            <Label className="font-semibold">Description</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2"><Label>EN</Label><Textarea value={item.text.EN} onChange={(e) => handleArrayItemChange(["content", "cases", "mattersAsCounsel"], index, "text", { ...item.text, EN: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>ES</Label><Textarea value={item.text.ES} onChange={(e) => handleArrayItemChange(["content", "cases", "mattersAsCounsel"], index, "text", { ...item.text, ES: e.target.value })} /></div>
                                                <div className="space-y-2"><Label>PT</Label><Textarea value={item.text.PT} onChange={(e) => handleArrayItemChange(["content", "cases", "mattersAsCounsel"], index, "text", { ...item.text, PT: e.target.value })} /></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Categories (One per line)</Label>
                                            <Textarea
                                                value={(item.categories || []).join("\n")}
                                                onChange={(e) => handleArrayItemChange(["content", "cases", "mattersAsCounsel"], index, "categories", e.target.value.split("\n").filter(l => l.trim() !== ""))}
                                                className="min-h-[80px] font-mono text-xs"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
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

                {/* Translations & UI Section */}
                {currentSection === "translations" && (
                    <Card>
                        <CardHeader><CardTitle>UI Translations</CardTitle><CardDescription>Edit buttons, labels, and navigation text.</CardDescription></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-4 gap-4 font-bold border-b pb-2">
                                <div>Label / Key</div>
                                <div>English</div>
                                <div>Español</div>
                                <div>Português</div>
                            </div>
                            {Object.entries(content.translations).map(([key, langs]: [string, any]) => (
                                <div key={key} className="grid md:grid-cols-4 gap-4 items-center py-2 border-b last:border-0">
                                    <div className="font-mono text-xs text-gray-500">{key}</div>
                                    <div><Input value={langs.EN || ""} onChange={(e) => handleContentChange(["translations", key, "EN"], e.target.value)} /></div>
                                    <div><Input value={langs.ES || ""} onChange={(e) => handleContentChange(["translations", key, "ES"], e.target.value)} /></div>
                                    <div><Input value={langs.PT || ""} onChange={(e) => handleContentChange(["translations", key, "PT"], e.target.value)} /></div>
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
        { name: "English Mini CV", filename: "Franzetti-Mini-CV-English.pdf", lang: "EN (Mini)" },
        { name: "Spanish CV", filename: "Franzetti-CV-Spanish.pdf", lang: "ES" },
        { name: "Spanish Mini CV", filename: "Franzetti-Mini-CV-Spanish.pdf", lang: "ES (Mini)" },
        { name: "Portuguese CV", filename: "Franzetti-CV-Portuguese.pdf", lang: "PT" },
        { name: "Portuguese Mini CV", filename: "Franzetti-Mini-CV-Portuguese.pdf", lang: "PT (Mini)" },
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
                                <Button asChild variant="ghost" size="icon" title={`View current ${file.name}`}>
                                    <a href={`/cv/${file.filename}`} target="_blank" rel="noopener noreferrer">
                                        <FileText className="h-4 w-4" />
                                        <span className="sr-only">View current {file.name}</span>
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
