(function ($, Drupal) {
  Drupal.behaviors.component_tint_slider = {    
    attach: function (context, settings) {      

      const tint_user_settings = settings.tintComponent;

      if(tint_user_settings.template === 'slider') {    
        
        // Fetch all posts

        const root = document.querySelectorAll('.tint-api_out');
        const URL_API = `https://api.tintup.com/v2/tints/${tint_user_settings.api_key}/posts?include=product_tags.product`;     

        let fullDataPosts = [];
        let fullDataProducts = [];
        let additionalCTA = tint_user_settings.cta_posts;

        async function fetchData(apiEndpoint) {
          try {
            const remoteData = await getData(apiEndpoint);
            
            if(remoteData.data) {
              fullDataPosts.push(...remoteData.data); 
            }

            if(remoteData.included) {
              fullDataProducts.push(...remoteData.included); 
            }            
            
            if (remoteData.links.next) {            
              fetchData(remoteData.links.next);
            } else {            
              render();
            }
          } catch (error) {
            console.error(error);
          }
        }
        
        const getData = async (data) => {
          const apiEndpoint = data;

          try {
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();

            return jsonData;
          } catch (error) {
            console.error(error);
            throw error;
          }
        }
        
        fetchData(URL_API);

        // Fetch all posts

        function render() {
          
          // get needed count of posts

          const postsToRender = fullDataPosts.slice(0, tint_user_settings.max_posts);
          const productsTag = Array.from(new Set(fullDataProducts.map(JSON.stringify))).map(JSON.parse);
          
          if (postsToRender.length < 1) {
            return;
          }

          // create main template for tint

          const createSwiperTemplate = () => {
            const html = `
              <div class="swiper tint_content_wrapper">                
                <div class="swiper-wrapper tint_content_out">
            
                </div>
                <div class='swiper-navigation'>
                  <div class='swiper-button-prev'></div>
                  <div class='swiper-button-next'></div>
                  <div class='swiper-pagination'></div>
                </div>
              </div>
            `;      
            return html;
          }

          // create display mode for posts

          function renderPosts() {
            
            const posts = postsToRender.map((post, i) => {
              
              return `
                <div data-slide="${i}" class="swiper-slide tint_post_item">
                  <div class="slide-image_container">
                    <img data-slide="${i}" class="slide-image" src="${post.attributes.image_url}" alt="@${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}">
                  </div>
                  <span data-slide="${i}" class="slide-overlay">
                    <p data-slide="${i}" class="slide-overlay_text">${post.attributes.text ? (post.attributes.text.length > 180 ? post.attributes.text.substring(0, 180) + '...' : post.attributes.text) : ''}</p>
                  </span>
                  <p data-slide="${i}" class="post-user">
                    @${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}
                  </p>
                </div>
              `;
            }).join('');

            return posts;
          };

          root.forEach(el => el.innerHTML = createSwiperTemplate());

          const popupContainer = document.querySelectorAll('.tint-api_popup-container');
          const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
          swiperWrapper.forEach(el => el.innerHTML = renderPosts());        
          const swiperSlide = document.querySelectorAll('.swiper-slide');                 

          swiperSlide.forEach(slide => {
            slide.addEventListener('click', (e) => {
              const indexOfSlide = e.target.getAttribute('data-slide'); 
              document.body.style.overflow = 'hidden';

              
              // create popup slider
              createPopupSlider(indexOfSlide, postsToRender, additionalCTA, productsTag,  tint_user_settings.share_button, tint_user_settings);

              popupContainer.forEach(popup => {
                popup.classList.add('is-active');
              })

              // setup custom styles

              setupStyles(tint_user_settings);
            })          
          })                    

          // itin swiper

          const autoplayActivate = tint_user_settings.slider_autoscroll === "1";

          const swiper = new Swiper(".swiper", {
            spaceBetween: 16,
            speed: 800,
            watchOverFlow: true,
            direction: "horizontal",
            slidesPerView: 1,
            initialSlide: 1,
            loop: true,
            autoplay: 
              autoplayActivate 
              ? {
                  delay: 3000,
                  disableOnInteraction: true,              
                } 
              : false,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true,
            },          

            breakpoints: {
              514: {
                slidesPerView: 2,
              },
              609: {
                slidesPerView: 2.4,
              },
              700: {
                slidesPerView: 2.7,
              },
              769: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              }
            }  
          })

          setupStyles(tint_user_settings);
        }        
      }
    }
  };
})(jQuery, Drupal);


