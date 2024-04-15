// Edit node

(function ($, Drupal) {
    Drupal.behaviors.component_tint_form = {    
        attach: function (context, settings) { 

            if(settings.tintComponent) {

                // Fetch all posts
                
                const URL_API = `https://api.tintup.com/v2/tints/${settings.tintComponent.api_key}/posts`;
                
                let fullDataPosts = [];
        
                async function fetchData(apiEndpoint) {
                    try {
                    const remoteData = await getData(apiEndpoint);
                    
                    if(remoteData.data) {
                        fullDataPosts.push(...remoteData.data); 
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

                    if (fullDataPosts.length < 1) {
                        return;
                    }

                    const postsIndexWrap = document.querySelector('.field--name-field-tint-post-index-search');
                    const postsIndexValue = document.querySelector('.field--name-field-tint-post-index-search .js-form-type-number input');

                    // Add Button for checking current post 

                    const btn = document.querySelector('.tint_index_btn');
                    
                    if(!btn) {
                        const button = document.createElement("button");
                        button.classList.add('tint_index_btn')
                        button.innerText = "Check index";
                        
                        if(postsIndexWrap) {
                            postsIndexWrap.appendChild(button);
                        }                      
                            
                        document.querySelector('.tint_index_btn')?.addEventListener('click', (e) => {
                            e.preventDefault();

                            const image = document.querySelector('.field--name-field-tint-post-index-search .index_image');
                            const title = document.querySelector('.field--name-field-tint-post-index-search .index_title');

                            if(image || title) {
                                image.remove();
                                title.remove();
                            } 

                            currentPost = {
                                image: fullDataPosts[postsIndexValue.value - 1]?.attributes?.image_url,
                                user: fullDataPosts[postsIndexValue.value - 1]?.attributes?.author?.username,
                            }

                            if(currentPost.Postimage || currentPost.user) {

                                const title = document.createElement('p');
                                title.classList.add('index_title')
                                title.innerHTML = `<b><i>Post User - </i></b><u>${currentPost.user}</u>`;
                                postsIndexWrap.appendChild(title); 
                                const img = document.createElement('img');
                                img.classList.add('index_image')
                                img.src = currentPost.image;
                                postsIndexWrap.appendChild(img); 

                            } else {
                                const title = document.createElement('p');
                                title.classList.add('index_title')
                                title.innerHTML = `<b><i>Range of posits is from 1 to ${fullDataPosts.length}</b></i>`;
                                postsIndexWrap.appendChild(title);
                                const img = document.createElement('img');
                                img.classList.add('index_image')
                                img.src = '';
                                postsIndexWrap.appendChild(img); 
                            }                  
                        })
                    }  
                    
                    // Add Button for checking current post 
                }
            }
        }
    };
  })(jQuery, Drupal);