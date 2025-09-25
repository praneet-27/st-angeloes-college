import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBSRdIx3u19IHy_EEc8AMuPOH93T5FtY6L0IOPr4s6JOE5HUYWi8uBRvaIPzG_OkGH0AAXy_zedl3egJCzr4MhggoqzxiqRURAI61fnUvfppjjQOTH2qQT4afCTYvGi_wgHkC7jmgkRS21fsw_326GpUqDjw2N4HS9LpGgZfVno6FBpg__mYGaq-KBidRxlhR0DteLqZveEUOC2XkxkVVYQlQUt8oY9KNg-wlnKO0po88Gd_FnmtaS4SIrJXfw9B1UrlCVhPKJxD8rB";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="mb-12">
      <div 
        className={`relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[500px] p-8 shadow-lg transition-all duration-1000 ease-out transform hover:shadow-2xl hover:scale-[1.02] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(107, 33, 168, 0.7) 0%, rgba(107, 33, 168, 0) 40%), url("${heroImageUrl}")`
        }}
      >
        <div className="relative">
          <h2 className={`text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-2xl transition-all duration-1000 delay-300 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            To Love and To Serve
          </h2>
          <div className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-gold to-primary transition-all duration-1000 delay-700 ease-out transform ${
            isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
