"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

// ------------------------
// Place Data
// ------------------------
const places = [
  {
    name: "Temple of the Tooth",
    description: "Sacred Buddhist temple housing the revered tooth relic of the Buddha.",
    image: "/kandy/temple-of-the-tooth.jpg",
  },
  {
    name: "Kandy Lake",
    description: "Serene man-made lake ideal for evening walks and city views.",
    image: "/kandy/kandy-lake.jpg",
  },
  {
    name: "Peradeniya Botanical Garden",
    description: "Expansive gardens with orchids, palms, and a famed avenue of royal palms.",
    image: "/kandy/peradeniya-garden.jpg",
  },
  {
    name: "Bahirawakanda Buddha Statue",
    description: "Hilltop giant Buddha offering panoramic views of Kandy city.",
    image: "/kandy/bahirawakanda-buddha.jpg",
  },
  {
    name: "Udawatta Kele Sanctuary",
    description: "Urban forest reserve with nature trails, birdlife, and serene greenery.",
    image: "/kandy/udawatta-kele.jpg",
  },
  {
    name: "Kandy Viewpoint",
    description: "Scenic lookout capturing the lake, cityscape, and distant hills.",
    image: "/kandy/kandy-viewpoint.jpg",
  },
  {
    name: "Cultural Dance Show",
    description: "Traditional Kandyan dance and drumming performances each evening.",
    image: "/kandy/culture-dance.jpg",
  },
  {
    name: "Ceylon Tea Museum",
    description: "Learn tea history in a restored factory with tastings and exhibits.",
    image: "/kandy/tea-museum.jpg",
  },
  {
    name: "Royal Palace Park",
    description: "Historic parklands near the old royal palace for relaxed strolls.",
    image: "/kandy/royal-park.png",
  },
  {
    name: "Spice and Craft Market",
    description: "Shop for spices, handicrafts, and local sweets in vibrant bazaars.",
    image: "/kandy/spice-market.jpg",
  },
];

export default function Kandy() {
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const openFullscreen = (index: number) => {
    setCurrentIndex(index);
    setZoom(1);
    setFullscreen(true);
  };

  const closeFullscreen = () => setFullscreen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % places.length);
    setZoom(1);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + places.length) % places.length);
    setZoom(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1d3b] via-black to-gray-900 text-white p-3 sm:p-6 md:p-10">

      {/* Back Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="fixed right-3 top-3 sm:right-5 sm:top-5 bg-white/10 hover:bg-white/20 p-2 rounded-full z-40 transition"
      >
        <ArrowLeft className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 pt-12 sm:pt-0"
      >
        Kandy
      </motion.h1>

      {/* Banner Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full flex justify-center px-0 sm:px-2"
      >
        <Image
          src="/dest9.jpg"
          alt="Kandy Main"
          width={600}
          height={300}
          className="rounded-lg sm:rounded-xl shadow-lg w-full h-auto max-w-2xl"
        />
      </motion.div>

      {/* Description */}
      <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 leading-relaxed text-justify max-w-4xl mx-auto">
        Kandy, the cultural capital of Sri Lanka, is famed for its sacred Temple of the Tooth, lush hills, and cool climate. 
        Wander around the tranquil lake, explore vibrant markets, and experience Kandyan arts, tea heritage, and serene sanctuaries 
        that make this hill-country city unforgettable.
      </p>

      {/* Popular Places Section */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-8 sm:mt-10 mb-4 text-center px-2">Most Popular Places in Kandy</h2>

      {/* Horizontal Scroll Gallery - Mobile Optimized */}
      <div className="flex overflow-x-auto space-x-3 sm:space-x-6 py-4 scrollbar-hide px-2 sm:px-0">
        {places.map((place, index) => (
          <div
            key={index}
            onClick={() => openFullscreen(index)}
            className="min-w-[160px] sm:min-w-[220px] md:min-w-[250px] bg-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer hover:bg-white/20 transition"
          >
            <Image
              src={place.image}
              alt={place.name}
              width={300}
              height={200}
              className="rounded-md sm:rounded-lg w-full h-auto"
            />
            <h3 className="text-sm sm:text-lg md:text-xl font-semibold mt-2">{place.name}</h3>
            <p className="text-gray-300 text-xs sm:text-sm hidden sm:block">{place.description}</p>
          </div>
        ))}
      </div>

      {/* --------------------------------------------------- */}
      {/* FULLSCREEN IMAGE VIEWER */}
      {/* --------------------------------------------------- */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-50 p-3">

          {/* Close Button */}
          <button
            className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white/20 p-2 sm:p-3 rounded-full hover:bg-white/30 transition z-50"
            onClick={closeFullscreen}
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Zoom Controls - Mobile Optimized */}
          <div className="absolute bottom-16 sm:bottom-20 flex space-x-2 sm:space-x-3">
            <button onClick={() => setZoom((z) => Math.min(z + 0.3, 3))}
              className="bg-white/20 p-2 sm:p-3 rounded-full hover:bg-white/30 transition">
              <ZoomIn size={18} className="sm:w-6 sm:h-6" />
            </button>
            <button onClick={() => setZoom((z) => Math.max(z - 0.3, 1))}
              className="bg-white/20 p-2 sm:p-3 rounded-full hover:bg-white/30 transition">
              <ZoomOut size={18} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Main Image */}
          <motion.img
            src={places[currentIndex].image}
            alt="Fullscreen"
            style={{ transform: `scale(${zoom})` }}
            className="max-h-[60vh] sm:max-h-[75vh] md:max-h-[80vh] rounded-lg sm:rounded-xl transition-transform duration-300 w-auto"
          />

          {/* Navigation - Mobile Optimized */}
          <button
            className="absolute left-2 sm:left-5 bg-white/10 p-2 sm:p-3 rounded-full hover:bg-white/20 transition"
            onClick={prevImage}
          >
            <ChevronLeft size={20} className="sm:w-7 sm:h-7" />
          </button>

          <button
            className="absolute right-2 sm:right-5 bg-white/10 p-2 sm:p-3 rounded-full hover:bg-white/20 transition"
            onClick={nextImage}
          >
            <ChevronRight size={20} className="sm:w-7 sm:h-7" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-3 sm:bottom-5 text-sm sm:text-base bg-white/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
            {currentIndex + 1} / {places.length}
          </div>
        </div>
      )}
    </div>
  );
}
