"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X, CheckCircle } from "lucide-react";

declare global {
  interface Window {
    google: typeof google;
    initAutocomplete: () => void;
  }
}

const inputClass = "w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition";
const selectClass = "w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500/50 transition";
const buttonClass = "px-6 py-2 rounded-lg font-semibold transition-all duration-300";

export default function QuickTaxi() {
  const [activeTab, setActiveTab] = useState("immediate");
  const RECEIVER_WHATSAPP = "94711233979";

  const [imName, setImName] = useState("");
  const [imCountry, setImCountry] = useState("");
  const [imLocation, setImLocation] = useState("");
  const [imDesc, setImDesc] = useState("");
  const [imPassengers, setImPassengers] = useState("");
  const [imWhatsapp, setImWhatsapp] = useState("");
  const [imCountryCode, setImCountryCode] = useState("+94");

  const [fuName, setFuName] = useState("");
  const [fuCountry, setFuCountry] = useState("");
  const [fuAdults, setFuAdults] = useState(0);
  const [fuChildren, setFuChildren] = useState(0);
  const [fuLocation, setFuLocation] = useState("");
  const [fuVehicle, setFuVehicle] = useState("");
  const [fuPlaces, setFuPlaces] = useState<string[]>([]);
  const [newPlace, setNewPlace] = useState("");
  const [fuDateFrom, setFuDateFrom] = useState("");
  const [fuDateTo, setFuDateTo] = useState("");
  const [fuTourType, setFuTourType] = useState("");
  const [fuWhatsapp, setFuWhatsapp] = useState("");
  const [fuCountryCode, setFuCountryCode] = useState("+94");

  const [popup, setPopup] = useState(false);
  const [popupMsg1, setPopupMsg1] = useState("");
  const [popupMsg2, setPopupMsg2] = useState("");

  const [imLocationLoading, setImLocationLoading] = useState(false);
  const [fuLocationLoading, setFuLocationLoading] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);

  const imLocationRef = useRef<HTMLInputElement>(null);
  const fuLocationRef = useRef<HTMLInputElement>(null);

  const countries = ["Sri Lanka", "India", "UK", "USA", "Australia", "Germany", "France", "Japan"];
  const countryCodes = [
    { code: "+94", country: "Sri Lanka" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+1", country: "USA" },
    { code: "+61", country: "Australia" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+81", country: "Japan" },
  ];

  const validateImmediate = () => imName && imCountry && imLocation && imDesc && imPassengers && imWhatsapp;
  const validateFuture = () => fuName && fuCountry && fuLocation && fuWhatsapp && fuVehicle && fuDateFrom && fuTourType;

  const submitImmediate = () => {
    if (!validateImmediate()) return alert("Please fill all required fields.");
    const msg = `🚕 *Immediate Taxi Request* %0AName: ${imName}%0ACountry: ${imCountry}%0APickup: ${imLocation}%0ADescription: ${imDesc}%0APassengers: ${imPassengers}%0AWhatsApp: ${imCountryCode}${imWhatsapp}`;
    window.open(`https://wa.me/${RECEIVER_WHATSAPP}?text=${msg}`, "_blank");
    setPopupMsg1("Request Submitted!");
    setPopupMsg2("We'll contact you via WhatsApp shortly...");
    setPopup(true);
    setTimeout(() => (window.location.href = "/"), 3000);
  };

  const submitFuture = () => {
    if (!validateFuture()) return alert("Please fill all required fields.");
    const msg = `🗓 *Future Taxi Request* %0AName: ${fuName}%0ACountry: ${fuCountry}%0AAdults: ${fuAdults}, Children: ${fuChildren}%0APickup: ${fuLocation}%0AVehicle: ${fuVehicle}%0APlaces: ${fuPlaces.join(", ")}%0AFrom: ${fuDateFrom}%0ATo: ${fuDateTo}%0ATour Type: ${fuTourType}%0AWhatsApp: ${fuCountryCode}${fuWhatsapp}`;
    window.open(`https://wa.me/${RECEIVER_WHATSAPP}?text=${msg}`, "_blank");
    setPopupMsg1("Thank You!");
    setPopupMsg2("We will contact you soon with details...");
    setPopup(true);
    setTimeout(() => (window.location.href = "/"), 3000);
  };

  const addPlace = () => {
    if (newPlace.trim() === "") return;
    setFuPlaces([...fuPlaces, newPlace]);
    setNewPlace("");
  };

  const getCurrentLocation = (isImmediate: boolean) => {
    if (isImmediate) {
      setImLocationLoading(true);
    } else {
      setFuLocationLoading(true);
    }
    setLocationAccuracy(null);

    // Check if running on HTTPS or localhost
    if (typeof window !== "undefined" && window.location.protocol !== "https:" && !window.location.hostname.includes("localhost")) {
      alert("⚠️ Location services require HTTPS. Please use a secure connection.");
      if (isImmediate) setImLocationLoading(false);
      else setFuLocationLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser. Please use Chrome, Firefox, or Safari.");
      if (isImmediate) setImLocationLoading(false);
      else setFuLocationLoading(false);
      return;
    }

    console.log("🔍 Requesting location permission...");

    // Wait 2 seconds before capturing location for better accuracy
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("✅ Location detected:", position);
          const { latitude, longitude, accuracy } = position.coords;
          setLocationAccuracy(accuracy);

          // Reverse geocoding using Google Maps API
          if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = { lat: latitude, lng: longitude };

            geocoder.geocode({ location: latlng }, (results, status) => {
              console.log("Geocoding status:", status, results);
              if (status === "OK" && results && results[0]) {
                const address = results[0].formatted_address;
                if (isImmediate) {
                  setImLocation(address);
                  setImLocationLoading(false);
                } else {
                  setFuLocation(address);
                  setFuLocationLoading(false);
                }
              } else {
                const fallbackAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                if (isImmediate) {
                  setImLocation(fallbackAddress);
                  setImLocationLoading(false);
                } else {
                  setFuLocation(fallbackAddress);
                  setFuLocationLoading(false);
                }
              }
            });
          } else {
            // Fallback to coordinates if Google Maps not loaded
            console.warn("⚠️ Google Maps not loaded, using coordinates");
            const fallbackAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            if (isImmediate) {
              setImLocation(fallbackAddress);
              setImLocationLoading(false);
            } else {
              setFuLocation(fallbackAddress);
              setFuLocationLoading(false);
            }
          }
        },
        (error) => {
          console.error("❌ Location error:", error);
          let errorMsg = "Unable to retrieve your location. ";
          let details = "";
          
          if (error.code === 1) {
            errorMsg = "🚫 Location Permission Denied";
            details = "Please enable location access in your browser settings:\n\n" +
                     "Chrome: Click the lock icon → Site Settings → Location → Allow\n" +
                     "Firefox: Click the shield icon → Permissions → Location → Allow\n" +
                     "Safari: Settings → Privacy → Location Services → Enable";
          } else if (error.code === 2) {
            errorMsg = "📍 Location Unavailable";
            details = "Make sure:\n• GPS is enabled on your device\n• You're not using a VPN\n• Location services are turned on";
          } else if (error.code === 3) {
            errorMsg = "⏱️ Location Request Timeout";
            details = "The location request took too long. Please try again.";
          }
          
          alert(errorMsg + "\n\n" + details);
          if (isImmediate) setImLocationLoading(false);
          else setFuLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    }, 2000); // Wait 2 seconds before requesting location for better accuracy
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof window !== "undefined" && !window.google) {
        const script = document.createElement("script");
        // Your API key with Places API enabled
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBkoo-Y-xv5Ia3k0W7g62SNYsOi2650Ahw&libraries=places,geocoding&callback=initAutocomplete`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error("Failed to load Google Maps API. Please check your API key and ensure these APIs are enabled in Google Cloud Console:\n- Maps JavaScript API\n- Places API\n- Geocoding API");
        };
        document.head.appendChild(script);
        (window as Window & typeof globalThis).initAutocomplete = initAutocomplete;
      } else if (window.google) {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (!window.google) return;

      if (imLocationRef.current) {
        const imAutocomplete = new window.google.maps.places.Autocomplete(imLocationRef.current, {
          types: ["geocode"],
          componentRestrictions: { country: "lk" },
        });
        imAutocomplete.addListener("place_changed", () => {
          const place = imAutocomplete.getPlace();
          if (place.formatted_address) {
            setImLocation(place.formatted_address);
          }
        });
      }

      if (fuLocationRef.current) {
        const fuAutocomplete = new window.google.maps.places.Autocomplete(fuLocationRef.current, {
          types: ["geocode"],
          componentRestrictions: { country: "lk" },
        });
        fuAutocomplete.addListener("place_changed", () => {
          const place = fuAutocomplete.getPlace();
          if (place.formatted_address) {
            setFuLocation(place.formatted_address);
          }
        });
      }
    };

    loadGoogleMaps();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1d3b] via-black to-gray-900 text-white pt-24 pb-10 px-4">

      {/* Back Button */}
      <button onClick={() => (window.location.href = "/")} className="fixed right-5 top-5 bg-white/10 hover:bg-white/20 p-2 rounded-full z-40 transition">
        <ArrowLeft className="text-white w-5 h-5" />
      </button>

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Quick Taxi Service</h1>
        <p className="text-center text-gray-400 mb-10">Book your ride instantly or plan ahead with us</p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab("immediate")}
            className={`${buttonClass} ${activeTab === "immediate" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            🚖 Immediate Tour
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab("future")}
            className={`${buttonClass} ${activeTab === "future" ? "bg-green-600 text-white shadow-lg shadow-green-500/50" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            📅 Future Tour
          </motion.button>
        </div>

        {/* Immediate Tour Form */}
        {activeTab === "immediate" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-xl space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-blue-300">Full Name *</label>
                <input type="text" className={inputClass} placeholder="Your name" value={imName} onChange={(e) => setImName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-blue-300">Country *</label>
                <select className={selectClass} value={imCountry} onChange={(e) => setImCountry(e.target.value)}>
                  <option value="" className="bg-gray-800">Select Country</option>
                  {countries.map((c) => <option key={c} value={c} className="bg-gray-800">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-blue-300">Pickup Location *</label>
                <div className="flex gap-2">
                  <input ref={imLocationRef} type="text" className={inputClass} placeholder="Search location..." value={imLocation} onChange={(e) => setImLocation(e.target.value)} />
                  <button
                    type="button"
                    onClick={() => getCurrentLocation(true)}
                    disabled={imLocationLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition min-w-[120px]"
                  >
                    {imLocationLoading ? "Locating..." : "📍 Current"}
                  </button>
                </div>
                {imLocationLoading && (
                  <p className="text-xs text-blue-300 mt-1 animate-pulse">🔍 Detecting your location with high accuracy...</p>
                )}
                {locationAccuracy !== null && !imLocationLoading && activeTab === "immediate" && (
                  <p className="text-xs text-green-400 mt-1">✓ Location accuracy: ±{Math.round(locationAccuracy)}m</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-blue-300">Number of Passengers *</label>
                <input type="number" className={inputClass} placeholder="Passengers" value={imPassengers} onChange={(e) => setImPassengers(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-300">Tour Description *</label>
              <textarea className={`${inputClass} resize-none`} placeholder="Describe your trip needs..." rows={4} value={imDesc} onChange={(e) => setImDesc(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-300">WhatsApp Number *</label>
              <div className="flex gap-2">
                <select className={`${selectClass} w-32`} value={imCountryCode} onChange={(e) => setImCountryCode(e.target.value)}>
                  {countryCodes.map((cc) => (
                    <option key={cc.code} value={cc.code} className="bg-gray-800">{cc.code}</option>
                  ))}
                </select>
                <input type="tel" className={inputClass} placeholder="Your WhatsApp number" value={imWhatsapp} onChange={(e) => setImWhatsapp(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${buttonClass} bg-white/10 hover:bg-white/20 text-white flex-1`}
                onClick={() => { setImName(""); setImCountry(""); setImLocation(""); setImDesc(""); setImPassengers(""); setImWhatsapp(""); setImCountryCode("+94"); }}
              >
                Clear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${buttonClass} bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-lg shadow-blue-600/50`}
                onClick={submitImmediate}
              >
                Submit Request
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Future Tour Form */}
        {activeTab === "future" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-xl space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-green-300">Full Name *</label>
                <input type="text" className={inputClass} placeholder="Your name" value={fuName} onChange={(e) => setFuName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-green-300">Country *</label>
                <select className={selectClass} value={fuCountry} onChange={(e) => setFuCountry(e.target.value)}>
                  <option value="" className="bg-gray-800">Select Country</option>
                  {countries.map((c) => <option key={c} value={c} className="bg-gray-800">{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300">Passengers *</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 flex justify-between items-center">
                  <span>Adults: {fuAdults}</span>
                  <div className="flex gap-2">
                    <button className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded" onClick={() => setFuAdults(fuAdults + 1)}>+</button>
                    <button className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded" onClick={() => fuAdults > 0 && setFuAdults(fuAdults - 1)}>−</button>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 flex justify-between items-center">
                  <span>Children: {fuChildren}</span>
                  <div className="flex gap-2">
                    <button className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded" onClick={() => setFuChildren(fuChildren + 1)}>+</button>
                    <button className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded" onClick={() => fuChildren > 0 && setFuChildren(fuChildren - 1)}>−</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300">Pickup Location *</label>
              <div className="flex gap-2">
                <input ref={fuLocationRef} type="text" className={inputClass} placeholder="Search location..." value={fuLocation} onChange={(e) => setFuLocation(e.target.value)} />
                <button
                  type="button"
                  onClick={() => getCurrentLocation(false)}
                  disabled={fuLocationLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition min-w-[120px]"
                >
                  {fuLocationLoading ? "Locating..." : "📍 Current"}
                </button>
              </div>
              {fuLocationLoading && (
                <p className="text-xs text-green-300 mt-1 animate-pulse">🔍 Detecting your location with high accuracy...</p>
              )}
              {locationAccuracy !== null && !fuLocationLoading && activeTab === "future" && (
                <p className="text-xs text-green-400 mt-1">✓ Location accuracy: ±{Math.round(locationAccuracy)}m</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300">Preferred Vehicle *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Hatchback (1-2)", "Sedan (1-3)", "Mini SUV (1-3)", "Flatroof Van (1-5)", "Highroof Van (1-8)"].map((v) => (
                  <label key={v} className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-white/20 cursor-pointer">
                    <input type="radio" name="vtype" value={v} onChange={() => setFuVehicle(v)} className="w-4 h-4" />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300">Destinations</label>
              <div className="flex gap-2 mb-3">
                <input type="text" className={inputClass} placeholder="Add a place..." value={newPlace} onChange={(e) => setNewPlace(e.target.value)} />
                <motion.button whileHover={{ scale: 1.05 }} className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-semibold" onClick={addPlace}>Add</motion.button>
              </div>
              {fuPlaces.length > 0 && (
                <div className="bg-white/5 p-3 rounded-lg max-h-40 overflow-y-auto">
                  {fuPlaces.map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> {p}</span>
                      <button className="text-red-400 hover:text-red-300" onClick={() => setFuPlaces(fuPlaces.filter((_, idx) => idx !== i))}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-green-300">Start Date *</label>
                <input type="date" className={inputClass} value={fuDateFrom} onChange={(e) => setFuDateFrom(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-green-300">End Date *</label>
                <input type="date" className={inputClass} value={fuDateTo} onChange={(e) => setFuDateTo(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300">Tour Type *</label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="tourtype" value="Drop Only" onChange={() => setFuTourType("Drop Only")} className="w-4 h-4" />
                  <span>Drop Only</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="tourtype" value="Up & Down" onChange={() => setFuTourType("Up & Down")} className="w-4 h-4" />
                  <span>Up & Down</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300">WhatsApp Number *</label>
              <div className="flex gap-2">
                <select className={`${selectClass} w-32`} value={fuCountryCode} onChange={(e) => setFuCountryCode(e.target.value)}>
                  {countryCodes.map((cc) => (
                    <option key={cc.code} value={cc.code} className="bg-gray-800">{cc.code}</option>
                  ))}
                </select>
                <input type="tel" className={inputClass} placeholder="Your WhatsApp number" value={fuWhatsapp} onChange={(e) => setFuWhatsapp(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${buttonClass} bg-white/10 hover:bg-white/20 text-white flex-1`}
                onClick={() => { setFuName(""); setFuCountry(""); setFuAdults(0); setFuChildren(0); setFuLocation(""); setFuVehicle(""); setFuPlaces([]); setFuDateFrom(""); setFuDateTo(""); setFuTourType(""); setFuWhatsapp(""); setFuCountryCode("+94"); }}
              >
                Clear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${buttonClass} bg-green-600 hover:bg-green-700 text-white flex-1 shadow-lg shadow-green-600/50`}
                onClick={submitFuture}
              >
                Submit Request
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Success Popup */}
      {popup && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8 rounded-xl text-center max-w-sm">
            <button onClick={() => setPopup(false)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full">
              <X className="text-white w-5 h-5" />
            </button>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{popupMsg1}</h2>
            <p className="text-gray-300">{popupMsg2}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
