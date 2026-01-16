import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useLocation } from "wouter";

// Searchable content index - all website content organized by page and section
const searchableContent = [
  // PROFILE PAGE - About Section
  { title: "About - International Arbitrator", page: "/", section: "about", keywords: "arbitrator counsel disputes cross-border 25-year career commercial investor-state arbitration" },
  { title: "About - Energy & Infrastructure", page: "/", section: "about", keywords: "energy infrastructure North America Latin America Lusophone jurisdictions" },
  { title: "About - Arbitrator Experience", page: "/", section: "about", keywords: "arbitrator U.S. international disputes chair arbitral tribunals ICC AAA ICDR LCIA ICSID UNCITRAL" },
  { title: "About - Counsel Services", page: "/", section: "about", keywords: "counsel dispute prevention risk assessment investment treaty post-award enforcement" },
  
  // PROFILE PAGE - Professional Background
  { title: "Franzetti Arbitration - Founder", page: "/", section: "professional-background", keywords: "Franzetti Arbitration Washington DC Founder Principal 2026" },
  { title: "King & Spalding LLP - Partner", page: "/", section: "professional-background", keywords: "King Spalding Partner Washington DC Miami 2021 2026" },
  { title: "Dechert LLP - Partner/Counsel", page: "/", section: "professional-background", keywords: "Dechert Partner Counsel Washington DC 2015 2021" },
  { title: "Weil, Gotshal & Manges LLP - Associate", page: "/", section: "professional-background", keywords: "Weil Gotshal Manges Associate Washington DC 2012 2015" },
  { title: "Crowell & Moring LLP - Associate", page: "/", section: "professional-background", keywords: "Crowell Moring Associate Washington DC 2008 2012" },
  { title: "Wald & Advogados Associados - Associate", page: "/", section: "professional-background", keywords: "Wald Advogados Associate São Paulo Brazil 2001 2006" },
  { title: "Dinamarco & Rossi Advocacia - Associate", page: "/", section: "professional-background", keywords: "Dinamarco Rossi Advocacia Associate Intern São Paulo Brazil 1997 2001" },
  
  // PROFILE PAGE - Education
  { title: "Georgetown University Law Center - LL.M.", page: "/", section: "education", keywords: "Georgetown University Law Center LLM High Honors Dean's List 2008" },
  { title: "Getúlio Vargas Foundation - Postgraduate", page: "/", section: "education", keywords: "Getúlio Vargas Foundation FGV Business Economic Law 2006" },
  { title: "University of São Paulo - LL.B.", page: "/", section: "education", keywords: "University São Paulo USP Law School LLB 2000" },
  
  // PROFILE PAGE - Academia
  { title: "University of Miami - Professor", page: "/", section: "academia", keywords: "University Miami Adjunct Professor International Arbitration Energy Sector 2024 2025" },
  { title: "Georgetown University - Professor", page: "/", section: "academia", keywords: "Georgetown University Law Center Adjunct Professor Investor-State Dispute Resolution 2017 2022" },
  
  // PROFILE PAGE - Bar Admissions
  { title: "Bar Admission - District of Columbia", page: "/", section: "bar-admissions", keywords: "District Columbia DC Bar admission" },
  { title: "Bar Admission - New York", page: "/", section: "bar-admissions", keywords: "New York NY Bar admission" },
  { title: "Bar Admission - Brazil", page: "/", section: "bar-admissions", keywords: "Brazil OAB Bar admission" },
  
  // PROFILE PAGE - Languages
  { title: "Languages", page: "/", section: "languages", keywords: "English Spanish Portuguese languages fluent" },
  
  // PROFILE PAGE - Professional Associations
  { title: "ICDR Panel of Arbitrators", page: "/", section: "professional-associations", keywords: "ICDR International Centre Dispute Resolution Panel Arbitrators" },
  { title: "AAA Panel of Arbitrators", page: "/", section: "professional-associations", keywords: "AAA American Arbitration Association Panel Arbitrators" },
  { title: "HKIAC Panel of Arbitrators", page: "/", section: "professional-associations", keywords: "HKIAC Hong Kong International Arbitration Centre Panel Arbitrators" },
  { title: "CAM-CCBC Panel of Arbitrators", page: "/", section: "professional-associations", keywords: "CAM CCBC Brazil Canada Chamber Commerce Panel Arbitrators" },
  { title: "ICC Brazil - Arbitration Committee", page: "/", section: "professional-associations", keywords: "ICC International Court Commerce Brazil Arbitration Mediation Committee" },
  { title: "IBA - Dispute Resolution Section", page: "/", section: "professional-associations", keywords: "IBA International Bar Association Dispute Resolution Section" },
  { title: "Arbitral Women", page: "/", section: "professional-associations", keywords: "Arbitral Women" },
  { title: "CBAR - Brazilian Arbitration Committee", page: "/", section: "professional-associations", keywords: "CBAR Brazilian Arbitration Committee" },
  { title: "MIAS - Miami International Arbitration Society", page: "/", section: "professional-associations", keywords: "MIAS Miami International Arbitration Society" },
  
  // EXPERIENCE PAGE - Commercial Contracts
  { title: "Commercial Contracts - As Arbitrator", page: "/cases", section: "commercial", keywords: "commercial contracts arbitrator ICDR AAA distribution agreement sales supply" },
  { title: "Commercial Contracts - As Counsel", page: "/cases", section: "commercial", keywords: "commercial contracts counsel represented advised distribution services agreement" },
  
  // EXPERIENCE PAGE - Construction & Infrastructure
  { title: "Construction & Infrastructure - As Arbitrator", page: "/cases", section: "construction", keywords: "construction infrastructure arbitrator concession highway project Latin America" },
  { title: "Construction & Infrastructure - As Counsel", page: "/cases", section: "construction", keywords: "construction infrastructure counsel oil platform Nigeria indemnity agreement" },
  
  // EXPERIENCE PAGE - Deal Structure & Governance
  { title: "Deal Structure & Governance - As Arbitrator", page: "/cases", section: "deal-structure", keywords: "deal structure governance arbitrator shareholder dispute oil gas corporation" },
  { title: "Deal Structure & Governance - As Counsel", page: "/cases", section: "deal-structure", keywords: "deal structure governance counsel M&A shareholder joint venture ICANN domain" },
  { title: "MOL v. Croatia - Shareholder Dispute", page: "/cases", section: "deal-structure", keywords: "MOL Croatia PCA shareholder rights corporate governance gas corruption" },
  { title: "Amazon.com v. ICANN", page: "/cases", section: "deal-structure", keywords: "Amazon ICANN ICDR domain governance accountability" },
  
  // EXPERIENCE PAGE - Energy & Natural Resources
  { title: "Energy & Natural Resources - As Counsel", page: "/cases", section: "energy", keywords: "energy natural resources oil gas mining LCIA ICC services agreement" },
  { title: "Shell BG Bolivia - Investment Dispute", page: "/cases", section: "energy", keywords: "Shell BG Bolivia UK BIT hydrocarbons regulatory" },
  { title: "Gasoducto Sur Peruano v. Peru", page: "/cases", section: "energy", keywords: "Gasoducto Sur Peruano Peru ICSID gas pipeline Odebrecht corruption" },
  { title: "MOL v. Croatia - Energy Charter Treaty", page: "/cases", section: "energy", keywords: "MOL Croatia ICSID Energy Charter Treaty privatization oil gas bribery" },
  { title: "Pluspetrol v. Perúpetro", page: "/cases", section: "energy", keywords: "Pluspetrol Perúpetro ICSID gas supply royalty LNG" },
  { title: "Pac Rim v. El Salvador - Mining", page: "/cases", section: "energy", keywords: "Pac Rim El Salvador ICSID CAFTA mining exploitation licenses" },
  
  // EXPERIENCE PAGE - Investor-State Disputes
  { title: "Investor-State Disputes - As Counsel", page: "/cases", section: "investor-state", keywords: "investor-state disputes ICSID BIT treaty arbitration" },
  { title: "Quanta Services v. Peru", page: "/cases", section: "investor-state", keywords: "Quanta Services Peru ICSID US Peru TPA electric transmission" },
  { title: "Redes Andinas v. Peru", page: "/cases", section: "investor-state", keywords: "Redes Andinas Peru ICSID electric transmission" },
  { title: "Albania - American Landowner", page: "/cases", section: "investor-state", keywords: "Albania American landowner property rights expropriation" },
  
  // EXPERIENCE PAGE - Recognition & Enforcement
  { title: "Recognition & Enforcement of Awards", page: "/cases", section: "recognition", keywords: "recognition enforcement arbitral awards New York Convention" },
  
  // EXPERIENCE PAGE - Risk Analysis
  { title: "Risk Analysis & Case Assessment", page: "/cases", section: "risk", keywords: "risk analysis case assessment third-party funders investment claims" },
  
  // THOUGHT LEADERSHIP - Recognition
  { title: "Chambers & Partners - Ranked", page: "/thought-leadership", section: "recognition", keywords: "Chambers Partners USA Brazil International Arbitration Band ranked" },
  { title: "The Legal 500 - Ranked", page: "/thought-leadership", section: "recognition", keywords: "Legal 500 USA Latin America International Arbitration" },
  { title: "Lexology Who's Who Legal", page: "/thought-leadership", section: "recognition", keywords: "Lexology Who's Who Legal International Arbitration" },
  { title: "Latin Lawyer - LACCA Approved", page: "/thought-leadership", section: "recognition", keywords: "Latin Lawyer LACCA Approved International Arbitration" },
  { title: "Latinvex - Top 100 Female Lawyers", page: "/thought-leadership", section: "recognition", keywords: "Latinvex Latin America Top 100 Female Lawyers 2024" },
  { title: "Best Lawyers - International Arbitration", page: "/thought-leadership", section: "recognition", keywords: "Best Lawyers America International Arbitration Commercial 2026" },
  { title: "Lawdragon 500 - Global Litigators", page: "/thought-leadership", section: "recognition", keywords: "Lawdragon 500 Leading Global Litigators 2024" },
  
  // THOUGHT LEADERSHIP - Speaking Engagements
  { title: "Corruption in Arbitration - HardTalk Miami", page: "/thought-leadership", section: "speaking", keywords: "Corruption Arbitration Fraud Bribery Latin America HardTalk Miami 2025" },
  { title: "Energy Infrastructure Disputes - AIEN/ICC", page: "/thought-leadership", section: "speaking", keywords: "Energy Infrastructure Disputes AIEN ICC Rio de Janeiro 2025" },
  { title: "Parallel Arbitration Criminal Proceedings", page: "/thought-leadership", section: "speaking", keywords: "Parallel Arbitration Criminal Proceedings Corruption Sovereign States Washington 2025" },
  { title: "International Construction Arbitration", page: "/thought-leadership", section: "speaking", keywords: "International Construction Arbitration Infrastructure Sovereigns iLaw 2025" },
  { title: "Oil & Gas Industry Disputes", page: "/thought-leadership", section: "speaking", keywords: "Oil Gas Industry Disputes HardTalk Miami 2024" },
  { title: "Future of International Arbitration - Georgetown", page: "/thought-leadership", section: "speaking", keywords: "Future International Arbitration Georgetown University 2024" },
  { title: "Virtual Hearings in Arbitration", page: "/thought-leadership", section: "speaking", keywords: "Virtual Hearings International Arbitration Vancouver 2020" },
  { title: "Force Majeure Legal Positions", page: "/thought-leadership", section: "speaking", keywords: "Force Majeure Legal Positions Disputes Nairobi 2020" },
  { title: "Investor-State Treaty Reform", page: "/thought-leadership", section: "speaking", keywords: "Investor-State Disputes Treaty Reform Who's Who Legal 2019" },
  { title: "Cybersecurity Data Protection Arbitration", page: "/thought-leadership", section: "speaking", keywords: "Arbitration Cybersecurity Data Protection CAM-CCBC 2019" },
  
  // THOUGHT LEADERSHIP - Publications
  { title: "Publication - Arbitration in the Energy Sector", page: "/thought-leadership", section: "publications", keywords: "Arbitration Energy Sector publication" },
  { title: "Publication - Investment Treaty Arbitration", page: "/thought-leadership", section: "publications", keywords: "Investment Treaty Arbitration publication" },
  { title: "Publication - Corruption in Arbitration", page: "/thought-leadership", section: "publications", keywords: "Corruption International Arbitration publication" },
  
  // THOUGHT LEADERSHIP - Academic Experience
  { title: "Academic - University of Miami", page: "/thought-leadership", section: "academic", keywords: "University Miami Professor International Arbitration Energy Sector" },
  { title: "Academic - Georgetown University", page: "/thought-leadership", section: "academic", keywords: "Georgetown University Professor Investor-State Dispute Resolution" },
];

