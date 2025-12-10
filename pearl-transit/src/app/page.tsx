"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const galleryImages = ["/gimg1.jpg", "/gimg2.jpg", "/gimg3.jpg", "/gimg4.jpg", "/gimg5.jpg", "/gimg6.jpg", "/gimg7.jpg", "/gimg8.jpg", "/gimg9.jpg", "/gimg10.jpg","/gimg11.jpg", "/gimg12.jpg", "/gimg13.jpg", "/gimg14.jpg", "/gimg15.jpg", "/gimg16.jpg", "/gimg17.jpg", "/gimg18.jpg", "/gimg19.jpg", "/gimg20.jpg"];

const slides = [
  {
    img: "/img1.jpg",
    title: "Welcome to Pearl Transit Tours",
    subtitle: "Join with us for unforgettable journeys...",
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
  {
    img: "/img4.jpg",
    title: "Welcome to Pearl Transit Tours",
    subtitle: "Join us for unforgettable journeys...",
    bottomText: "Plan Your Memorable Tour With Us",
  },
  {
    img: "/img5.jpg",
    title: "Explore Beautiful Sri Lanka",
    subtitle: "Experience paradise with us...",
    bottomText: "Your Dream Vacation Starts Here",
  },
  {
    img: "/img6.jpg",
    title: "Travel With Comfort & Trust",
    subtitle: "Discover new destinations...",
    bottomText: "Let Us Plan Your Perfect Trip",
  },
  {
    img: "/img7.jpg",
    title: "Welcome to Pearl Transit Tours",
    subtitle: "Join us for unforgettable journeys...",
    bottomText: "Plan Your Memorable Tour With Us",
  },
  
];

export default function Home() {
  const router = useRouter();
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="text-white bg-[#0a0f1a] min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-60 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h1
              className="text-xl "
              style={{ fontFamily: '"Brush Script MT", cursive', color: '#d2c7b3',fontSize: '24px' }}
            >
              Pearl Transit Tours & Travels
            </h1>
          </div>

          {/* Center (Desktop Menu) */}
          <ul className="hidden md:flex gap-8 text-lg">
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About Us</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>Gallery</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}>Destinations</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => document.getElementById('feedbacks')?.scrollIntoView({ behavior: 'smooth' })}>Feedbacks</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Us</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Plan Your Tour</li>
          </ul>

          {/* Right secret login button */}
          <button className="hidden md:block bg-white/5 px-4 py-2 rounded-lg hover:bg-white/30 backdrop-blur" onClick={() => window.location.href = '/login'}>
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
            <p className="cursor-pointer hover:text-blue-300" onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>About Us</p>
            <p className="cursor-pointer hover:text-blue-300" onClick={() => { document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Gallery</p>
            <p className="cursor-pointer hover:text-blue-300" onClick={() => { document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Destinations</p>
            <p className="cursor-pointer hover:text-blue-300" onClick={() => { document.getElementById('feedbacks')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Feedbacks</p>
            <p className="cursor-pointer hover:text-blue-300" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Contact Us</p>
            <p className="cursor-pointer hover:text-blue-300" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }}>Plan Your Tour</p>
            <button className="w-full bg-white/20 py-2 rounded-lg">Login</button>
          </div>
        )}
      </nav>

      {/* Dark Background Under Navbar */}
      <div className="fixed top-[47px] w-full h-20 bg-gradient-to-b from-black/100 to-transparent z-30"></div>

      {/* HERO / IMAGE SLIDER */}
      <div className="relative h-screen w-full mt-0">
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
            className="text-4xl md:text-6xl font-extrabold"
            style={{
              color: 'rgba(255, 255, 255, 1.0)',
              textShadow: '2px 2px 10px rgba(0, 0, 0, 0.4), 0 0 25px rgba(0, 0, 0, 0.7)',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)'
            }}
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

          <div className="flex gap-4 justify-center flex-wrap mt-6">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-blue-60/30 backdrop-blur-sm border border-blue-400/50 px-6 py-3 rounded-lg hover:bg-blue-500/50 hover:border-blue-300 transition"
              onClick={() => (window.location.href = '/plantour')}
            >
              Plan Your Tour
            </motion.button>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 }}
              className="bg-green-80/30 backdrop-blur-sm border border-green-400/50 px-6 py-3 rounded-lg hover:bg-green-500/50 hover:border-green-300 transition"
              onClick={() => (window.location.href = '/quick-taxi')}
            >
              Quick Taxi
            </motion.button>
          </div>
        </div>
      </div>

      {/* ABOUT US */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 scroll-mt-20">
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
      <section id="destinations" className="py-20 bg-[#0a0f1a] text-white scroll-mt-20">
        <h2 className="text-center text-4xl font-bold mb-12">Top Destinations</h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            { img: "/dest1.jpg", name: "Galle", slug: "/Destinations/Galle" },
            { img: "/dest2.jpg", name: "Nuwara Eliya", slug: "/Destinations/NuwaraEliya" },
            { img: "/dest3.jpg", name: "Mirissa", slug: "/Destinations/Mirissa" },
            { img: "/dest4.jpg", name: "Ahungalla", slug: "/Destinations/Ahungalla" },
            { img: "/dest5.jpg", name: "Bentota", slug: "/Destinations/Bentota" }, 
            { img: "/dest6.jpg", name: "Ella", slug: "/Destinations/Ella" },
            { img: "/dest7.jpg", name: "Sigiriya", slug: "/Destinations/Sigiriya" },
            { img: "/dest8.jpg", name: "Colombo", slug: "/Destinations/Colombo" },
            { img: "/dest9.jpg", name: "Kandy", slug: "/Destinations/Kandy" },
            { img: "/dest10.jpg", name: "Arugambay", slug: "/Destinations/Arugambay" },
            { img: "/dest11.jpg", name: "Pinnawala", slug: "/Destinations/Pinnawala" },
            { img: "/dest12.jpg", name: "Udawalawa", slug: "/Destinations/Udawalawa" },
            { img: "/dest13.jpg", name: "Sinharaja Rainforest", slug: "/Destinations/Sinharaja" },
          ].map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => router.push(d.slug)}
              className="bg-white/10 rounded-xl shadow-lg p-4 hover:scale-105 transition cursor-pointer text-left"
            >
              <Image src={d.img} alt={d.name} width={500} height={300} className="rounded-lg" />
              <h3 className="text-2xl font-bold mt-4 text-center">{d.name}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#0d1320] py-16 scroll-mt-20">
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
      <section id="feedbacks" className="py-20 bg-[#0d1320] text-white scroll-mt-20">
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
      <section id="contact" className="py-20 bg-[#0a0f1a] text-white scroll-mt-20">
        <h2 className="text-center text-4xl font-bold mb-10">Contact Us</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4 items-center">

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Pearl Transit Tours & Travels</h3>
            
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:pearltransittravels@gmail.com" className="hover:text-blue-300 transition">
                  pearltransittravels@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+94764787744" className="hover:text-blue-300 transition">
                  +94 76 478 77 44
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a href="https://wa.me/94764787744" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
                  WhatsApp: +94 76 478 77 44
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Ahungalla, Sri Lanka</span>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-gray-300">Follow us:</span>
                <a href="https://www.facebook.com/share/1CXF7TVP2b/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/pearltransit_travels?igsh=dXRrdTA1cmxwbnB1" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <button className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition-all hover:scale-105" onClick={() => (window.location.href = '/plantour')}>
              Plan Your Tour
            </button>
          </div>

          {/* Google Map */}
          <iframe
            src="https://maps.google.com/maps?q=Ahungalla,+Sri+Lanka&z=14&output=embed"
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
            <Image
              src={viewImage}
              alt="Gallery image preview"
              width={1200}
              height={800}
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
        <div className="mt-4 flex justify-center items-center gap-6">
          <a href="https://www.facebook.com/share/1CXF7TVP2b/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/pearltransit_travels?igsh=dXRrdTA1cmxwbnB1" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </footer>

    </div>
  );
}

