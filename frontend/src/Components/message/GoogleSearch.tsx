import React, { useEffect } from 'react'

export default function GoogleSearch() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=f7085b2dd6a9f4a99';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [])

  return (
    <div className="gcse-search"></div>
  )
}