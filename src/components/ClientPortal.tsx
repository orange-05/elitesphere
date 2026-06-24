import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Upload, 
  Download, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash, 
  Folder, 
  LogOut, 
  Calendar, 
  MessageSquare, 
  FileText,
  Eye,
  Check,
  User,
  Activity,
  PlusCircle,
  FileSpreadsheet,
  FileCode,
  FileArchive
} from "lucide-react";
import { 
  getProjectState, 
  saveProjectState, 
  getInquiries, 
  saveInquiries,
  safeStorage
} from "../utils/storage";
import { ClientProjectState, ContactInquiry, ClientDocument, ProjectTask } from "../types";

export default function ClientPortal({ onBookConsultation }: { onBookConsultation: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // App authentication state
  const [user, setUser] = useState<{ email: string; role: "Client" | "Admin"; name: string } | null>(null);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Storage states
  const [project, setProject] = useState<ClientProjectState>(() => getProjectState());
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => getInquiries());
  
  // UI interactive states
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("Client Team");
  const [newDocumentName, setNewDocumentName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [adminNote, setAdminNote] = useState("");

  // Register state (simulated)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerCompany, setRegisterCompany] = useState("");

  // Load from Storage
  useEffect(() => {
    // Check if user session exists in local storage safely
    try {
      const savedSession = safeStorage.getItem("elitesphere_session");
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      }
    } catch (e) {
      // Ignored
    }
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!email || !password) {
      setAuthError("All credentials are required.");
      return;
    }

    const lowerEmail = email.toLowerCase().trim();

    if (lowerEmail === "client@elitesphere.com" && password === "client123") {
      const u = { email: lowerEmail, role: "Client" as const, name: "Apex International Team" };
      setUser(u);
      safeStorage.setItem("elitesphere_session", JSON.stringify(u));
      setAuthSuccess("Login successful as Client.");
    } else if (lowerEmail === "admin@elitesphere.com" && password === "admin123") {
      const u = { email: lowerEmail, role: "Admin" as const, name: "Ashish Janapareddi" };
      setUser(u);
      safeStorage.setItem("elitesphere_session", JSON.stringify(u));
      setAuthSuccess("Welcome back, Managing Director.");
    } else {
      // Create user-defined virtual accounts instantly for custom testing!
      if (password.length >= 4) {
        const u = { 
          email: lowerEmail, 
          role: lowerEmail.includes("staff") || lowerEmail.includes("elitesphere") ? ("Admin" as const) : ("Client" as const), 
          name: lowerEmail.split("@")[0].toUpperCase() + " Group" 
        };
        setUser(u);
        safeStorage.setItem("elitesphere_session", JSON.stringify(u));
        setAuthSuccess(`Virtual account created successfully for custom testing: ${u.role}.`);
      } else {
        setAuthError("Invalid credentials. Try our preconfigured demo accounts, or enter a custom email and password (min 4 characters) to instantly generate a simulated portal.");
      }
    }
  };

  // Register callback
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !registerName || !password) {
      setAuthError("Please fill in all requested fields.");
      return;
    }
    const u = { email: email.toLowerCase().trim(), role: "Client" as const, name: registerName };
    setUser(u);
    safeStorage.setItem("elitesphere_session", JSON.stringify(u));
    setAuthSuccess("Virtual account registered and logged in successfully!");
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    safeStorage.removeItem("elitesphere_session");
    setAuthSuccess("");
    setAuthError("");
    setSelectedInquiry(null);
  };

  // Drag and Drop simulation handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      addNewDocument(file.name, Math.round(file.size / 1024 / 1024 * 10) / 10 + " MB");
    }
  };

  // Add Document
  const addNewDocument = (name: string, sizeStr: string = "1.5 MB") => {
    if (!project) return;
    const fileType = name.toLowerCase().endsWith(".pdf") ? "PDF" :
                     name.toLowerCase().endsWith(".xlsx") || name.toLowerCase().endsWith(".csv") ? "XLSX" :
                     name.toLowerCase().endsWith(".docx") || name.toLowerCase().endsWith(".doc") ? "DOCX" :
                     name.toLowerCase().endsWith(".png") || name.toLowerCase().endsWith(".jpeg") || name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".zip") ? "Design" : "Other";

    const newDoc: ClientDocument = {
      id: "doc-" + Date.now(),
      name: name,
      uploadedBy: user && user.role === "Admin" ? "Elitesphere" : "Client",
      uploadedAt: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: '2-digit' }) + " " + new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false }),
      size: sizeStr,
      type: fileType
    };

    const updatedProject = {
      ...project,
      documents: [newDoc, ...project.documents]
    };

    setProject(updatedProject);
    saveProjectState(updatedProject);
    setNewDocumentName("");
  };

  // Delete Document
  const deleteDocument = (docId: string) => {
    if (!project) return;
    const updatedDocs = project.documents.filter(d => d.id !== docId);
    const updatedProject = {
      ...project,
      documents: updatedDocs
    };
    setProject(updatedProject);
    saveProjectState(updatedProject);
  };

  // Add Project Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !newTaskTitle.trim()) return;

    const newTask: ProjectTask = {
      id: "t-" + Date.now(),
      title: newTaskTitle.trim(),
      status: "Todo",
      assignedTo: newTaskAssignee,
      dueDate: "Flexible Timeline"
    };

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask]
    };

    setProject(updatedProject);
    saveProjectState(updatedProject);
    setNewTaskTitle("");
  };

  // Toggle Task Status
  const toggleTaskStatus = (taskId: string) => {
    if (!project) return;
    const updatedTasks = project.tasks.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === "Done" ? "Todo" : 
                           t.status === "Todo" ? "In_Progress" : "Done";
        return { ...t, status: nextStatus };
      }
      return t;
    });

    const doneCount = updatedTasks.filter(t => t.status === "Done").length;
    const progressPercent = Math.round((doneCount / updatedTasks.length) * 100);

    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      overallProgress: progressPercent
    };

    setProject(updatedProject);
    saveProjectState(updatedProject);
  };

  // Delete Task
  const deleteTask = (taskId: string) => {
    if (!project) return;
    const updatedTasks = project.tasks.filter(t => t.id !== taskId);
    const doneCount = updatedTasks.filter(t => t.status === "Done").length;
    const progressPercent = updatedTasks.length > 0 ? Math.round((doneCount / updatedTasks.length) * 100) : 0;

    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      overallProgress: progressPercent
    };
    setProject(updatedProject);
    saveProjectState(updatedProject);
  };

  // Update Inquiry Status (Admin action)
  const updateInquiryStatus = (inqId: string, status: "Pending" | "In Contact" | "Resolved") => {
    const updated = inquiries.map(inq => {
      if (inq.id === inqId) {
        return { ...inq, status };
      }
      return inq;
    });
    setInquiries(updated);
    saveInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  // Delete Inquiry
  const deleteInquiry = (inqId: string) => {
    const updated = inquiries.filter(inq => inq.id !== inqId);
    setInquiries(updated);
    saveInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry(null);
    }
  };

  // Helper file icons
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-600" />;
      case "XLSX":
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case "DOCX":
        return <FileCode className="w-5 h-5 text-blue-600" />;
      case "Design":
        return <FileArchive className="w-5 h-5 text-amber-500" />;
      default:
        return <Folder className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full relative">
      {!user ? (
        /* ================= AUTHENTICATION VIEW ================= */
        <div className="relative py-8 md:py-12">
          {/* Ambient Glowing Orbs for Glassmorphism depth */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#D4A038]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#071A3D]/25 rounded-full blur-3xl pointer-events-none"></div>
          
          <div id="auth-section" className="relative z-10 max-w-md mx-auto bg-[#071A3D] text-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(7,26,61,0.35)] border border-white/10">
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-16 h-16 bg-[#D4A038] rounded-full flex items-center justify-center text-[#071A3D] mb-4 shadow-[0_4px_20px_rgba(212,160,56,0.35)]">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-heading font-bold uppercase tracking-wider text-white">
                Secure Corporate Portal
              </h2>
              <p className="text-gray-300 text-xs mt-2 italic max-w-sm">
                Elitesphere Growth Client Console & Lead Management System
              </p>
            </div>

            {authError && (
              <div className="mb-4 bg-red-950/60 backdrop-blur-sm border-l-4 border-red-500 text-red-200 p-3 rounded text-xs">
                {authError}
              </div>
            )}

            {authSuccess && (
              <div className="mb-4 bg-green-950/60 backdrop-blur-sm border-l-4 border-green-500 text-green-200 p-3 rounded text-xs">
                {authSuccess}
              </div>
            )}

            {!isRegisterMode ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-300">
                    Business E-mail Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@elitesphere.com or admin@elitesphere.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A038] focus:bg-slate-950/60 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g. client123 or admin123"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A038] focus:bg-slate-950/60 transition-all text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4A038] hover:bg-[#c3912e] text-[#071A3D] font-bold py-2.5 px-4 rounded-lg text-sm transition-all uppercase tracking-wider duration-300 shadow-[0_4px_12px_rgba(212,160,56,0.25)] hover:shadow-[0_4px_20px_rgba(212,160,56,0.4)] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Sign In Securely
                </button>

                <div className="pt-4 border-t border-white/10 text-center text-xs text-gray-400 space-y-2">
                  <p>
                    Don't have a secure workspace configured yet?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(true);
                      setAuthError("");
                    }}
                    className="text-[#D4A038] font-semibold hover:underline"
                  >
                    Generate a Workspace Instantly
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-300">
                    Full Representative Name
                  </label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Director Sarah Lee"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A038] focus:bg-slate-950/60 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-300">
                    Institution or Organization Name
                  </label>
                  <input
                    type="text"
                    value={registerCompany}
                    onChange={(e) => setRegisterCompany(e.target.value)}
                    placeholder="e.g. Horizon International Co."
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A038] focus:bg-slate-950/60 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-300">
                    Strategic Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. s.lee@horizon.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A038] focus:bg-slate-950/60 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-300">
                    Access Key (Password)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 4 keys recommended"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A038] focus:bg-slate-950/60 transition-all text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4A038] hover:bg-[#c3912e] text-[#071A3D] font-bold py-2.5 px-4 rounded-lg text-sm transition-all uppercase tracking-wider duration-300 shadow-[0_4px_12px_rgba(212,160,56,0.25)] hover:shadow-[0_4px_20px_rgba(212,160,56,0.4)] flex items-center justify-center gap-2"
                >
                  Activate Sandbox Workspace
                </button>

                <div className="pt-2 text-center text-xs text-gray-400">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(false);
                      setAuthError("");
                    }}
                    className="text-white underline hover:text-[#D4A038] transition-colors"
                  >
                    Return to standard login panel
                  </button>
                </div>
              </form>
            )}

            {/* DEMO ACCOUNTS HELPER BOX */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/50 border border-white/5 text-xs text-gray-300 space-y-1">
              <p className="font-semibold text-white tracking-wider uppercase text-[10px]">
                🔐 Preconfigured Sandbox Logins
              </p>
              <p>
                <strong>Client View:</strong> <code className="text-[#D4A038]">client@elitesphere.com</code> / <code className="text-[#D4A038]">client123</code>
              </p>
              <p>
                <strong>Lead Director View:</strong> <code className="text-[#D4A038]">admin@elitesphere.com</code> / <code className="text-[#D4A038]">admin123</code>
              </p>
              <p className="text-[10px] text-gray-500 mt-1 italic">
                *All uploads, milestones progress, custom tasks survive refresh by standard LocalStorage mechanics.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================= AUTHENTICATED PORTAL INTERNAL VIEW ================= */
        <div id="authenticated-view" className="w-full max-w-7xl mx-auto px-4 md:px-0">
          
          {/* Internal Portal Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 pb-5 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#071A3D] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full select-none border border-[#D4A038]/50">
                  {user.role} Workspace
                </span>
                <span className="text-gray-400 text-xs">|</span>
                <span className="text-xs text-gray-500">Live Secure Connection</span>
              </div>
              <h1 className="text-2xl font-heading font-black text-[#071A3D] uppercase tracking-wider mt-1">
                {user.role === "Admin" ? "Executive Leadership Console" : "Strategic Client Suite"}
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                Authorized user: <span className="font-semibold text-[#071A3D]">{user.name}</span> ({user.email})
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-50 text-red-700 hover:bg-red-100 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all border border-red-200/50"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out Workspace
            </button>
          </div>

          {user.role === "Client" ? (
            /* ========================================================
               CLIENT VIEW: Project, Milestones, Drag-Drop Document
               ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT & CENTER PANEL: PROJECT METRICS & TASKS */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Project Brief */}
                {project && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#071A3D]" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A038]/5 rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="text-[10px] font-mono uppercase bg-[#F5F7FA] text-gray-700 px-2 py-1 rounded">
                        PROJECT ID: {project.id}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D4A038]" /> Started: {project.startDate}
                      </span>
                    </div>

                    <h2 className="text-xl font-heading font-bold text-[#071A3D] uppercase tracking-wide">
                      {project.projectName}
                    </h2>
                    <p className="text-xs text-gray-600 mt-1">
                      Organization: <span className="font-semibold text-gray-800">{project.clientName}</span> | Growth Advisor: <span className="font-semibold text-gray-800">{project.advisorName}</span>
                    </p>

                    {/* Progress Segment */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#071A3D] flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-[#D4A038]" /> Overall Phase Completion
                        </span>
                        <span className="text-sm font-bold text-[#D4A038] tracking-widest">{project.overallProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#071A3D] to-[#D4A038] h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${project.overallProgress}%` }}
                        />
                      </div>
                      <div className="mt-3 flex items-start gap-2 bg-[#F5F7FA] p-3 rounded border border-gray-200/50">
                        <Clock className="w-4 h-4 text-[#D4A038]" />
                        <div className="text-[11px] text-gray-700">
                          <span className="font-semibold">Next Scheduled Milestone:</span> {project.nextMeeting}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Milestone Roadmap */}
                {project && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-base font-heading font-bold text-[#071A3D] uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">
                      Strategic Milestones Timeline
                    </h3>
                    
                    <div className="relative border-l border-gray-200 ml-4 pb-1 space-y-6">
                      {project.milestones.map((milestone, idx) => {
                        const isCompleted = milestone.status === "Completed";
                        const isInProgress = milestone.status === "In_Progress";
                        return (
                          <div key={milestone.id} className="relative pl-7">
                            {/* Milestone indicator */}
                            <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                              isCompleted 
                                ? "bg-green-100 text-green-700 border-green-500 shadow-sm" 
                                : isInProgress
                                  ? "bg-amber-50 text-amber-700 border-[#D4A038] animate-pulse"
                                  : "bg-white text-gray-400 border-gray-300"
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <span className="text-[10px] font-bold">{idx + 1}</span>
                              )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className={`text-sm font-semibold uppercase tracking-wide ${
                                isCompleted ? "text-gray-500 line-through" : "text-[#071A3D]"
                              }`}>
                                {milestone.title}
                              </h4>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase self-start sm:self-center ${
                                isCompleted 
                                  ? "bg-green-50 text-green-700 border border-green-200" 
                                  : isInProgress
                                    ? "bg-amber-50 text-[#D4A038] border border-[#D4A038]/30 font-bold"
                                    : "bg-gray-100 text-gray-500"
                              }`}>
                                {milestone.dueDate}
                              </span>
                            </div>
                            <div className="w-full max-w-xs mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-[#D4A038]'}`}
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Interactive Project Tasks Grid */}
                {project && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 flex-wrap gap-2">
                      <h3 className="text-base font-heading font-bold text-[#071A3D] uppercase tracking-wider">
                        Interactive Task Checklists & Action Items
                      </h3>
                      <span className="text-[10px] font-mono bg-[#071A3D] text-white px-2 py-0.5 rounded uppercase">
                        Client Authority Enable
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-4">
                      Click the status/circle indicator to cycle through progress states (<span className="text-[#D4A038] font-bold">Todo ➔ In Progress ➔ Done</span>) to update the status in real time.
                    </p>

                    <div className="space-y-2.5">
                      {project.tasks.map((task) => {
                        const isDone = task.status === "Done";
                        const isInProgress = task.status === "In_Progress";
                        return (
                          <div 
                            key={task.id} 
                            className={`flex items-center justify-between p-3 rounded border text-xs gap-3 ${
                              isDone 
                                ? "bg-gray-50 border-gray-200 opacity-70" 
                                : isInProgress
                                  ? "bg-[#D4A038]/5 border-[#D4A038]/40"
                                  : "bg-white border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <button 
                                onClick={() => toggleTaskStatus(task.id)}
                                title="Click to change status"
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                  isDone 
                                    ? "bg-green-500 border-green-600 text-white" 
                                    : isInProgress
                                      ? "bg-amber-100 border-[#D4A038] text-[#D4A038]"
                                      : "bg-white border-gray-400 text-transparent hover:border-gray-600"
                                }`}
                              >
                                 {isDone ? (
                                   <Check className="w-3.5 h-3.5 stroke-2" />
                                 ) : isInProgress ? (
                                   <Clock className="w-3.5 h-3.5 animate-spin" />
                                 ) : (
                                   <span className="text-[8px]">●</span>
                                 )}
                              </button>
                              
                              <div className="min-w-0">
                                <p className={`font-semibold ${isDone ? 'line-through text-gray-400' : 'text-[#071A3D]'}`}>
                                  {task.title}
                                </p>
                                <div className="text-[10px] text-gray-500 flex items-center gap-2 mt-0.5">
                                  <span>Assigned: <strong className="text-gray-700">{task.assignedTo}</strong></span>
                                  <span>•</span>
                                  <span>Due: <strong className="text-gray-700">{task.dueDate}</strong></span>
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              title="Delete task item"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Task Addition Form */}
                    <form onSubmit={handleAddTask} className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Add new custom task..."
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#D4A038]"
                        required
                      />
                      <select 
                        value={newTaskAssignee} 
                        onChange={(e) => setNewTaskAssignee(e.target.value)}
                        className="px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#D4A038]"
                      >
                        <option value="Client Team">Client Team</option>
                        <option value="Elitesphere Team">Elitesphere Team</option>
                        <option value="Joint Action">Joint Action</option>
                      </select>
                      <button 
                        type="submit"
                        className="bg-[#071A3D] text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#D4A038] hover:text-[#071A3D] transition-colors"
                      >
                        Add Task
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* RIGHT PANEL: SECURE DOCUMENT SHARING */}
              <div className="space-y-8">
                
                {/* Secure File Sync Terminal */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-base font-heading font-bold text-[#071A3D] uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">
                    Secure Document Vault
                  </h3>

                  {/* Drag and drop module */}
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                      dragActive 
                        ? "border-[#D4A038] bg-[#D4A038]/5 scale-[0.98]" 
                        : "border-gray-200 bg-[#F5F7FA] hover:border-gray-300 hover:bg-gray-100/30"
                    }`}
                  >
                    <Upload className="w-10 h-10 mx-auto text-[#071A3D] mb-3" />
                    <p className="text-xs font-bold text-[#071A3D] uppercase tracking-wider mb-1">
                      Drag & Drop Files Here
                    </p>
                    <p className="text-[10px] text-gray-500 mb-3">
                      PDF, Excel sheet, DOCX, or design files up to 25MB
                    </p>
                    <span className="text-[10px] bg-white text-gray-700 px-3 py-1 rounded shadow-sm border border-gray-200 font-semibold cursor-pointer pointer-events-none">
                      Or upload files manually below
                    </span>
                  </div>

                  {/* Manual File Input simulator */}
                  <div className="mt-4 flex gap-2">
                    <input 
                      type="text"
                      value={newDocumentName}
                      onChange={(e) => setNewDocumentName(e.target.value)}
                      placeholder="Enter file name to simulate upload..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#D4A038]"
                    />
                    <button 
                      onClick={() => {
                        if (newDocumentName.trim()) {
                          addNewDocument(newDocumentName.trim());
                        }
                      }}
                      className="bg-[#D4A038] text-[#071A3D] px-3.5 py-2 rounded text-xs font-bold hover:bg-[#071A3D] hover:text-white transition-all uppercase tracking-wider"
                    >
                      Upload
                    </button>
                  </div>

                  {/* List of files */}
                  {project && (
                    <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                      <h4 className="text-xs font-semibold text-[#071A3D] uppercase tracking-wide">
                        Available Project Documents ({project.documents.length})
                      </h4>
                      
                      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {project.documents.map((doc) => (
                          <div 
                            key={doc.id} 
                            className="p-3 bg-white border border-gray-200 rounded-md hover:border-gray-300 transition-all text-xs flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {getFileIcon(doc.type)}
                              <div className="min-w-0">
                                <p className="font-bold text-gray-800 truncate" title={doc.name}>
                                  {doc.name}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                  {doc.size} • By {doc.uploadedBy === "Elitesphere" ? "Elitesphere Advisor" : "Your Team"} • {doc.uploadedAt}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Simulate download safely */}
                              <button 
                                onClick={() => {
                                  setAuthSuccess(`Secure download initiated for: ${doc.name}`);
                                  setTimeout(() => setAuthSuccess(""), 4000);
                                }}
                                className="text-gray-400 hover:text-[#071A3D] transition-colors p-1"
                                title="Download decrypted file"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              
                              <button 
                                onClick={() => deleteDocument(doc.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                title="Remove document record"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Secure Client Vault Box */}
                <div className="bg-[#071A3D] text-white rounded-lg p-6 shadow-sm border border-[#D4A038]/30">
                  <h4 className="text-[#D4A038] font-heading font-black uppercase text-xs tracking-wider mb-2">
                    🛡️ Secure Workspace Guard
                  </h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed mb-4">
                    Your environment is secured with end-to-end data validation guidelines. Project files of active educational institutions and corporate startups are stored in isolated diagnostic tables with full persistence layers.
                  </p>
                  <div className="border-t border-slate-700/60 pt-3 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-green-500 block animate-ping" /> Connection Health: Strong
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* ========================================================
               ADMIN VIEW: Project Overseer & Received Lead Inquiries
               ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* LEFT SIDEBAR: ACTIVE INQUIRIES LIST */}
              <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2">
                  <h3 className="text-xs font-heading font-black text-[#071A3D] uppercase tracking-wider">
                    Interactive Inquiries ({inquiries.length})
                  </h3>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {inquiries.map((inq) => {
                    const isPending = inq.status === "Pending";
                    const isInContact = inq.status === "In Contact";
                    return (
                      <button
                        key={inq.id}
                        onClick={() => setSelectedInquiry(inq)}
                        className={`w-full text-left p-3 rounded-md border text-xs transition-all flex flex-col gap-1.5 ${
                          selectedInquiry && selectedInquiry.id === inq.id
                            ? "border-[#D4A038] bg-[#D4A038]/10"
                            : "border-gray-100 hover:border-gray-200 hover:bg-slate-50 bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-gray-800 truncate block">
                            {inq.fullName}
                          </span>
                          <span className={`text-[8px] uppercase tracking-widest px-1.5 rounded-full ${
                            isPending 
                              ? "bg-amber-100 text-[#D4A038] font-bold" 
                              : isInContact 
                                ? "bg-blue-100 text-blue-700 font-bold" 
                                : "bg-green-100 text-green-700"
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {inq.companyName}
                        </div>
                        <div className="text-[10px] text-[#071A3D] italic truncate">
                          {inq.serviceInterestedIn}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CENTER: INQUIRY ACTIVE DETAILS & DECISIONING */}
              <div className="lg:col-span-3 space-y-8">
                
                {/* Active Inquiry Card */}
                {selectedInquiry ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A038]/5 rounded-bl-full pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase bg-[#F5F7FA] text-[#071A3D] px-2 py-1 rounded">
                          CONTACT ID: {selectedInquiry.id}
                        </span>
                        <h3 className="text-lg font-heading font-bold text-[#071A3D] mt-2 uppercase tracking-wide">
                          {selectedInquiry.fullName}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium">
                          Corporate Leader at <span className="font-bold text-gray-800">{selectedInquiry.companyName}</span>
                        </p>
                      </div>

                      {/* Status Action controls */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateInquiryStatus(selectedInquiry.id, "Pending")}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                            selectedInquiry.status === "Pending"
                              ? "bg-amber-500 text-white"
                              : "bg-amber-100 text-[#D4A038] hover:bg-amber-200"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(selectedInquiry.id, "In Contact")}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                            selectedInquiry.status === "In Contact"
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          In Contact
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(selectedInquiry.id, "Resolved")}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                            selectedInquiry.status === "Resolved"
                              ? "bg-green-600 text-white"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          Resolved
                        </button>
                      </div>
                    </div>

                    {/* Meta info fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6 bg-[#F5F7FA] p-4 rounded border border-gray-200/50">
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">Email Address</span>
                        <a href={`mailto:${selectedInquiry.emailAddress}`} className="font-bold text-[#071A3D] hover:underline break-all">
                          {selectedInquiry.emailAddress}
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">Phone Number</span>
                        <a href={`tel:${selectedInquiry.phoneNumber}`} className="font-bold text-[#071A3D] hover:underline">
                          {selectedInquiry.phoneNumber}
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">Target Sector Interest</span>
                        <span className="font-bold text-gray-800">{selectedInquiry.serviceInterestedIn}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">Submitted Timestamp</span>
                        <span className="font-bold text-gray-800">{new Date(selectedInquiry.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* The Message */}
                    <div className="mb-6">
                      <span className="text-gray-400 uppercase tracking-widest text-[9px] block mb-1">Message Content</span>
                      <div className="p-4 rounded border border-gray-200 bg-white italic text-xs leading-relaxed text-gray-700">
                        "{selectedInquiry.message}"
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end border-t border-gray-100 pt-4">
                      <button
                        onClick={() => deleteInquiry(selectedInquiry.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-4 py-2 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5"
                      >
                        <Trash className="w-4 h-4" /> Delete Record
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="bg-slate-50 border border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500 text-xs">
                    <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="font-bold text-gray-700 uppercase tracking-wider mb-1">
                      No Inquiry Selected
                    </p>
                    <p>
                      Highlight any reactive contact query in the sidebar list map to access real-time status management, client emails, and response parameters.
                    </p>
                  </div>
                )}

                {/* Simulated Main Dashboard Control for client project */}
                {project && (
                  <div className="bg-[#071A3D] text-white p-6 rounded-lg border border-[#D4A038]/30">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                      <h3 className="text-base font-heading font-black uppercase tracking-wider text-white">
                        Project Management Portal Monitor
                      </h3>
                      <span className="bg-[#D4A038] text-[#071A3D] text-[9px] font-bold px-2 py-0.5 rounded-full">
                        ACTIVE PROJECT
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 p-4 rounded border border-slate-700/50 mb-6">
                      <div className="text-center md:text-left">
                        <span className="text-gray-400 text-[10px] uppercase tracking-widest block">Project Name</span>
                        <span className="font-bold text-sm text-[#D4A038] tracking-wide block truncate">{project.projectName}</span>
                      </div>
                      <div className="text-center md:text-left">
                        <span className="text-gray-400 text-[10px] uppercase tracking-widest block">Documents Count</span>
                        <span className="font-bold text-lg text-white block">{project.documents.length} Shared</span>
                      </div>
                      <div className="text-center md:text-left">
                        <span className="text-gray-400 text-[10px] uppercase tracking-widest block">Process Action State</span>
                        <span className="font-bold text-lg text-white block">{project.overallProgress}% Complete</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      As an Admin representative, any files uploaded here automatically propagate to the secure Client's interface. Use this field to upload audited strategic frameworks, visual guides, and school marketing deliverables.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <input 
                        type="text"
                        value={newDocumentName}
                        onChange={(e) => setNewDocumentName(e.target.value)}
                        placeholder="e.g. Elitesphere_SEO_SLA_Agreement.pdf"
                        className="flex-1 min-w-[200px] px-3 py-2 border border-slate-700 bg-slate-900 rounded text-xs text-white focus:outline-none focus:border-[#D4A038]"
                      />
                      <button 
                        onClick={() => {
                          if (newDocumentName.trim()) {
                            addNewDocument(newDocumentName.trim(), "2.4 MB");
                          }
                        }}
                        className="bg-[#D4A038] text-[#071A3D] px-4 py-2 rounded text-xs font-bold hover:bg-white hover:text-[#071A3D] transition-colors uppercase tracking-wider"
                      >
                        Upload to Client
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
