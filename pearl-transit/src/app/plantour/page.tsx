"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Put this file at: app/plantour/page.tsx
 *
 * Notes:
 * - SVG map is simplified and uses district ids. Adjust paths if you want a more accurate map SVG.
 * - Replace flag emojis/options with a fuller list if needed.
 * - Images (logo.png) should be present in /public.
 */

const COUNTRIES = [
  { code: "LK", label: "Sri Lanka", flag: "🇱🇰" },
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", label: "Australia", flag: "🇦🇺" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
  { code: "FR", label: "France", flag: "🇫🇷" },
  { code: "CN", label: "China", flag: "🇨🇳" },
  { code: "JP", label: "Japan", flag: "🇯🇵" },
  { code: "SG", label: "Singapore", flag: "🇸🇬" },
];

const VEHICLES = [
  { id: "hatchback", title: "Hatchback Car", pax: "1 - 2 Passengers", icon: "car-1" },
  { id: "sedan", title: "Sedan Car", pax: "1 - 2 Passengers", icon: "car-2" },
  { id: "mini-suv", title: "Mini SUV", pax: "1 - 2 Passengers", icon: "car-3" },
  { id: "flatroof-van", title: "Flatroof Van", pax: "1 - 5 Passengers", icon: "van-1" },
  { id: "highroof-van", title: "Highroof Van", pax: "1 - 8 Passengers", icon: "van-2" },
];

const COUNTRY_CODES = [
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+91", label: "India (+91)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+1", label: "United States/Canada (+1)" },
];

const ACTIVITIES = [
  "Water Sport Activities",
  "Boat rides in River",
  "Boat rides in the Sea",
  "Dive in Sea",
  "Stilt fishing",
  "Surfing",
  "Visit the Whales",
  "Safari",
  "To know about Sri Lankan Spices",
  "To know about Gems",
];

/**
 * A small lookup mapping popular place keywords to districts.
 * You can expand this list as needed.
 */
const PLACE_TO_DISTRICT: Record<string, string> = {
  // central hills
  "nuwara eliya": "nuwara_eliya",
  "ella": "badulla",
  "kandy": "kandy",
  // south / west
  "galle": "galle",
  "colombo": "colombo",
  "mirissa": "matara",
  "matara": "matara",
  "ahungalla": "galle",
  "bentota": "galle",
  "hikkaduwa": "galle",
  "ungama": "galle",
  // east
  "trincomalee": "trincomalee",
  "arugam bay": "ampara",
  "arugambay": "ampara",
  "passikudah": "batticaloa",
  // north
  "jaffna": "jaffna",
  // cultural / rock
  "sigiriya": "matale",
  // others
  "anuradhapura": "anuradhapura",
  "polonnaruwa": "polonnaruwa",
  "kegalle": "kegalle",
  "badulla": "badulla",
  "gampaha": "gampaha",
  "kalutara": "kalutara",
  "kurunegala": "kurunegala",
  "ratnapura": "ratnapura",
  "trinco": "trincomalee",
};

