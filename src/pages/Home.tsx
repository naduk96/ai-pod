import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import "../styles/Home.css";
import mockPodcasts from "../data/mockdata.json"; // Import the mock JSON data


interface Podcast {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  tags: string[];
  link: string;
}

const Home: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    // Simulate fetching data from the JSON file
    const fetchPodcasts = async () => {
      setPodcasts(mockPodcasts);
    };

    fetchPodcasts();
  }, []);

  return (
  
    <div className="home-page">
      <h1>Discover the Best Business Podcasts</h1>
      <div className="podcast-grid">
        {podcasts.map((podcast) => (
          <Card key={podcast.id} {...podcast} />
        ))}
      </div>
    </div>


  );
};

export default Home;
