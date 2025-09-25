import React from 'react';
import Hero from './Hero';
import FounderMessage from './FounderMessage';
import SchoolStats from './SchoolStats';
import Achievements from './Achievements';
import NewsEvents from './NewsEvents';
import Parents from './Parents';

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero />
      
      {/* Navigation Tabs */}
      <section className="mb-12">
        <div className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex -mb-px space-x-8 overflow-x-auto">
            <a className="flex items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2 px-1 whitespace-nowrap" href="admissions">
              <p className="text-base font-bold">Admissions</p>
            </a>
            <a className="flex items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 pb-3 pt-2 px-1 transition-colors whitespace-nowrap" href="academics">
              <p className="text-base font-bold">Academics</p>
            </a>
            <a className="flex items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 pb-3 pt-2 px-1 transition-colors whitespace-nowrap" href="facilities">
              <p className="text-base font-bold">Facilities</p>
            </a>
            <a className="flex items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 pb-3 pt-2 px-1 transition-colors whitespace-nowrap" href="gallery">
              <p className="text-base font-bold">Gallery</p>
            </a>
            <a className="flex items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 pb-3 pt-2 px-1 transition-colors whitespace-nowrap" href="contact">
              <p className="text-base font-bold">Contact</p>
            </a>
          </div>
        </div>
      </section>
      
      <FounderMessage />
      <SchoolStats />
      <Achievements />
      <NewsEvents />
      <Parents />
    </main>
  );
};

export default Home;
