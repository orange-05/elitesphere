import { ClientProjectState, ContactInquiry, ClientDocument } from "../types";
import { submitInquiryRemote, subscribeNewsletterRemote } from "./supabase";

// Safe localStorage wrapper to prevent crashes in sandboxed iFrames
const isStorageAvailable = () => {
  try {
    const key = "__storage_test__";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const storageCache: Record<string, string> = {};

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (isStorageAvailable()) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      // Ignored
    }
    return storageCache[key] || null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (isStorageAvailable()) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      // Ignored
    }
    storageCache[key] = value;
  },
  removeItem: (key: string): void => {
    try {
      if (isStorageAvailable()) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      // Ignored
    }
    delete storageCache[key];
  }
};

const KEY_PROJECT_STATE = "elitesphere_project_state";
const KEY_INQUIRIES = "elitesphere_contact_inquiries";
const KEY_NEWSLETTER = "elitesphere_newsletter_emails";

const INITIAL_PROJECT_STATE: ClientProjectState = {
  id: "proj-101",
  projectName: "Apex Educational Group - Growth Re-Engineering",
  clientName: "Apex International School Circle",
  advisorName: "Ashish Janapareddi",
  overallProgress: 68,
  startDate: "May 10, 2026",
  nextMeeting: "June 25, 2026 at 10:00 AM (Strategic Review)",
  milestones: [
    { id: "m-1", title: "Institutional Identity Audit & Stakeholder Surveys", dueDate: "May 20, 2026", status: "Completed", progress: 100 },
    { id: "m-2", title: "Visual Re-Branding Style Guides & Logo Finalization", dueDate: "June 05, 2026", status: "Completed", progress: 100 },
    { id: "m-3", title: "Custom Admissions Pipeline & CRM Integration Setup", dueDate: "June 30, 2026", status: "In_Progress", progress: 75 },
    { id: "m-4", title: "Localized SEO Content Funnel Launch (Topic Clusters)", dueDate: "July 15, 2026", status: "Not_Started", progress: 0 },
    { id: "m-5", title: "Interactive Virtual Tour Platform & Campaign Go-Live", dueDate: "August 01, 2026", status: "Not_Started", progress: 0 }
  ],
  tasks: [
    { id: "t-1", title: "Approve newly proposed gold-accented color palette guidelines", status: "Done", assignedTo: "Client Team", dueDate: "June 03, 2026" },
    { id: "t-2", title: "Configure Domain Name Records (DNS) for high-speed admissions portal", status: "In_Progress", assignedTo: "Elitesphere Team", dueDate: "June 26, 2026" },
    { id: "t-3", title: "Provide enrollment registry data for CRM matching", status: "Todo", assignedTo: "Client Team", dueDate: "June 28, 2026" },
    { id: "t-4", title: "Draft copy audits for core subject landing pages", status: "Done", assignedTo: "Elitesphere Team", dueDate: "June 12, 2026" },
    { id: "t-5", title: "Finalize Google Ad campaign budgets for Q3 academic terms", status: "In_Progress", assignedTo: "Client Team", dueDate: "June 24, 2026" }
  ],
  documents: [
    { id: "doc-1", name: "Elitesphere_Strategic_Brand_Framework_V2.pdf", uploadedBy: "Elitesphere", uploadedAt: "June 08, 2026 14:30", size: "4.2 MB", type: "PDF" },
    { id: "doc-2", name: "Apex_Competitor_Analysis_Spreadsheet.xlsx", uploadedBy: "Elitesphere", uploadedAt: "May 18, 2026 10:15", size: "1.8 MB", type: "XLSX" },
    { id: "doc-3", name: "Logo_Concept_Previews_High_Res.zip", uploadedBy: "Client", uploadedAt: "June 02, 2026 11:45", size: "8.5 MB", type: "Design" }
  ]
};

