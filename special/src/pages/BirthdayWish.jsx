import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaInstagram } from 'react-icons/fa';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import BirthdayPage from './BirthdayPage';

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';
import img5 from '../assets/img5.jpeg';
import img6 from '../assets/img6.jpeg';
import img7 from '../assets/img7.jpeg';
import img8 from '../assets/img8.jpeg';
import img9 from '../assets/img9.jpeg';
import img10 from '../assets/img10.jpeg';
import img11 from '../assets/img11.jpeg';
import img12 from '../assets/img12.jpeg';
import img13 from '../assets/img13.jpeg';
import vid1 from '../assets/vid1.mp4';
import vid2 from '../assets/vid2.mp4';

const images = [
  { src: img1, caption: 'That moment… when the world paused for us' },
  { src: img2, caption: 'Together, we’re an endless vibe' },
  { src: img3, caption: 'Each memory beats with love' },
  { src: img4, caption: 'Laughter that lingers in the soul' },
  { src: img5, caption: 'Beneath the stars, just us' },
  { src: img6, caption: 'Smiles that time can’t erase' },
  { src: img7, caption: 'Hand in hand, dreaming out loud' },
  { src: img8, caption: 'Stitched together with love and moments' },
  { src: img9, caption: 'Echoes of love in every frame' },
  { src: img10, caption: 'Timeless love, captured in a glance' },
  { src: img11, caption: 'Forever us, forever magic' },
  { src: img12, caption: 'A frame full of feelings' },
  { src: img13, caption: 'In your arms, I find home' },
  { src: vid1, caption: 'Our love, unfolding in motion ❤️' },
  { src: vid2, caption: 'Every step, a rhythm of love 💃' },
];


export default function MirrorOfMemories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBirthdayPage, setShowBirthdayPage] = useState(false);
  const slideshowRef = useRef(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, []);

  // Swipe support
  useEffect(() => {
    const slider = slideshowRef.current;
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => (startX = e.touches[0].clientX);
    const handleTouchMove = (e) => (endX = e.touches[0].clientX);
    const handleTouchEnd = () => {
      if (startX - endX > 50) goToNext();
      if (endX - startX > 50) goToPrevious();
    };

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Show BirthdayPage on manual click only
  if (showBirthdayPage) {
    return <BirthdayPage />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden text-gray-800">
      <h1 className="text-5xl font-bold text-pink-500 tracking-widest mb-8 text-center">
        Mirror of Memories
      </h1>

      <div
        className="relative w-full max-w-6xl h-[700px] flex items-center justify-center overflow-hidden"
        ref={slideshowRef}
      >
        <button
          onClick={goToPrevious}
          className="absolute left-2 z-30 text-4xl text-pink-300 hover:text-pink-500 transition-all"
        >
           🐼
        </button>

        <div className="relative w-full h-full">
         {images.map((img, index) => {
  const isActive = index === currentIndex;
  const offsetIndex = index - currentIndex;
  let translateX = offsetIndex * 220;

  return (
    <div
      key={index}
      className={`absolute top-1/2 left-1/2 transform transition-all duration-500 ease-in-out ${
        isActive
          ? 'z-20 scale-125 opacity-100 blur-0 w-72 h-[450px] border-4 border-white shadow-xl'
          : 'z-10 scale-90 opacity-30 blur-sm w-40 h-[300px]'
      } rounded-xl overflow-hidden`}
      style={{
        transform: `translate(-50%, -50%) translateX(${translateX}px)`,
      }}
    >
      {img.src.includes('.mp4') ? (
        <video
          src={img.src}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={img.src}
          alt={`Memory ${index + 1}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
})}
        </div>

        <button
          onClick={goToNext}
          className="absolute right-2 z-30 text-4xl text-pink-300 hover:text-pink-500 transition-all"
        >
        🐢
        </button>
      </div>

      <p className="mt-2text-xl font-medium text-center max-w-xl">
        {images[currentIndex].caption}
      </p>

      <button
        className="mt-6 px-6 py-3 rounded-full bg-pink-500 text-white font-semibold text-lg shadow-md hover:bg-pink-600 transition-all"
        onClick={() => setShowBirthdayPage(true)}
      >
        🎁 Click to Reveal Birthday Surprise
      </button>
    </div>
  );
}