export default function PlanTour() {
  // Form state
  const [name, setName] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0].code);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [day, setDay] = useState<string>("---");
  const [month, setMonth] = useState<string>("---");
  const [year, setYear] = useState<string>("---");
  const [daysCount, setDaysCount] = useState(3);
  const [hasPlaces, setHasPlaces] = useState<"yes" | "no">("no");
  const [placeInput, setPlaceInput] = useState("");
  const [places, setPlaces] = useState<string[]>([]);
  const [highlightedDistricts, setHighlightedDistricts] = useState<Record<string, boolean>>({});
  const [needHotels, setNeedHotels] = useState<"yes" | "no">("no");
  const [vehicle, setVehicle] = useState(VEHICLES[0].id);
  const [activities, setActivities] = useState<Record<string, boolean>>(() => {
    const a: Record<string, boolean> = {};
    ACTIVITIES.forEach((act) => (a[act] = false));
    return a;
  });
  const [contactCode, setContactCode] = useState(COUNTRY_CODES[0].code);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // helper: map place -> district id
  const detectDistrictForPlace = (placeName: string) => {
    const s = placeName.trim().toLowerCase();
    // try direct keywords
    if (PLACE_TO_DISTRICT[s]) return PLACE_TO_DISTRICT[s];
    // try contains
    for (const key of Object.keys(PLACE_TO_DISTRICT)) {
      if (s.includes(key)) return PLACE_TO_DISTRICT[key];
    }
    // fallback: unknown -> return 'unknown' (no coloring)
    return null;
  };

  const addPlace = () => {
    const val = placeInput.trim();
    if (!val) return;
    const newPlaces = [...places, val];
    setPlaces(newPlaces);
    setPlaceInput("");

    const district = detectDistrictForPlace(val);
    if (district) {
      setHighlightedDistricts((prev) => ({ ...prev, [district]: true }));
    }
  };

  const removePlace = (idx: number) => {
    const removed = [...places];
    const removedPlace = removed.splice(idx, 1)[0];
    setPlaces(removed);
    // recalc highlightedDistricts: remove district if no other place maps to it
    const districtRemoved = detectDistrictForPlace(removedPlace);
    if (!districtRemoved) return;
    const stillThere = removed.some((p) => detectDistrictForPlace(p) === districtRemoved);
    if (!stillThere) {
      setHighlightedDistricts((prev) => {
        const copy = { ...prev };
        delete copy[districtRemoved];
        return copy;
      });
    }
  };

  const clearForm = () => {
    setName("");
    setCountry(COUNTRIES[0].code);
    setAdults(1);
    setChildren(0);
    setDay("---");
    setMonth("---");
    setYear("---");
    setDaysCount(3);
    setHasPlaces("no");
    setPlaceInput("");
    setPlaces([]);
    setHighlightedDistricts({});
    setNeedHotels("no");
    setVehicle(VEHICLES[0].id);
    const a: Record<string, boolean> = {};
    ACTIVITIES.forEach((act) => (a[act] = false));
    setActivities(a);
    setContactCode(COUNTRY_CODES[0].code);
    setContact("");
    setEmail("");
    setErrors({});
  };

  // validate required fields: name, country, adults/children, arrival date (month+year at least), daysCount, contact, email
  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!country) e.country = "Country is required";
    if (!(adults >= 0)) e.adults = "Adults required";
    if (!(children >= 0)) e.children = "Children required";
    // arrival: require month & year OR full day+month+year. We treat month/year not '---' as valid.
    if (month === "---" || year === "---") {
      // allow if day provided? user said year and month also ok if date not confirmed
      // So require at least month & year not '---'
      e.arrival = "Please select month and year (day optional)";
    }
    if (!(daysCount >= 1)) e.daysCount = "Please enter number of days";
    if (!contact.trim()) e.contact = "Contact number required";
    if (!email.trim()) e.email = "Email is required";
    // basic email regex
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Enter a valid email";
    setErrors(e);
    return e;
  };

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setSubmitting(true);
    // simulate submit + show popup with progress bar for 3 seconds then redirect to "/"
    setShowSuccess(true);
    setProgress(0);
    const total = 3000; // ms
    const stepMs = 50;
    let elapsed = 0;
    const t = setInterval(() => {
      elapsed += stepMs;
      const p = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(p);
      if (elapsed >= total) {
        clearInterval(t);
        // redirect to home
        window.location.href = "/";
      }
    }, stepMs);
  };

  // derived display for arrival
  const arrivalDisplay = useMemo(() => {
    if (day !== "---" && month !== "---" && year !== "---") {
      return `${day}-${month}-${year}`;
    }
    if (month !== "---" && year !== "---") {
      return `${month}-${year}`;
    }
    return "Not selected";
  }, [day, month, year]);

  // some helpers for the counters
  const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000814] via-[#00122b] to-black text-white px-4 py-6">
      <div className="max-w-6xl mx-auto relative">

        {/* Back button top-right */}
        <div className="flex justify-end">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-200 hover:text-white">
            <svg className="w-6 h-6 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT / FORM */}
          <div className="lg:col-span-2 bg-white/5 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Plan Your Tour</h2>
            <p className="text-gray-300 mb-6">Tell us about your trip — required fields are marked *</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-sm text-gray-200">1. Full Name <span className="text-rose-400">*</span></label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full bg-white/6 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name" />
                {errors.name && <div className="text-rose-400 text-sm mt-1">{errors.name}</div>}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm text-gray-200">2. Country <span className="text-rose-400">*</span></label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full bg-white/10 backdrop-blur px-3 py-2 rounded-md outline-none border border-white/10">
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.label}</option>
                  ))}
                </select>
                {errors.country && <div className="text-rose-400 text-sm mt-1">{errors.country}</div>}
              </div>

              {/* Adults & Children counters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-200">3A. Adults <span className="text-rose-400">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <button type="button" onClick={() => setAdults((a) => clamp(a - 1, 0, 99))} className="px-3 py-1 rounded bg-white/6">-</button>
                    <input value={adults} onChange={(e) => setAdults(Number(e.target.value || 0))} className="w-16 text-center bg-white/6 px-2 py-1 rounded" inputMode="numeric" />
                    <button type="button" onClick={() => setAdults((a) => clamp(a + 1, 0, 99))} className="px-3 py-1 rounded bg-white/6">+</button>
                  </div>
                  {errors.adults && <div className="text-rose-400 text-sm mt-1">{errors.adults}</div>}
                </div>

                <div>
                  <label className="block text-sm text-gray-200">3B. Children <span className="text-rose-400">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <button type="button" onClick={() => setChildren((c) => clamp(c - 1, 0, 99))} className="px-3 py-1 rounded bg-white/6">-</button>
                    <input value={children} onChange={(e) => setChildren(Number(e.target.value || 0))} className="w-16 text-center bg-white/6 px-2 py-1 rounded" inputMode="numeric" />
                    <button type="button" onClick={() => setChildren((c) => clamp(c + 1, 0, 99))} className="px-3 py-1 rounded bg-white/6">+</button>
                  </div>
                  {errors.children && <div className="text-rose-400 text-sm mt-1">{errors.children}</div>}
                </div>
              </div>

              {/* Arrival date */}
              <div>
                <label className="block text-sm text-gray-200">4. Arrival Date (day / month / year) <span className="text-rose-400">*</span></label>
                <div className="flex gap-2 mt-1">
                  <select value={day} onChange={(e) => setDay(e.target.value)} className="bg-white/10 backdrop-blur px-2 py-2 rounded w-24 border border-white/10">
                    <option>---</option>
                    {[...Array(31)].map((_, i) => (<option key={i} value={String(i + 1)}>{i + 1}</option>))}
                  </select>

                  <select value={month} onChange={(e) => setMonth(e.target.value)} className="bg-white/10 backdrop-blur px-2 py-2 rounded border border-white/10">
                    <option>---</option>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (<option key={m} value={m}>{m}</option>))}
                  </select>

                  <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-white/10 backdrop-blur px-2 py-2 rounded w-28 border border-white/10">
                    <option>---</option>
                    {Array.from({length:6}).map((_,i)=> {
                      const y = new Date().getFullYear() + i;
                      return <option key={y} value={String(y)}>{y}</option>;
                    })}
                  </select>
                </div>
                <div className="text-sm text-gray-300 mt-1">Selected: <span className="font-medium">{arrivalDisplay}</span></div>
                {errors.arrival && <div className="text-rose-400 text-sm mt-1">{errors.arrival}</div>}
              </div>

              {/* Days expect */}
              <div>
                <label className="block text-sm text-gray-200">5. How many days do you expect to spend in Sri Lanka? <span className="text-rose-400">*</span></label>
                <div className="flex items-center gap-2 mt-1">
                  <button type="button" onClick={() => setDaysCount((d) => clamp(d - 1, 1, 365))} className="px-3 py-1 rounded bg-white/6">-</button>
                  <input value={daysCount} onChange={(e) => setDaysCount(Number(e.target.value || 1))} className="w-20 text-center bg-white/6 px-2 py-1 rounded" inputMode="numeric" />
                  <button type="button" onClick={() => setDaysCount((d) => clamp(d + 1, 1, 365))} className="px-3 py-1 rounded bg-white/6">+</button>
                </div>
                {errors.daysCount && <div className="text-rose-400 text-sm mt-1">{errors.daysCount}</div>}
              </div>

              {/* Suggestions about places */}
              <div>
                <label className="block text-sm text-gray-200">6. Do you have suggestions about places you want to visit?</label>
                <div className="flex gap-4 mt-2">
                  <label className={`px-4 py-2 rounded cursor-pointer ${hasPlaces==='yes' ? "bg-blue-600/40" : "bg-white/6"}`}>
                    <input type="radio" name="hasPlaces" value="yes" checked={hasPlaces==='yes'} onChange={() => setHasPlaces("yes")} className="mr-2" /> Yes
                  </label>
                  <label className={`px-4 py-2 rounded cursor-pointer ${hasPlaces==='no' ? "bg-blue-600/40" : "bg-white/6"}`}>
                    <input type="radio" name="hasPlaces" value="no" checked={hasPlaces==='no'} onChange={() => setHasPlaces("no")} className="mr-2" /> No
                  </label>
                </div>

                {hasPlaces === "yes" && (
                  <div className="mt-3">
                    <div className="flex gap-2">
                      <input value={placeInput} onChange={(e)=> setPlaceInput(e.target.value)} placeholder="Type a place name (e.g. Nuwara Eliya, Galle)" className="flex-1 bg-white/6 px-3 py-2 rounded" />
                      <button type="button" onClick={addPlace} className="px-4 py-2 rounded bg-blue-600 hover:opacity-90">Add</button>
                    </div>

                    {places.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {places.map((p, i) => (
                          <div key={i} className="flex items-center justify-between bg-white/6 p-2 rounded">
                            <div>
                              <div className="font-medium">{p}</div>
                              <div className="text-sm text-gray-300">{detectDistrictForPlace(p) ?? "District: unknown"}</div>
                            </div>
                            <div className="flex gap-2">
                              <button type="button" onClick={() => removePlace(i)} className="text-rose-400 px-3 py-1 rounded bg-white/3">Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4">
                      <h4 className="text-sm text-gray-200 mb-2">Map — selected districts are highlighted</h4>
                      <SriLankaMap highlighted={highlightedDistricts} />
                      <div className="text-xs text-gray-400 mt-2">Tip: If a place is not recognized, refine the place name (e.g. &quot;Nuwara Eliya&quot;).</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Hotels */}
              <div>
                <label className="block text-sm text-gray-200">7. Do you need Hotels & accommodation details also?</label>
                <div className="flex gap-4 mt-2">
                  <label className={`px-4 py-2 rounded cursor-pointer ${needHotels==='yes' ? "bg-blue-600/40" : "bg-white/6"}`}>
                    <input type="radio" name="needHotels" value="yes" checked={needHotels==='yes'} onChange={()=>setNeedHotels("yes")} className="mr-2" /> Yes
                  </label>
                  <label className={`px-4 py-2 rounded cursor-pointer ${needHotels==='no' ? "bg-blue-600/40" : "bg-white/6"}`}>
                    <input type="radio" name="needHotels" value="no" checked={needHotels==='no'} onChange={()=>setNeedHotels("no")} className="mr-2" /> No
                  </label>
                </div>
              </div>

              {/* Vehicle selection */}
              <div>
                <label className="block text-sm text-gray-200 mb-2">8. Select Your Preferred vehicle type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {VEHICLES.map((v) => (
                    <label key={v.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${vehicle===v.id ? "border-blue-500 bg-blue-600/20" : "border-white/6 bg-white/4"}`}>
                      <input type="radio" name="vehicle" value={v.id} checked={vehicle===v.id} onChange={() => setVehicle(v.id)} className="w-4 h-4" />
                      <VehicleIcon type={v.icon} />
                      <div>
                        <div className="font-medium">{v.title}</div>
                        <div className="text-sm text-gray-300">{v.pax}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm text-gray-200 mb-2">9. What activities do you like to do?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ACTIVITIES.map((act) => (
                    <label key={act} className="flex items-center gap-2 bg-white/6 p-2 rounded">
                      <input type="checkbox" checked={activities[act]} onChange={(e)=> setActivities((prev)=> ({...prev, [act]: e.target.checked}))} />
                      <span className="text-sm">{act}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-200">10A. Contact Number (WhatsApp) <span className="text-rose-400">*</span></label>
                  <div className="mt-1 flex gap-2">
                    <select value={contactCode} onChange={(e) => setContactCode(e.target.value)} className="bg-white/10 backdrop-blur px-3 py-2 rounded border border-white/10 min-w-[110px]">
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input value={contact} onChange={(e)=> setContact(e.target.value)} className="flex-1 bg-white/6 px-3 py-2 rounded" placeholder="7x xxx xxxx" />
                  </div>
                  {errors.contact && <div className="text-rose-400 text-sm mt-1">{errors.contact}</div>}
                </div>

                <div>
                  <label className="block text-sm text-gray-200">10B. Email <span className="text-rose-400">*</span></label>
                  <input value={email} onChange={(e)=> setEmail(e.target.value)} className="mt-1 w-full bg-white/6 px-3 py-2 rounded" placeholder="name@example.com" />
                  {errors.email && <div className="text-rose-400 text-sm mt-1">{errors.email}</div>}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={clearForm} className="px-4 py-2 rounded bg-white/6 hover:opacity-90">Clear</button>
                <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold">Submit Request</button>
              </div>
            </form>
          </div>

          {/* RIGHT / SUMMARY & MAP */}
          <div className="bg-white/5 p-6 rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="logo" width={64} height={64} />
              <div>
                <div className="font-bold">Pearl Transit Tours & Travels</div>
                <div className="text-sm text-gray-300">Plan Request Summary</div>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <div><span className="text-gray-300">Name:</span> <span className="font-medium">{name || "-"}</span></div>
              <div><span className="text-gray-300">Country:</span> <span className="font-medium">{COUNTRIES.find(c=>c.code===country)?.label || "-"}</span></div>
              <div><span className="text-gray-300">Adults / Children:</span> <span className="font-medium">{adults} / {children}</span></div>
              <div><span className="text-gray-300">Arrival:</span> <span className="font-medium">{arrivalDisplay}</span></div>
              <div><span className="text-gray-300">Days:</span> <span className="font-medium">{daysCount}</span></div>
              <div><span className="text-gray-300">Places:</span> <span className="font-medium">{places.length || "-"}</span></div>
              <div><span className="text-gray-300">Vehicle:</span> <span className="font-medium">{VEHICLES.find(v=>v.id===vehicle)?.title}</span></div>
              <div><span className="text-gray-300">Contact:</span> <span className="font-medium">{contact ? `${contactCode} ${contact}` : "-"}</span></div>
              <div><span className="text-gray-300">Email:</span> <span className="font-medium">{email || "-"}</span></div>
              <div><span className="text-gray-300">Places:</span> <span className="font-medium">{places.length ? places.join(", ") : "-"}</span></div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm text-gray-200 mb-2">Map Preview</h4>
              <div className="rounded bg-black/20 p-3">
                <SriLankaMap highlighted={highlightedDistricts} small />
              </div>
            </div>

            <div className="text-xs text-gray-400">We&#39;ll use this information to propose a personalized itinerary and quote.</div>
          </div>
        </div>

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-black/80 border border-green-600 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-green-600/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-green-300">Thank you for Connecting with Pearl Transit Tours...!!</h3>
              <p className="text-gray-300 mt-2">Your tour request is submitted successfully... We will contact you soon.. Have a Nice day!!!</p>

              <div className="w-full bg-white/10 rounded-full h-3 mt-6 overflow-hidden">
                <div style={{ width: `${progress}%` }} className="h-3 bg-green-500 transition-all"></div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ---------------------------
   Small helper components
   --------------------------- */

function VehicleIcon({ type }: { type?: string }) {
  // simple inline icons
  if (!type || type.startsWith("car")) {
    return (
      <svg className="w-10 h-10 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="7" width="20" height="7" rx="1.5" strokeWidth="1.5"/>
        <circle cx="7" cy="17.5" r="1.5" strokeWidth="1.5"/>
        <circle cx="17" cy="17.5" r="1.5" strokeWidth="1.5"/>
      </svg>
    );
  }
  // van
  return (
    <svg className="w-10 h-10 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="2" y="6" width="18" height="8" rx="1.2" strokeWidth="1.5"/>
      <circle cx="7" cy="16.5" r="1.5" strokeWidth="1.5"/>
      <circle cx="17" cy="16.5" r="1.5" strokeWidth="1.5"/>
    </svg>
  );
}

/* ---------------------------
   Simplified Sri Lanka SVG map
   - IDs correspond to district keys used above
   - This is a simplified illustrative map. You can replace with a proper district-accurate SVG paths.
   --------------------------- */
function SriLankaMap({ highlighted, small = false }: { highlighted: Record<string, boolean>, small?: boolean }) {
  // simplified rectangles as placeholders for districts
  // In production: replace with a proper district-accurate SVG paths.
  return (
    <svg viewBox="0 0 200 300" className={`${small ? "w-56" : "w-full"} h-auto rounded`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`.district { stroke:#c0c0c0; stroke-width:1 }`}</style>
      </defs>

      {/* Northern cluster */}
      <g id="north" transform="translate(40,10)">
        <rect id="jaffna" x="35" y="0" width="30" height="20" rx="2" fill={districtColor(highlighted, "jaffna")} className="district" />
        <rect id="trincomalee" x="70" y="40" width="30" height="20" rx="2" fill={districtColor(highlighted, "trincomalee")} className="district" />
        <rect id="anuradhapura" x="40" y="70" width="40" height="18" rx="2" fill={districtColor(highlighted, "anuradhapura")} className="district" />
        <rect id="polonnaruwa" x="90" y="80" width="35" height="16" rx="2" fill={districtColor(highlighted, "polonnaruwa")} className="district" />
      </g>

      {/* Central */}
      <g id="central" transform="translate(10,110)">
        <rect id="kandy" x="40" y="10" width="40" height="20" rx="2" fill={districtColor(highlighted, "kandy")} className="district" />
        <rect id="matale" x="10" y="40" width="40" height="16" rx="2" fill={districtColor(highlighted, "matale")} className="district" />
        <rect id="nuwara_eliya" x="60" y="50" width="40" height="18" rx="2" fill={districtColor(highlighted, "nuwara_eliya")} className="district" />
        <rect id="badulla" x="90" y="80" width="40" height="18" rx="2" fill={districtColor(highlighted, "badulla")} className="district" />
      </g>

      {/* West / South */}
      <g id="south" transform="translate(10,180)">
        <rect id="colombo" x="0" y="0" width="35" height="18" rx="2" fill={districtColor(highlighted, "colombo")} className="district" />
        <rect id="galle" x="60" y="30" width="40" height="18" rx="2" fill={districtColor(highlighted, "galle")} className="district" />
        <rect id="matara" x="100" y="40" width="40" height="16" rx="2" fill={districtColor(highlighted, "matara")} className="district" />
        <rect id="kalutara" x="20" y="30" width="30" height="12" rx="2" fill={districtColor(highlighted, "kalutara")} className="district" />
      </g>

      {/* South-East / East */}
      <g id="east" transform="translate(110,120)">
        <rect id="ampara" x="20" y="10" width="40" height="18" rx="2" fill={districtColor(highlighted, "ampara")} className="district" />
        <rect id="batticaloa" x="20" y="40" width="40" height="16" rx="2" fill={districtColor(highlighted, "batticaloa")} className="district" />
      </g>

      {/* Others */}
      <g id="others" transform="translate(120,30)">
        <rect id="kegalle" x="0" y="0" width="30" height="14" rx="2" fill={districtColor(highlighted, "kegalle")} className="district" />
        <rect id="ratnapura" x="0" y="20" width="30" height="14" rx="2" fill={districtColor(highlighted, "ratnapura")} className="district" />
        <rect id="kurunegala" x="0" y="40" width="30" height="14" rx="2" fill={districtColor(highlighted, "kurunegala")} className="district" />
      </g>

      {/* Legend */}
      <rect x="4" y="270" width="12" height="8" rx="1" fill="#1e90ff" />
      <text x="20" y="276" fontSize="6" fill="#cbd5e1">Selected District</text>
    </svg>
  );
}

function districtColor(highlighted: Record<string, boolean>, id: string) {
  return highlighted[id] ? "#1e90ff" : "#0f1724";
}