const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: "inq-1",
    fullName: "Rohan Singhal",
    companyName: "Zenith Retail Corp",
    emailAddress: "rohan@zenithretail.com",
    phoneNumber: "+91 98765 43210",
    serviceInterestedIn: "Digital Marketing",
    message: "We need a comprehensive visual rebrand and high-speed e-commerce portal to recapture market share in local premium goods. Please share availability next Tuesday.",
    timestamp: "2026-06-22T14:35:00.000Z",
    status: "In Contact"
  },
  {
    id: "inq-2",
    fullName: "Elena Rostova",
    companyName: "St. Jude Academy Circle",
    emailAddress: "e.rostova@stjude.edu",
    phoneNumber: "+1 (555) 234-5678",
    serviceInterestedIn: "Educational Institution Consulting",
    message: "Interested in reverse auditing our Q3 enrolment numbers. We saw outstanding results from your Apex educational case study and are looking to replicate the system.",
    timestamp: "2026-06-23T01:20:00.000Z",
    status: "Pending"
  }
];

export function getProjectState(): ClientProjectState {
  const local = safeStorage.getItem(KEY_PROJECT_STATE);
  if (!local) {
    safeStorage.setItem(KEY_PROJECT_STATE, JSON.stringify(INITIAL_PROJECT_STATE));
    return INITIAL_PROJECT_STATE;
  }
  try {
    const parsed = JSON.parse(local);
    if (!parsed || typeof parsed !== "object") {
      return INITIAL_PROJECT_STATE;
    }
    return {
      ...INITIAL_PROJECT_STATE,
      ...parsed,
      milestones: Array.isArray(parsed.milestones) ? parsed.milestones : INITIAL_PROJECT_STATE.milestones,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : INITIAL_PROJECT_STATE.tasks,
      documents: Array.isArray(parsed.documents) ? parsed.documents : INITIAL_PROJECT_STATE.documents
    };
  } catch (e) {
    return INITIAL_PROJECT_STATE;
  }
}

export function saveProjectState(state: ClientProjectState): void {
  safeStorage.setItem(KEY_PROJECT_STATE, JSON.stringify(state));
}

export function getInquiries(): ContactInquiry[] {
  const local = safeStorage.getItem(KEY_INQUIRIES);
  if (!local) {
    safeStorage.setItem(KEY_INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  }
  try {
    const parsed = JSON.parse(local);
    return Array.isArray(parsed) ? parsed : INITIAL_INQUIRIES;
  } catch (e) {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiries(inquiries: ContactInquiry[]): void {
  safeStorage.setItem(KEY_INQUIRIES, JSON.stringify(inquiries));
}

export async function addInquiry(inquiry: Omit<ContactInquiry, "id" | "timestamp" | "status">): Promise<ContactInquiry> {
  const current = getInquiries();
  const newInq: ContactInquiry = {
    ...inquiry,
    id: "inq-" + Date.now(),
    timestamp: new Date().toISOString(),
    status: "Pending"
  };
  const updated = [newInq, ...current];
  saveInquiries(updated);

  // Fire-and-forget remote persistence (no UI change if it fails).
  void submitInquiryRemote({
    full_name: inquiry.fullName,
    company_name: inquiry.companyName,
    email_address: inquiry.emailAddress,
    phone_number: inquiry.phoneNumber,
    service_interested_in: inquiry.serviceInterestedIn,
    message: inquiry.message,
  });

  return newInq;
}

export function getNewsletterEmails(): string[] {
  const local = safeStorage.getItem(KEY_NEWSLETTER);
  try {
    return local ? JSON.parse(local) : ["newsletter-sub1@example.com"];
  } catch (e) {
    return ["newsletter-sub1@example.com"];
  }
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  const current = getNewsletterEmails();
  if (current.includes(email)) return false;
  current.push(email);
  safeStorage.setItem(KEY_NEWSLETTER, JSON.stringify(current));

  // Fire-and-forget remote persistence.
  void subscribeNewsletterRemote(email);

  return true;
}

