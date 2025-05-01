import React from 'react';

export const PublicationsMarquee = () => {
  // Using reliable URLs for actual publication logos with better quality
  const publications = [
    {
      name: "Times of India",
      logoUrl: "https://fidelitusgallery.com/wp-content/uploads/2020/02/times-of-india-logo-png-2.png",
    },
    {
      name: "Mint",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Mint_%28newspaper%29_logo.svg/2560px-Mint_%28newspaper%29_logo.svg.png",
    },
    {
      name: "The Economic Times",
      logoUrl: "https://reddotreps.com/wp-content/uploads/2024/04/Red-Dot-News-Logo-Economic-Times-optimized.png",
    },
    {
      name: "Business Line",
      logoUrl: "https://tbl.ca/cdn/shop/files/TBL_LOGO_March_2021_Transparent_BG_002.png?v=1617487945",
    },
    {
      name: "India Today",
      logoUrl: "https://www.freelogovectors.net/wp-content/uploads/2022/06/india-today-logo-freelogovectors.net_.png",
    },
    {
      name: "The Hindu",
      logoUrl: "https://www.ncbs.res.in/sites/default/files/styles/news_image/public/TheHindu-Logo_3.png?itok=MXZC35C7",
    }
  ];

  // Apply fixed, equal spacing between all logos
  return (
    <div className="w-full overflow-hidden bg-white py-8">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {publications.map((pub, index) => (
            <div 
              key={`original-${index}`} 
              className="flex items-center justify-center"
              style={{ width: '200px', padding: '0 30px' }}
            >
              <div className="h-[60px] w-full flex items-center justify-center">
                <img 
                  src={pub.logoUrl} 
                  alt={pub.name} 
                  className="h-full max-w-full object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Duplicate for continuous scrolling */}
        <div className="flex animate-marquee">
          {publications.map((pub, index) => (
            <div 
              key={`duplicate-${index}`} 
              className="flex items-center justify-center"
              style={{ width: '200px', padding: '0 30px' }}
            >
              <div className="h-[60px] w-full flex items-center justify-center">
                <img 
                  src={pub.logoUrl} 
                  alt={pub.name} 
                  className="h-full max-w-full object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 