import React, { useState } from "react";
import { Search, Mail, Clock, ArrowRight, User, X, Filter } from "lucide-react";
import { BlogPost } from "../types";
import { BLOG_POSTS } from "../data/blogData";
import { subscribeNewsletter } from "../utils/storage";

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSaved, setNewsletterSaved] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    "All",
    "Business Growth",
    "Digital Marketing",
    "Branding",
    "Entrepreneurship",
    "Educational Institutions"
  ];

  // Filtering Logic
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured Post (first featured post, or first post in filtered list)
  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");
    setNewsletterSaved(false);

    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterError("Please enter a valid business email address.");
      return;
    }

    const success = await subscribeNewsletter(newsletterEmail.trim());
    if (success) {
      setNewsletterSaved(true);
      setNewsletterEmail("");
    } else {
      setNewsletterError("This e-mail is already subscribed to the Intel digest.");
    }
  };

  return (
    <div className="w-full">
      {/* FEATURED ARTICLE SECTION */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <div className="mb-12 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-72 lg:h-full min-h-[300px]">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#071A3D] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow">
                Featured Insight
              </div>
            </div>
            
            <div className="lg:col-span-5 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block mb-2">
                  {featuredPost.category}
                </span>
                
                <h3 className="text-xl lg:text-2xl font-heading font-black text-[#071A3D] leading-tight mb-3">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-[#D4A038]"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block leading-tight">{featuredPost.author.name}</span>
                    <span className="text-[10px] text-gray-400 block">{featuredPost.author.role}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActivePost(featuredPost)}
                  className="bg-[#071A3D] text-white hover:bg-[#D4A038] hover:text-[#071A3D] text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded transition-all duration-300 flex items-center gap-1"
                >
                  Read Article <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH STRIP */}
      <div className="bg-[#F5F7FA] border border-gray-200 rounded-lg p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search strategic insights..."
              className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs px-4 py-2.5 pl-9 rounded border border-gray-200 focus:outline-none focus:border-[#D4A038]"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          {/* Categories select wrapper for mobile / slide list */}
          <div className="w-full md:w-auto flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all shrink-0 uppercase tracking-wider ${
                    selectedCategory === cat 
                      ? "bg-[#071A3D] text-[#D4A038] border border-[#D4A038]/50" 
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#071A3D] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>

                  <h4 className="text-base font-heading font-bold text-[#071A3D] leading-snug mb-2 hover:text-[#D4A038] transition-colors">
                    {post.title}
                  </h4>

                  <p className="text-gray-600 text-xs line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/40">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover border border-gray-200" />
                  <span className="text-[10px] font-semibold text-gray-700">{post.author.name}</span>
                </div>
                <button 
                  onClick={() => setActivePost(post)}
                  className="text-[#071A3D] hover:text-[#D4A038] text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5"
                >
                  Read Post <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-lg">
          <p className="text-gray-400 text-sm italic mb-1">No articles found in this matrix.</p>
          <p className="text-xs text-gray-400">Try broad terms like "education", "brand", or "strategy".</p>
        </div>
      )}

      {/* THE EMBEDDED INTEL NEWSLETTER BOX */}
      <div className="mt-16 bg-[#071A3D] text-white p-8 rounded-lg border border-[#D4A038]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4A038]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="text-[#D4A038] text-[10px] font-bold uppercase tracking-widest block mb-1">
            Intel & Strategy Circular
          </span>
          <h3 className="text-xl font-heading font-bold uppercase tracking-wider mb-2">
            Subscribe For Quarterly Playbooks
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            Get high-level corporate frameworks, startup valuation insights, and educational institution enrollment methodologies delivered cleanly. No corporate fluff, just strict execution guides.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your executive email address..."
              className="flex-1 px-4 py-2.5 rounded bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#D4A038]"
              required={!newsletterSaved}
              disabled={newsletterSaved}
            />
            <button 
              type="submit"
              disabled={newsletterSaved}
              className={`px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                newsletterSaved 
                  ? "bg-green-600 text-white" 
                  : "bg-[#D4A038] text-[#071A3D] hover:bg-white hover:text-[#071A3D]"
              }`}
            >
              <Mail className="w-4 h-4" /> {newsletterSaved ? "Subscribed Successfully!" : "Join Strategy List"}
            </button>
          </form>

          {newsletterError && (
            <p className="text-red-400 text-[11px] mt-2 font-medium">{newsletterError}</p>
          )}
          {newsletterSaved && (
            <p className="text-green-400 text-[11px] mt-2 font-semibold">✓ Custom confirmation code generated. Thank you for subscribing, representative.</p>
          )}
        </div>
      </div>

      {/* DETAIL VIEW MODAL */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#071A3D]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D4A038]/30">
            {/* Close */}
            <button 
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 bg-[#071A3D] hover:bg-[#D4A038] text-white hover:text-[#071A3D] rounded-full p-2 transition-all shadow-md z-10"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-64 sm:h-80 w-full relative">
              <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block mb-1">
                  {activePost.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight">
                  {activePost.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Author Strip */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <img src={activePost.author.avatar} alt={activePost.author.name} className="w-10 h-10 rounded-full object-cover border border-[#D4A038]" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">{activePost.author.name}</span>
                    <span className="text-[10px] text-gray-400 block">{activePost.author.role}</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 font-mono">
                  Published {activePost.date} • {activePost.readTime}
                </div>
              </div>

               {/* MD Rich Text */}
               <div className="text-gray-700 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line font-light">
                 {activePost.content}
               </div>

              {/* Modal footer call feedback */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => {
                    setActivePost(null);
                  }}
                  className="bg-[#071A3D] text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider py-2 px-6 rounded transition-colors"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
