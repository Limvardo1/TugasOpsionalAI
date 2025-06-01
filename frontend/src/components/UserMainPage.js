import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMainPage.css';

const UserMainPage = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch places from backend API
    // For now, use dummy data
    setPlaces([
      { id: 1, name: 'Place 1 - General Knowledge' },
      { id: 2, name: 'Place 2 - Science' },
      { id: 3, name: 'Place 3 - History' },
    ]);
  }, []);

  const handlePlaceSelect = (placeId) => {
    // Navigate to quiz page with selected place
    navigate(`/quiz?placeId=${placeId}`);
  };

  return (
    <div className="user-main-container">
      <h1>Select a Place to Start Quiz</h1>
      <ul className="places-list">
        {places.map((place) => (
          <li key={place.id} className="place-item" onClick={() => handlePlaceSelect(place.id)}>
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMainPage;
