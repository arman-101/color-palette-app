import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import {Filter} from 'bad-words';

const filter = new Filter();

const CreatePalette = () => {
  const [colors, setColors] = useState(['#FFFFFF', '#000000', '#FF0000', '#00FF00']);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleChangeColor = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filter.isProfane(title)) {
      toast.error('No profanity allowed in title');
      return;
    }
    try {
      await addDoc(collection(db, 'palettes'), {
        colors,
        title,
        createdAt: Timestamp.now(),
      });
      toast.success('Palette created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create palette');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Create Palette</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="flex mb-4">
          {colors.map((color, index) => (
            <input
              key={index}
              type="color"
              value={color}
              onChange={(e) => handleChangeColor(index, e.target.value)}
              className="w-16 h-16 mr-2 rounded-md"
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePalette;
