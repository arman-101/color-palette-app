import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    const fetchPalettes = async () => {
      const querySnapshot = await getDocs(collection(db, 'palettes'));
      const sortedPalettes = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate())); // Sort by most recent
      setPalettes(sortedPalettes);
    };

    fetchPalettes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'palettes', id));
      setPalettes(palettes.filter(palette => palette.id !== id)); // Remove from local state
      toast.success('Palette deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete palette');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">Palettes</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create Palette
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {palettes.map((palette) => (
          <div key={palette.id} className="border border-gray-300 rounded-md p-4 bg-gray-100">
            <div className="flex mb-4">
              {palette.colors.map((color, idx) => (
                <div
                  key={idx}
                  className={`h-16 flex-1 ${idx === 0 ? 'rounded-l-md' : ''} ${idx === palette.colors.length - 1 ? 'rounded-r-md' : ''}`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">{palette.title}</p>
              <p>{new Date(palette.createdAt.toDate()).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between">
              <Link to={`/palette/${palette.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                View Details
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(palette.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
