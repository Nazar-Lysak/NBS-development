// create create popup slider

function createPopupSlider(slideIndex, fullDataPosts, additionalCTA, fullProductsData, shareBtn, tint_user_settings) {  
  const popupContent = document.querySelectorAll('.tint-api_popup-content');
  const popupContainer = document.querySelectorAll('.tint-api_popup-container');
  
  const target_blank = tint_user_settings.target_blank === 'new_tab' ? '_blank' : '_self';

  function defineProduct(productTagArr) {
    const filterdProd = productTagArr.map(prodData => {
      return prodData.id;
    })

    const filteredTagId = fullProductsData.filter(product => {
      return filterdProd.some(id => id === product.id);
    }).map(id => id.relationships.product.data.id);

    const filtredProd = fullProductsData.filter(prod => {
      return filteredTagId.includes(prod.id);
    })

    return filtredProd;
  }

  const shareButtonSvg = `
  <svg fill="#000000" width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>share</title><path d="M385 464Q357 464 339 445 320 426 320 399 320 390 321 388L171 303Q154 320 129 320 102 320 83 301 64 282 64 255 64 229 83 211 102 192 129 192 154 192 171 209L321 125Q320 122 320 111 320 85 339 67 357 48 384 48 410 48 429 67 447 85 448 111 448 138 429 157 410 176 384 176 361 176 341 159L191 244Q192 246 192 255 192 265 191 268L341 353Q361 336 385 336 415 336 431 355 447 374 447 400 447 426 431 445 415 464 385 464Z" /></svg>
  `

  let htmlStructure = 
  `<div class="popup-swiper">
    <button class='close-popup_btn'>
      <span class='close_one'></span>
      <span class='close_two'></span>
    </button>
    <div class="swiper-wrapper additional-swiper">

    </div>   
    <div class='swiper-button-prev'></div>
    <div class='swiper-button-next'></div>
    <div class='swiper-pagination'></div>                    
  </div>`;   
    
  const popupSlides = fullDataPosts.map((post, i) => {

    const isProductTag = post.relationships.product_tags.data || [];
      const additionalProducts = defineProduct(isProductTag);   
      
      const defineCTA = (i, cta) => {
        const ctaElement = cta.filter(elem => +elem.index - 1 === +i);

        if(ctaElement.length > 0) {
          return `
            <a
              href=${ctaElement[0].item_url}
              class="bottom_cta_content"
              target=${target_blank}
            >
              ${ctaElement[0].link_text}
            </a>
          `
        }       
        return '';
      }
          
    return `
        <div class="swiper-slide">
          <div class="popup_slide-content">

          <div>   
            <span class="content_inst-icon"></span>
            <a class="content_user-title" target="_blank" href="${post.attributes.author.url ? post.attributes.author.url : "https://www.instagram.com"}">
              @${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}
            </a>
          </div>      

            <div class="popup_slide-heading">
              
              <div class="content_description">                             
                <p class="content_description_main">
                  ${
                    definedDescriptionLength(post.attributes.text)
                  }
                </p>
                <p class="content_description_additional">
                ${post.attributes.text !== null ? post.attributes.text : ''}
                </p>
              </div>
              <p 
                class=' ${additionalProducts.length ? 'tint_c_products_discover' : 'hide_tint_c_products_discover'}'
              >
                ${Drupal.t('Discover more')}
              </p> 
              <div class="tint_c_products">
                ${additionalProducts.map(product => {
                  return (
                    `
                      <div class='tint_c_products_item'>
                        <a       
                          target=${target_blank}                   
                          href=${product.attributes.url}
                        >
                          <img src=${product.attributes.image_url} alt=${product.attributes.name} />
                          <p>
                            ${product.attributes.name}
                          </p>
                        </a>
                        
                      </div>
                    `
                  )
                }).join('')}
              </div>
            </div>             
            
            <div class="popup_slide-bottom">
              <div class="bottom_cta-wrap">
                <button 
                  class="bottom_cta read_more ${displayShowmore(post.attributes.text)}"
                  onclick="readMoreHandle('${i}')"
                >
                  ${Drupal.t('Read more')}
                </button>
                <a class="bottom_cta ${post.relationships.cta_associations.meta.included ? 'show' : 'hide_btn'}" target=${target_blank} href='#' : ''}>
                  ${Drupal.t('Info about brand')}
                </a>
                ${defineCTA(i, additionalCTA)}
              </div>
              <span onclick="openSharePanel(${i})" class='slide-bottom_share ${shareBtn === 'hide' ? 'hide-share' : 'show-share'}'>
              ${shareButtonSvg}
                <span class="share-overlay"></span>
                <ul class="slide-bottom_socials">
                  <a class="socials-link" target="_blank" href="http://www.facebook.com/sharer.php?u=${encodeURIComponent(post.attributes.url)}&amp;via=tint&amp;t=${encodeURIComponent(post.attributes.text)}">
                    <li class="social_item facebook">
                      Facebook
                    </li>
                  </a>
                  <a class="socials-link" target="_blank" href="https://www.linkedin.com/shareArticle?url=${encodeURIComponent(post.attributes.url)}&title=${encodeURIComponent(post.attributes.text)}&source=TINT">
                    <li class="social_item linkedin">
                      LinkedIn
                    </li>
                  </a>
                  <a class="socials-link" target="_blank" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(post.attributes.url)}&amp;text=${encodeURIComponent(post.attributes.text)}">
                    <li class="social_item twitter">
                      Twitter
                    </li>
                  </a>
                  <a class="socials-link" target="_blank" href="mailto:?subject=You+are+going+to+love+this&amp;body=${encodeURIComponent(post.attributes.text)}">
                    <li class="social_item email">
                      Email
                    </li> 
                  </a> 
                  <a class="socials-link" target="_blank" href="https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(post.attributes.url)}&amp;description=${encodeURIComponent(post.attributes.text)}&amp;media=${post.attributes.image_url}">
                    <li class="social_item pinterest">
                      Pinterest
                    </li>    
                  </a>                    
                </ul>
              </span>
            </div>
          </div>

          ${
            post.attributes.video_url
             ? 
              `
              <video class="popup_slide-image" controls poster=${post.attributes.image_url} playsinline="" preload="auto"><source type="video/mp4" src=${post.attributes.video_url}></video>
              `
             : 
              `
                <img class="popup_slide-image" src="${post.attributes.image_url}" alt="@${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}">  
              `
          }
        
                                        
        </div>
    `;
  }).join('');    

  popupContent.forEach(content => {
    content.innerHTML = htmlStructure;
  });


  document.querySelectorAll('.additional-swiper').forEach(additionalSwiper => {
    additionalSwiper.innerHTML = popupSlides;
  });

  const popupCloseBtn = document.querySelectorAll('.close-popup_btn');

  popupCloseBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      popupContainer.forEach(container => {
        container.classList.remove('is-active');
        document.body.style.overflow = 'auto';
      })
    })
  });

  const swiperAdditional = new Swiper(".popup-swiper", {                        
    spaceBetween: 16,
    initialSlide: slideIndex,
    slidesPerView: 1,
    watchOverFlow: true,
    cursor: 'grab', 
    effect: 'fade',
    autoHeight: true,
    allowTouchMove: false,

    fadeEffect: {
      crossFade: true,
    },
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  });

  swiperAdditional.on('slideChange', function (e) {
    setTimeout(() => {
      document.querySelectorAll('.popup_slide-content').forEach(el => {
        if(el.classList.contains('show_more')) {                
          el.classList.remove('show_more');

          document.querySelectorAll('.bottom_cta').forEach(btn => {
            btn.innerHTML = Drupal.t('Read more');
          })
        }
      });

      document.querySelectorAll('.slide-bottom_share').forEach(el => {
        if(el.classList.contains('active')) {                
          el.classList.remove('active');
        }
      })
    }, 50)            
  }); 

  swiperAdditional.on('click',() => {    
    
    setTimeout(() => {              
      swiperAdditional.update();
    }, 50)            
  })

  // Swipe on video fix

  swiperAdditional.on('slideChangeTransitionEnd',() => {    
    const previousSlide = swiperAdditional.slides[swiperAdditional.previousIndex];
    const video = previousSlide.querySelector('video');  
    if (video) {
      video.pause();
    }
    
    setTimeout(() => {              
      swiperAdditional.update();
    }, 50)            
  })  

  popupContent.forEach(swiperWrapper => {
    const slide = swiperWrapper.querySelectorAll('.popup-swiper .additional-swiper .swiper-slide');
    slide.forEach(el => {
      const hammer = new Hammer(el);

      hammer.on('panend', function(event) {
        
        if (event.direction === Hammer.DIRECTION_LEFT) {
          swiperAdditional.slideNext();
        } else if (event.direction === Hammer.DIRECTION_RIGHT) {
          swiperAdditional.slidePrev()
        }
      });
    })
  })
  
};

