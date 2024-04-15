(function ($, Drupal) {
    Drupal.behaviors.component_tint_grid = {    
      attach: function (context, settings) {      
        const tint_user_settings = settings.tintComponent;        
  
        if(tint_user_settings.template === 'grid') {

          // Fetch all posts
  
          const root = document.querySelectorAll('.tint-api_out');
          const URL_API = `https://api.tintup.com/v2/tints/${tint_user_settings.api_key}/posts?include=product_tags.product`;  
          
          const initial_posts_count = +tint_user_settings.initial_posts_g;
          let postsToShow = +initial_posts_count;
          const maxPostsToView = +tint_user_settings.max_posts;
          const gridColDesktop = +tint_user_settings.desktop_posts_g;
          const gridColMobile = +tint_user_settings.mobile_posts_g;
  
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
            
            const postsToRender = fullDataPosts
            .slice(0, maxPostsToView)
            .slice(0, initial_posts_count);
            const productsTag = Array.from(new Set(fullDataProducts.map(JSON.stringify))).map(JSON.parse);
            
            if (postsToRender.length < 1) {
              return;
            }

            // Load additional posts to block after pressing load more button

            window.readmoreLoadPosts = function() {
              const gridItemCount = document.querySelectorAll('.grid__item').length;                

              const createPostElement = (post, i) => {

                const div = document.createElement('div');
                div.setAttribute('data-slide', gridItemCount + i);
                div.classList.add('grid__item', 'tint_post_item');
            
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('slide-image_container');
                const image = document.createElement('img');
                image.setAttribute('data-slide', gridItemCount + i);
                image.classList.add('mm-columns__img');
                image.setAttribute('src', post.attributes.image_url);
                image.setAttribute('alt', `@${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}`);
                imageContainer.appendChild(image);
                div.appendChild(imageContainer);
            
                const overlaySpan = document.createElement('span');
                overlaySpan.setAttribute('data-slide', gridItemCount + i);
                overlaySpan.classList.add('slide-overlay');
                const overlayText = document.createElement('p');
                overlayText.setAttribute('data-slide', gridItemCount + i);
                overlayText.classList.add('slide-overlay_text');
                overlayText.textContent = post.attributes.text ? (post.attributes.text.length > 180 ? post.attributes.text.substring(0, 180) + '...' : post.attributes.text) : '';
                overlaySpan.appendChild(overlayText);
                div.appendChild(overlaySpan);
            
                const userParagraph = document.createElement('p');
                userParagraph.setAttribute('data-slide', gridItemCount + i);
                userParagraph.classList.add('post-user');
                userParagraph.textContent = `@${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}`;
                div.appendChild(userParagraph);
            
                return div;
              };

              const firstPostToAdd = postsToShow;
              postsToShow = +tint_user_settings.more_posts + postsToShow;
              const postsToRender = fullDataPosts
                .slice(0, maxPostsToView)
                .slice(firstPostToAdd, postsToShow);
              const postsToSlider = fullDataPosts
                .slice(0, maxPostsToView)
                .slice(0, postsToShow);

              const fragment = document.createDocumentFragment();

              postsToRender.forEach((post, i) => {
                const postElement = createPostElement(post, i); 
                fragment.appendChild(postElement);
              });

              document.querySelector('.grid-wrapper').appendChild(fragment);

              const gridItem = document.querySelectorAll('.grid__item'); 
              
              gridItem.forEach(slide => {

                slide.addEventListener('click', (e) => {
                  const indexOfSlide = e.target.getAttribute('data-slide'); 
                  document.body.style.overflow = 'hidden';
                                    
                  createPopupSlider(indexOfSlide, postsToSlider, additionalCTA, productsTag,  tint_user_settings.share_button, tint_user_settings);
    
                  popupContainer.forEach(popup => {
                    popup.classList.add('is-active');
                  })
    
                  setupStyles(tint_user_settings);
                })          
              })   

              const renderedGridItems = document.querySelectorAll('.grid__item');

              const maxPostsToRender = maxPostsToView >= fullDataPosts.length ? fullDataPosts.length : maxPostsToView;  
              
              //show/hide loadmore button
              
              if(maxPostsToRender === renderedGridItems.length) {
                document.querySelectorAll('.tint_content_wrapper .tint_c_loadmore').forEach(btn => {
                  btn.style.display = 'none';
                })
              }

              // setup custom styles
              setupStyles(tint_user_settings);
            }

            // create main template for tint
  
            const createSwiperTemplate = () => {
              const html = `
                <div class="tint_content_wrapper">                
                  <div class="grid-wrapper mm-columns tint_content_out">
              
                  </div>  
                  <button 
                    class="tint_c_loadmore"
                    onclick="readmoreLoadPosts()"
                  >
                    ${Drupal.t('More Posts')}
                  </button>              
                </div>
              `;      
              return html;
            }

            // create display mode for posts
  
            function renderPosts(postTeasers) {
              
              const posts = postTeasers.map((post, i) => {
                
                return `
                  <div data-slide="${i}" class="grid__item tint_post_item">
                    <div class="slide-image_container">
                      <img data-slide="${i}" class="mm-columns__img" src="${post.attributes.image_url}" alt="@${post.attributes.author.username ? post.attributes.author.username : post.attributes.author.name}">
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
            const gridWrapper = document.querySelectorAll('.grid-wrapper');
            gridWrapper.forEach(el => el.innerHTML = renderPosts(postsToRender));
                    
            const gridItem = document.querySelectorAll('.grid__item'); 

            // add click event to post

            gridItem.forEach(slide => {
              slide.addEventListener('click', (e) => {
                const indexOfSlide = e.target.getAttribute('data-slide'); 
                document.body.style.overflow = 'hidden';    
                
                createPopupSlider(indexOfSlide, postsToRender, additionalCTA, productsTag,  tint_user_settings.share_button, tint_user_settings);
  
                popupContainer.forEach(popup => {
                  popup.classList.add('is-active');
                })

                // setup custom styles
                setupStyles(tint_user_settings);
              })          
            })     

            // set count ol columns in view for different screen resolutions

            function setGridCols() {
              const grid_wrapper = document.querySelectorAll('.tint_content_wrapper .grid-wrapper');
              if(window.innerWidth > 1100) {
                grid_wrapper.forEach(gridWrap => {
                  gridWrap.style.gridTemplateColumns = `repeat(${gridColDesktop}, 1fr)`;
                })
              }
              else if(window.innerWidth > 991) {
                const val = gridColDesktop >= 4 ? 4 : gridColDesktop;
                grid_wrapper.forEach(gridWrap => {
                  gridWrap.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
                })
              }
              else if(window.innerWidth > 751) {
                const val = gridColDesktop >= 3 ? 3 : gridColDesktop;
                grid_wrapper.forEach(gridWrap => {
                  gridWrap.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
                })
              }  
              else if(window.innerWidth > 540) {
                const val = gridColDesktop >= 2 ? 2 : gridColDesktop;
                grid_wrapper.forEach(gridWrap => {
                  gridWrap.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
                })
              }  
              else {
                grid_wrapper.forEach(gridWrap => {
                  gridWrap.style.gridTemplateColumns = `repeat(${gridColMobile}, 1fr)`;
                })
              }
            }
            
            window.addEventListener('resize', () => setGridCols());

            setGridCols();

            // setup custom styles
            setupStyles(tint_user_settings);
          }
        }
      }
    };
  })(jQuery, Drupal);