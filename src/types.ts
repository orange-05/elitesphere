export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Business Growth" | "Digital Marketing" | "Branding" | "Entrepreneurship" | "Educational Institutions";
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  subServices: string[];
  fullDetails: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  details: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  serviceInterestedIn: string;
  message: string;
  timestamp: string;
  status: "Pending" | "In Contact" | "Resolved";
}

export interface ClientDocument {
  id: string;
  name: string;
  uploadedBy: "Client" | "Elitesphere";
  uploadedAt: string;
  size: string;
  downloadUrl?: string; // Simulated download
  type: "PDF" | "DOCX" | "XLSX" | "Design" | "Other";
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  status: "Completed" | "In_Progress" | "Not_Started";
  progress: number; // percentage
}

export interface ProjectTask {
  id: string;
  title: string;
  status: "Todo" | "In_Progress" | "Done";
  assignedTo: string;
  dueDate: string;
}

export interface ClientProjectState {
  id: string;
  projectName: string;
  clientName: string;
  advisorName: string;
  overallProgress: number;
  startDate: string;
  nextMeeting: string;
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
  documents: ClientDocument[];
}