// Show read more btn

function readMoreHandle (index) {
  const popupContentCurrent = document.querySelectorAll('.popup_slide-content')[index];
  const showMoreBtn = popupContentCurrent.querySelector('.bottom_cta');
  
  popupContentCurrent.classList.toggle('show_more');      

  if (popupContentCurrent.classList.contains('show_more')) {
    showMoreBtn.innerHTML = Drupal.t('Read less');  

  } else {
    showMoreBtn.innerHTML = Drupal.t('Read more');  
    popupContentCurrent.querySelector('.content_description').scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }       
}

function openSharePanel (index) {
  const popupContentCurrent = document.querySelectorAll('.popup_slide-content')[index];
  const shareBtn = popupContentCurrent.querySelector('.slide-bottom_share');
  shareBtn.classList.toggle('active');
}

function definedDescriptionLength(string) {
  if (string === null || string === undefined) {
    return '';
  }

  let maxLength = 0;  

  switch (true) {
    // case (window.innerWidth >= 1440):
    //   maxLength = 650;
    //   break;
    // case (window.innerWidth >= 1280):
    //   maxLength = 500;
    //   break;
    // case (window.innerWidth >= 1139):
    //   maxLength = 400;
    //   break;
    // case (window.innerWidth >= 991):
    //   maxLength = 200;
    //   break;
    // case (window.innerWidth >= 768):
    //   maxLength = 400;
    //   break;
    case (window.innerWidth > 0):
      maxLength = 180;
      break;
    default:
      maxLength = string.length;
  }

  return string.length > maxLength 
    ? string.substring(0, maxLength) + ' ...' 
    : string
}

function displayShowmore(string) {
  if (string === null || string === undefined) {
    return 'hide_btn';
  }

  switch (true) {
    // case (window.innerWidth >= 1440 && string.length < 650):
    //   return 'hide_btn'
    //   break;
    // case (window.innerWidth >= 1280 && string.length < 500):
    //   return 'hide_btn'
    //   break;
    // case (window.innerWidth >= 1139 && string.length < 400):
    //   return 'hide_btn'
    //   break;
    // case (window.innerWidth >= 991  && string.length < 200):
    //   return 'hide_btn'
    //   break;
    // case (window.innerWidth >= 768 && string.length < 400):
    //   return 'hide_btn'
    //   break;
    case (window.innerWidth >= 0 && string.length < 180):
      return 'hide_btn'
      break;
    default:
      return ''
  }
}