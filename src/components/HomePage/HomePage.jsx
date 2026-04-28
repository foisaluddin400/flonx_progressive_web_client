'use client';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LocationIco from '../icon/LocationIco';
import Arrow from '../icon/Arrow';
import { useGetVenueQuery } from '@/redux/Api/venueApi';
import { Input } from 'antd';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import GuestLoginEffect from "./GuestLoginEffect";
import { PageLoader } from "../Loading";

const containerStyle = {
  width: '100%',
  height: '300px',
};

const HomePage = () => {
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [maxDistance, setMaxDistance] = useState(5);

  const [position, setPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);

  // 🔥 all venues for infinite scroll
  const [allVenues, setAllVenues] = useState([]);

const { data: venue, isLoading } = useGetVenueQuery(
  {
    searchTerm,
    page: currentPage,
    limit: pageSize,
    lat,
    lng,
    maxDistance,
  },
  {
    skip: !lat || !lng, // ✅ important
  }
);
  console.log(venue)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentLat = pos.coords.latitude;
        const currentLng = pos.coords.longitude;

        setLat(currentLat);
        setLng(currentLng);
        setPosition({ lat: currentLat, lng: currentLng });

        // reset for fresh load
        setCurrentPage(1);
        setAllVenues([]);
      },
      (err) => {
        console.error("Location permission denied", err);
      }
    );
  }
}, []);
  // ✅ merge data
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

  // ✅ location select
const handlePlaceChanged = () => {
  if (autocomplete) {
    const place = autocomplete.getPlace();
    if (place?.geometry) {
      const newLat = place.geometry.location.lat();
      const newLng = place.geometry.location.lng();

      setLat(newLat);
      setLng(newLng);
      setPosition({ lat: newLat, lng: newLng });

      setCurrentPage(1);
      setAllVenues([]);

      map?.panTo({ lat: newLat, lng: newLng });
      setLocationValue(place.formatted_address);
    }
  }
};

  // ✅ search reset
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
            />
          </Autocomplete>
        )}

      <Input
  type="number"
  placeholder="Max Distance (km)"
  className="custom-input"
  value={maxDistance}
  disabled={!lat || !lng} // ✅ disable
  onChange={(e) => {
    setMaxDistance(Number(e.target.value));
    setCurrentPage(1);
    setAllVenues([]);
  }}
/>
      </div>

      {/* 🗺️ Map */}
      {isLoaded && position && (
        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={14}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={position} />
          </GoogleMap>
        </div>
      )}

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
                  <h2 className="text-[17px] text-white font-semibold">
                    {item.name}
                  </h2>

                  <span
                    className={`py-[4px] px-[12px] rounded-full text-sm ${
                      item.isOpen
                        ? "text-[#22C55E] bg-[#22C55E33]"
                        : "text-[#EF4444] bg-[#EF444433]"
                    }`}
                  >
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

      {/* ⏳ Loading */}
      {isLoading && (
        <PageLoader></PageLoader>
      )}
    </div>
  );
};

export default HomePage;