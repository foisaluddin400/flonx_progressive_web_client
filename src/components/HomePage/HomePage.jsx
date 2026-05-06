'use client';
import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LocationIco from '../icon/LocationIco';
import Arrow from '../icon/Arrow';
import { useGetVenueQuery } from '@/redux/Api/venueApi';
import { Input } from 'antd';
import {
  Autocomplete,
  useJsApiLoader,
} from '@react-google-maps/api';
import GuestLoginEffect from "./GuestLoginEffect";
import { PageLoader } from "../Loading";

const HomePage = () => {
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [maxDistance, setMaxDistance] = useState(5);

  const [autocomplete, setAutocomplete] = useState(null);
  const [allVenues, setAllVenues] = useState([]);

  // ✅ Current location আলাদা রাখো — fallback এর জন্য
  const currentLocationRef = useRef({ lat: null, lng: null, address: "" });

  const { data: venue, isLoading } = useGetVenueQuery(
    { searchTerm, page: currentPage, limit: pageSize, lat, lng, maxDistance },
    { skip: !lat || !lng }
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // ✅ Reverse geocoding — lat/lng থেকে address বের করো
  const reverseGeocode = (latitude, longitude) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          setLocationValue(address);
          currentLocationRef.current.address = address;
        }
      }
    );
  };

  // ✅ Geolocation — current position নাও এবং field এ দেখাও
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentLat = pos.coords.latitude;
          const currentLng = pos.coords.longitude;

          setLat(currentLat);
          setLng(currentLng);
          setCurrentPage(1);
          setAllVenues([]);

          currentLocationRef.current.lat = currentLat;
          currentLocationRef.current.lng = currentLng;

          // ✅ Google Maps load হলে address দেখাও
          if (window.google) {
            reverseGeocode(currentLat, currentLng);
          } else {
            // Google Maps load হওয়ার আগে হলে wait করো
            const interval = setInterval(() => {
              if (window.google) {
                clearInterval(interval);
                reverseGeocode(currentLat, currentLng);
              }
            }, 300);
          }
        },
        (err) => console.error("Location permission denied", err)
      );
    }
  }, []);

  // ✅ venue data merge
  useEffect(() => {
    if (venue?.data?.result) {
      if (currentPage === 1) {
        setAllVenues(venue.data.result);
      } else {
        setAllVenues((prev) => [...prev, ...venue.data.result]);
      }
    }
  }, [venue, currentPage]);

  // ✅ infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        if (venue?.data?.meta?.totalPages > currentPage && !isLoading) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, venue, isLoading]);

  // ✅ Autocomplete থেকে নতুন location select
  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place?.geometry) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setLat(newLat);
        setLng(newLng);
        setCurrentPage(1);
        setAllVenues([]);
        setLocationValue(place.formatted_address);
      }
    }
  };

  // ✅ Location field empty হলে current location এ ফিরে যাও
  const handleLocationBlur = () => {
    if (!locationValue.trim() && currentLocationRef.current.lat) {
      setLat(currentLocationRef.current.lat);
      setLng(currentLocationRef.current.lng);
      setLocationValue(currentLocationRef.current.address);
      setCurrentPage(1);
      setAllVenues([]);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setAllVenues([]);
  };

  return (
    <div className="space-y-4 mt-20 p-3">
      <GuestLoginEffect />

      {/* 🔍 Search */}
      <div className="grid grid-cols-3 gap-3 items-center mt-4">
        <Input
          placeholder="Search Venue..."
          className="custom-input"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {isLoaded && (
          <Autocomplete
            onLoad={(auto) => setAutocomplete(auto)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Search location"
              className="custom-input"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
              onBlur={handleLocationBlur} // ✅ empty হলে current location ফিরে আসবে
            />
          </Autocomplete>
        )}

        <Input
          type="number"
          placeholder="Max Distance (km)"
          className="custom-input"
          value={maxDistance}
          disabled={!lat || !lng}
          onChange={(e) => {
            setMaxDistance(Number(e.target.value));
            setCurrentPage(1);
            setAllVenues([]);
          }}
        />
      </div>

      {/* 📦 Venue List */}
      {allVenues.map((item) => (
        <div
          key={item._id}
          className="bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]"
        >
          <Link href={"/venue/" + item._id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image
                  src={item.logo || "/img/shopImage.png"}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="w-[70px] h-[70px] object-cover rounded-2xl"
                />
                <div className="space-y-2">
                  <h2 className="text-[17px] text-white font-semibold">{item.name}</h2>
                  <span className={`py-[4px] px-[12px] rounded-full text-sm ${
                    item.isOpen ? "text-[#22C55E] bg-[#22C55E33]" : "text-[#EF4444] bg-[#EF444433]"
                  }`}>
                    {item.isOpen ? "• Open" : "• Closed"}
                  </span>
                  <p className="text-gray-400 text-[12px] flex gap-1 items-center">
                    <LocationIco /> {item.address}
                  </p>
                </div>
              </div>
              <Arrow />
            </div>
          </Link>
        </div>
      ))}

      {isLoading && <PageLoader />}
    </div>
  );
};

export default HomePage;