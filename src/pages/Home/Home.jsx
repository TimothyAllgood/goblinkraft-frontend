import React, { useEffect, useState } from "react";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useOutletContext } from "react-router-dom";
import GeneratorCard from "../../components/GeneratorCard/GeneratorCard";
import Hero from "../../components/Hero/Hero";

function Home() {
  const { setSidebarOpen } = useOutletContext();
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const generators = [
    {
      id: 1,
      name: "Random Character Generator",
      description: "Generate a random character for your DnD campaign.",
    },
  ];

  return (
    <>
      <Hero />
    </>
  );
}

export default Home;
