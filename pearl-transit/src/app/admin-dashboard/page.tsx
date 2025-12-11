"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FiLogOut,
  FiMapPin,
  FiTruck,
  FiImage,
  FiStar,
  FiCalendar,
  FiCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdTour } from "react-icons/md";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [adminName, setAdminName] = useState(() => {
    const storedAdminName = localStorage.getItem("adminName");
    return storedAdminName || "Admin";
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Menu items
  const menuItems: MenuItem[] = [
    {
      id: "tour-requests",
      label: "Tour Requests",
      icon: <FiMapPin className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "vehicle-requests",
      label: "Vehicle Requests",
      icon: <FiTruck className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "gallery",
      label: "Manage Gallery",
      icon: <FiImage className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "reviews",
      label: "Manage Reviews",
      icon: <FiStar className="w-5 h-5" />,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "tours",
      label: "Manage Tours",
      icon: <MdTour className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
    },
    {
      id: "calendar",
      label: "Tour Calendar",
      icon: <FiCalendar className="w-5 h-5" />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "availability",
      label: "Vehicle Availability",
      icon: <FiCheck className="w-5 h-5" />,
      color: "from-pink-500 to-pink-600",
    },
  ];

  // Logout handler
  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminName");
      router.push("/admin-login");
    }, 1000);
  };

  // Section Content Components
  const TourRequests = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Tour Requests</h2>
      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
        <p className="text-gray-300">No tour requests yet.</p>
      </div>
    </div>
  );

  const VehicleRequests = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Vehicle Requests (Quick Taxi)</h2>
      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg p-6">
        <p className="text-gray-300">No vehicle requests yet.</p>
      </div>
    </div>
  );

  const Gallery = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Manage Image Gallery</h2>
      <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-6">
        <p className="text-gray-300">Gallery management coming soon.</p>
      </div>
    </div>
  );

  const Reviews = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>
      <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-6">
        <p className="text-gray-300">No reviews to manage yet.</p>
      </div>
    </div>
  );

  const Tours = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Manage Tours</h2>
      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-6">
        <p className="text-gray-300">Tours management coming soon.</p>
      </div>
    </div>
  );

  const Calendar = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Tour Calendar</h2>
      <div className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-500/30 rounded-lg p-6">
        <p className="text-gray-300">Calendar view coming soon.</p>
      </div>
    </div>
  );

  const Availability = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Vehicle Availability</h2>
      <div className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-lg p-6">
        <p className="text-gray-300">Availability management coming soon.</p>
      </div>
    </div>
  );

  const Overview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveSection(item.id)}
            className={`bg-gradient-to-br ${item.color} rounded-lg p-6 cursor-pointer text-white shadow-lg hover:shadow-xl transition`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-80">{item.label}</p>
                <p className="text-2xl font-bold mt-2">0</p>
              </div>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "tour-requests":
        return <TourRequests />;
      case "vehicle-requests":
        return <VehicleRequests />;
      case "gallery":
        return <Gallery />;
      case "reviews":
        return <Reviews />;
      case "tours":
        return <Tours />;
      case "calendar":
        return <Calendar />;
      case "availability":
        return <Availability />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-700/50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pearl Transit
              </h1>
              <p className="text-xs text-gray-400">Admin Dashboard</p>
            </div>
          </div>

          {/* Right: Welcome & Logout */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden sm:block text-right"
            >
              <p className="text-sm text-gray-400">Welcome back</p>
              <p className="font-semibold text-white">{adminName}</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="hidden sm:inline">
                {logoutLoading ? "Logging out..." : "Logout"}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed md:static md:translate-x-0 left-0 top-20 z-30 w-64 bg-black/50 backdrop-blur-md border-r border-gray-700/50 p-6 h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="space-y-2">
            {/* Overview Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setActiveSection("overview");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                activeSection === "overview"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <div className="w-5 h-5">📊</div>
              <span className="font-semibold">Overview</span>
            </motion.button>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white`
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-20"
        />
      )}

      {/* Logout Loading Overlay */}
      {logoutLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gray-900 p-8 rounded-2xl text-center flex flex-col items-center gap-4 border border-gray-700"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-500 border-t-red-200 rounded-full"
            />
            <p className="text-white font-semibold">Logging out...</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