interface SearchResult {
  title: string;
  page: string;
  section: string;
}

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setQuery("");
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Live search function
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ").filter(term => term.length > 1);
    
    const matchedResults = searchableContent.filter(item => {
      const searchText = `${item.title} ${item.keywords}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });

    // Remove duplicates and limit results
    const uniqueResults = matchedResults.reduce((acc: SearchResult[], curr) => {
      if (!acc.find(r => r.title === curr.title)) {
        acc.push({ title: curr.title, page: curr.page, section: curr.section });
      }
      return acc;
    }, []);

    setResults(uniqueResults.slice(0, 8));
  }, [query]);

  // Handle result click - navigate and scroll to section
  const handleResultClick = (result: SearchResult) => {
    setIsExpanded(false);
    setQuery("");
    setResults([]);
    
    // Navigate to the page
    setLocation(result.page);
    
    // Scroll to section after navigation
    setTimeout(() => {
      const element = document.getElementById(result.section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setQuery("");
      setResults([]);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className={`flex items-center transition-all duration-300 ${isExpanded ? "bg-gray-100 rounded-full" : ""}`}>
        {/* Search Input - visible when expanded */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "w-48 lg:w-64 px-4" : "w-0"}`}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent py-2 text-sm text-charcoal outline-none placeholder-gray-500"
          />
        </div>
        
        {/* Search/Close Icon Button */}
        <button
          onClick={handleToggle}
          className={`p-2 transition-colors ${isExpanded ? "text-charcoal hover:text-aquamarine" : "text-charcoal hover:text-aquamarine"}`}
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          {isExpanded ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Dropdown Results */}
      {isExpanded && results.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-72 lg:w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(result)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <p className="text-sm font-medium text-charcoal">{result.title}</p>
              <p className="text-xs text-gray-500 mt-1 capitalize">
                {result.page === "/" ? "Profile" : result.page === "/cases" ? "Experience" : "Thought Leadership"} 
                {" → "} 
                {result.section.replace(/-/g, " ")}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isExpanded && query.length >= 2 && results.length === 0 && (
        <div className="absolute right-0 top-full mt-2 w-72 lg:w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <p className="text-sm text-gray-500 text-center">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
