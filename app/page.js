"use client"
import React, { useEffect, useState } from 'react';
import ImageEditor from '@/components/ImageEditor';
import MobileView from '@/components/MobileView';

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    checkScreenSize(); 

    window.addEventListener('resize', checkScreenSize); 

    return () => window.removeEventListener('resize', checkScreenSize); 
  }, []);

  return (
    <div>
      {isMobile ? <MobileView /> : <ImageEditor />}
    </div>
  );
}

export default Home;
