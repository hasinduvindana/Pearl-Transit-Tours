"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { SVGProps } from 'react';

// Inline minimal icons to avoid adding an external dependency
const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12h18" />
    <path d="M3 6h18" />
    <path d="M3 18h18" />
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const galleryImages = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];

const slides = [
  {
    img: "/img1.jpg",
    title: "Welcome to Pearl Transit Tours",
    subtitle: "Join us for unforgettable journeys...",
    bottomText: "Plan Your Memorable Tour With Us",
  },
  {
    img: "/img2.jpg",
    title: "Explore Beautiful Sri Lanka",
    subtitle: "Experience paradise with us...",
    bottomText: "Your Dream Vacation Starts Here",
  },
  {
    img: "/img3.jpg",
    title: "Travel With Comfort & Trust",
    subtitle: "Discover new destinations...",
    bottomText: "Let Us Plan Your Perfect Trip",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [index, setIndex] = useState(0);

  const openImage = (img: string, i: number) => {
    setViewImage(img);
    setIndex(i);
    setZoom(1);
  };

  const closeImage = () => setViewImage(null);

  const nextImg = () => {
    const newIndex = (index + 1) % galleryImages.length;
    setIndex(newIndex);
    setViewImage(galleryImages[newIndex]);
    setZoom(1);
  };

  const prevImg = () => {
    const newIndex = (index - 1 + galleryImages.length) % galleryImages.length;
    setIndex(newIndex);
    setViewImage(galleryImages[newIndex]);
    setZoom(1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="text-white bg-[#0a0f1a] min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h1 className="text-xl font-bold">Pearl Transit Tours & Travels</h1>
          </div>

          {/* Center (Desktop Menu) */}
          <ul className="hidden md:flex gap-8 text-lg">
            <li className="hover:text-blue-300 cursor-pointer">About Us</li>
            <li className="hover:text-blue-300 cursor-pointer">Gallery</li>
            <li className="hover:text-blue-300 cursor-pointer">Destinations</li>
            <li className="hover:text-blue-300 cursor-pointer">Feedbacks</li>
            <li className="hover:text-blue-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-300 cursor-pointer">Plan Your Tour</li>
          </ul>

          {/* Right secret login button */}
          <button className="hidden md:block bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur">
            Login
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon width={30} height={30} /> : <MenuIcon width={30} height={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/60 backdrop-blur-lg p-4 space-y-4 text-center">
            <p>About Us</p>
            <p>Gallery</p>
            <p>Destinations</p>
            <p>Feedbacks</p>
            <p>Contact Us</p>
            <p>Plan Your Tour</p>
            <button className="w-full bg-white/20 py-2 rounded-lg">Login</button>
          </div>
        )}
      </nav>

      {/* HERO / IMAGE SLIDER */}
      <div className="relative h-screen w-full mt-20">
        <Image
          src={slides[current].img}
          alt="Slide"
          fill
          className="object-cover transition-all duration-700"
        />

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 text-white text-4xl bg-black/20 p-3 rounded-full">
          ❮
        </button>

        <button onClick={nextSlide} className="absolute right-4 top-1/2 text-white text-4xl bg-black/20 p-3 rounded-full">
          ❯
        </button>

        {/* Text Animation */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-center px-4">
          <motion.h1
            key={slides[current].title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold drop-shadow-xl"
          >
            {slides[current].title}
          </motion.h1>

          <motion.p
            key={slides[current].subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-xl md:text-2xl"
          >
            {slides[current].subtitle}
          </motion.p>

          <motion.p
            key={slides[current].bottomText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 text-2xl font-bold text-blue-300"
          >
            {slides[current].bottomText}
          </motion.p>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Plan Your Tour
          </motion.button>
        </div>
      </div>

      {/* ABOUT US */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Logo" width={250} height={250} className="rounded-xl shadow-xl" />
        </div>

        <div className="text-lg leading-relaxed">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p>
            Pearl Transit Tours & Travels is your trusted travel agency for exploring Sri Lanka.
            We provide comfortable vehicles, affordable tour packages, and unforgettable journey experiences.
            Our mission is to deliver the best travel experience with safety, comfort, and professionalism.
          </p>
        </div>
      </section>
      {/* DESTINATIONS */}
      <section id="destinations" className="py-20 bg-[#0a0f1a] text-white">
        <h2 className="text-center text-4xl font-bold mb-12">Top Destinations</h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            { img: "/dest1.jpg", name: "Ella" },
            { img: "/dest2.jpg", name: "Sigiriya" },
            { img: "/dest3.jpg", name: "Nuwara Eliya" },
          ].map((d, i) => (
            <div key={i} className="bg-white/10 rounded-xl shadow-lg p-4 hover:scale-105 transition cursor-pointer">
              <Image src={d.img} alt={d.name} width={500} height={300} className="rounded-lg" />
              <h3 className="text-2xl font-bold mt-4 text-center">{d.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#0d1320] py-16">
        <h2 className="text-center text-4xl font-bold mb-10">Gallery</h2>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {galleryImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="Gallery"
              width={400}
              height={300}
              onClick={() => openImage(img, i)}
              className="rounded-lg cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      </section>

      {/* FEEDBACKS */}
      <section id="feedbacks" className="py-20 bg-[#0d1320] text-white">
        <h2 className="text-center text-4xl font-bold mb-12">What Our Travelers Say</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

          {[
            { name: "John", msg: "Amazing trip, perfect arrangements!" },
            { name: "Sarah", msg: "We enjoyed Sri Lanka with Pearl Transit Tours. Highly recommended!" },
            { name: "Michael", msg: "Comfortable transport and friendly guide!" },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-xl shadow-md hover:bg-white/20 transition">
              <p className="text-lg italic">“{f.msg}”</p>
              <p className="mt-4 text-right font-bold">- {f.name}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CONTACT US */}
      <section id="contact" className="py-20 bg-[#0a0f1a] text-white">
        <h2 className="text-center text-4xl font-bold mb-10">Contact Us</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4 items-center">

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Pearl Transit Tours & Travels</h3>
            <p>Email: info@pearltransit.com</p>
            <p>Phone: +94 76 123 4567</p>
            <p>Location: Colombo, Sri Lanka</p>

            <button className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600">
              Plan Your Tour
            </button>
          </div>

          {/* Google Map */}
          <iframe
            src="https://maps.google.com/maps?q=colombo&s=t&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-64 md:h-80 rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>

      {viewImage && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[9999] p-4">
          <button onClick={closeImage} className="absolute top-5 right-5 text-3xl text-white">✕</button>

          <div className="flex items-center justify-between w-full mb-4 px-4">
            <button onClick={prevImg} className="text-white text-4xl">❮</button>
            <button onClick={nextImg} className="text-white text-4xl">❯</button>
          </div>

          <div className="overflow-hidden">
            <img
              src={viewImage}
              style={{ transform: `scale(${zoom})` }}
              className="max-h-[80vh] max-w-[90vw] transition-all duration-300 rounded-lg"
            />
          </div>

          <div className="mt-6 flex gap-6">
            <button onClick={() => setZoom(zoom + 0.2)} className="text-white text-3xl">➕</button>
            <button onClick={() => setZoom(zoom > 1 ? zoom - 0.2 : 1)} className="text-white text-3xl">➖</button>
          </div>
        </div>
      )}

      <footer className="bg-black/40 text-center text-white py-6 mt-10">
        <p>© 2025 Pearl Transit Tours & Travels. All Rights Reserved.</p>
        <p className="mt-2">Follow us on Facebook | Instagram | YouTube</p>
      </footer>

    </div>
  );
}

