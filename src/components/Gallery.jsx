import React, { useEffect, useState, useRef } from 'react';

const Gallery = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Photos');
  const sectionRef = useRef(null);

  useEffect(() => {
    // Page load animations
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setTabsVisible(true), 300);
    const timer3 = setTimeout(() => setGalleryVisible(true), 500);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation triggered when section is visible
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);

  const galleryTabs = ['Photos', 'Videos', 'Annual Day', 'Sports', 'Cultural Events', 'Classroom'];

  const galleryImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2DPDXaP2bClBIW30e1KUwgbkFSt6LnwJkTj1v18ABmNkeUwFkZKVWuGSQ86c0BgdU0MCvl4mn2cyKAWFo7TQtzsxmccWxaQoMlO5n2hkDQbywhMvWJoMnGZZe-2DpqY-ykusbh3JJ0O1tj64Kfyr39vRj8N1L8CtwMTmtEQbJ0fUThZtPUyYNx2g-YV_KsB9xYsawDkaS_2L9RClEaNZzbeNK7ymr5HWvcTMb77iwGEIyIUKcwewRfWH5Oy-Ka-sgUgtM2ScBgmpf',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDZLkCj-dHBGKOkJMrGWJdRdY78KclnOcT1BVRCh8-pjjm091FXRRfnoqU9uN2k6-IKC7Xw1ooPkp09NbsunjduZKSPb-Bx0J_c2_C5sTUI0HZEEWVIRik7X7LxoIQQXxz-xCBKKw5VQNH9ltIYgs2QPLzbh8LvBgoDFx-25tyeewABjlel5fJVKws448xyFB8NgjDTTviI2SHAxYAn-ENtACpk1dcgmouw430fBmGcxFeW4SOM6-dAaffREzDRsHfe2NG50qnrNVNQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBSyVXzM_9D1COMS5yOpA1rEPay5aOi5Ch_DAeuu5QJ33vlvGJUXN5Zi-O7kg4nGHHPUfSvYMp0Y1osmdgGXDLVBKdLlFbS2zbfbRiVSBWPwt_WKgi2PJ81O_ETIoGTdpRnE8vlOkHNNl8ic6vngfY-VRUhUk7mBT1USFAqN8DErnPhVlbBBwgZRPQDiAVFX5n4gyySbjzkdTNpGrqJ_lKhOWpimiRoiigTRztkcSOBz9SpHQzlhxZkNckdOi8Lo-c_0Fcen1MyXx8u',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBSWGSDJHdbw4iCOclQIBnZDmEIg5p-Q3dWmSpTq1SvZwM1FehUqZEOOa5MGhrgmDYKNxSXb_bn1vQTuWRVmpgqemOeO9NuQUgX_VC3tdbU1yYnSyhaNFseLfRq-k406bIjTNj_zBQjQUFeucpWVCmAu2_cuK59eqioXSYa5wuAJ2AhXIvoIAfr01RTjByKQ7VMqQrGeYaMy3hhzKoho5HQtfISCNECxHGSQv8-hTP625vy1P3owem1qRinl4FVTN24_ECvc43cs7WK',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDY1VcFn6TdeHh7Kr2JeSU5OAJbXu8E9zhELUT0yk4RV5n0DCSkh8hAAEEhvfi5OfhfLdNcOXyQJIga64wmzRQ-FydfMHjLdWTbilTBkCi71_BOgYWRWlDcSYkN_hWXNliNpGszh16uojZawZ8AQgTmsH680i-CJIInlKkUcd25k_HRoDT9W1DQrpt2Ra1_UGE2szc3bLNw_HYX-e8jp8Qekkpj3zRNtY1kbukjzrVeeGX-7LmoKVolqbNazzLWjo-uuQIpVa4rWexN',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhKA74nGRQz92jg5gbWW4RqRgeHXSrlYTnIiHlkmaIXz56ZqgakLXGdvEPCpPBpAth172-DJuDgkFAdL4oiTYUODVeTZqlAlVry3M-GspZyNUTT19OclI5KNBHvcA87CsCpw6pgaTrUV99JeQFRQQaGm5XunWdQmwLBCl53VvjWElkKatJe_BVd5ZjxpqdEu-I7LddhetsPiLDiqC3BJP2QT1iERDycFabo8op89lRp_tl06wgt2ixNZ2QZfTfk-T1342btUJldGeW',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK8u4eJtu9RL2fYf27T0X_tsWT2N6eTwLQ_pW7jduPMcs1gM70pQqRFZFRMTmNMTXoctyAWJU1eY8gU1vFSrZ_n117FqzOVXY-UU6ZH8zwI1tTNT9dJt1N3rOqkN3yq5ZsCdHBW16NThcQbL7aKgvgeYnQZOVi0wgErr1-Mq3mt-Pxo4cjxFE1DMnqeK8X1sJxhbdj7AT-MRpyxT_0OFvV2QDc3E6DGrDJo3pQ3BTaQEYMaeeACQQnlVpWtfKcCo5uvJ9k5SA2FYw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBbx_NazlBewYHRrNMvp6wmALWgqT-tXCEX5Wjm8emDWIcPY5NalMOLvotcocOYuT1O6vsUkcU3fYJNcvS5MxfhBQR7ZPMjuSAlzg6iljmw-1l2lJuOnhKbV_ZmF3xBJPz6Ypr5VC-EhaYVrdjNZsEJU1U3iDBI6xwtKyjOvuWUwYMvmpHc8Ylc9tfmNdDbfEByMn7KuH_1BpO8ltP8T4KqURawLF7btcQYj2alfQxq3Yp7s9yjl_YaF2GIA9V8I77PSEQesnf-BQli',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDjO3RJCh8WZH4FHx1pWC51_kxFu1MlargUlKf04qW0Nz7mU7QbxHVELRCSPG5UMPwrcXVordgvUqD2g9dtHPI5PbWZRt2dP1gTdgV9Ars93wP0LqNskUpfHydDW3R4U7EtcIclVV0z6BpypixKP58wZDmycqA5HKTnlN8VTwy_arSjmdllnxCWQ2zMjc_5JyQX7bXBh-GCJiWU2KzxFltJy5h1TSepZigKkj4Tc53PVhYv_u3o1xSb5r2Eettek0g6ulXojl2INhTU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdmNS8ar7aJbr_kLdoDPa2b42qUKndv-cG0IXnKT5uQQtrChRgsKz1_IsrBQcv8Iz9-buTcFsL5Y0UqSy_3acdpPEvNVFqbcOKFUkBcOBkGp0Mcb0ctQjlNmM6aNejvLjwYFmM6SATZyf4o94L6Uc_z--rgctpx20Gq1dTyviMv14-r8L9D7Fj1fKmu3F7PZrB-1vIDCTdCKCLM2wTyJxJPcTOJS7rz5LfS7S_Zg4D7FWxgTDr7LF7jxJJ1rfSXVuytRr_zToYhsSP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuANwChyjx5vcQr2oYDLgyLc245YykJeKwbQ4nMONrpRN206yKFApNFMDylehGVcPQ2bC3M0FJW1XlrWhF9SZRV9-L6QFAOs0TRLKuEu_kj5kf4MV1IAreC8nfqSVQfV5QCcAduwSxfdKI9m7ylcPc4rGjy2DbZExMqjlGEejWZm4TMG4Tcs2Kw0nwx6ABTCnmzPJzAur5TkCisFVNC9-1i91aSdpYAglSw-CgkuFXcIsuPwxlHRbsRfS4doCl8Z7I1rldPHjUMmvwLK',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDlfUyt4GsgtD2RIiTLr8azeITJj1Ao0GJCAF9vdC9uRQQuUJvVUtBFdTL3iTkaYAnpaXDQtwqmW4WGhowlik2Z7M4BT7qJ4R-8p9o3qZIxhUK_3YfkR7OwoUMDnvNjsS1HuRZMCs0RzDQlvNgYQ77WTV9arcuS0qyDJh9Ks5dDd20YcFRAZZrW0cidI7ZTs0OKiU35WVHxjsbxRAvsWGjotjSvJZizfZ5SoXcMaTGD4LBIs6IZxkQTMMqu1KA8kJnnPB1ymhdqtDin'
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
              <span className="text-primary text-lg">📸</span>
              <span className="text-primary font-semibold text-sm">Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Our Gallery
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A glimpse into the life at St. Angeloes College.
            </p>
          </div>

          {/* Gallery Tabs */}
          <div 
            className={`mb-12 transition-all duration-1000 ease-out transform ${
              tabsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center border-b border-primary/20 dark:border-primary/30">
              {galleryTabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-slate-300'
                  }`}
                  style={{
                    transitionDelay: `${400 + (index * 50)}ms`
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 transition-all duration-1000 ease-out transform ${
              galleryVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            ref={sectionRef}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  transitionDelay: `${600 + (index * 50)}ms`
                }}
              >
                <div
                  className="w-full h-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${image}")` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover overlay with icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
