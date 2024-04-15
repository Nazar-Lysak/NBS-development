function createPopupSlider(t,e,r,s,i,a){var o=document.querySelectorAll(".tint-api_popup-content");const n=document.querySelectorAll(".tint-api_popup-container"),l="new_tab"===a.target_blank?"_blank":"_self";const c=e.map((t,e)=>{var a=function(t){const a=t.map(t=>t.id),e=s.filter(e=>a.some(t=>t===e.id)).map(t=>t.relationships.product.data.id);return s.filter(t=>e.includes(t.id))}(t.relationships.product_tags.data||[]);return`
        <div class="swiper-slide">
          <div class="popup_slide-content">

          <div>   
            <span class="content_inst-icon"></span>
            <a class="content_user-title" target="_blank" href="${t.attributes.author.url||"https://www.instagram.com"}">
              @${t.attributes.author.username||t.attributes.author.name}
            </a>
          </div>      

            <div class="popup_slide-heading">
              
              <div class="content_description">                             
                <p class="content_description_main">
                  ${definedDescriptionLength(t.attributes.text)}
                </p>
                <p class="content_description_additional">
                ${null!==t.attributes.text?t.attributes.text:""}
                </p>
              </div>
              <p 
                class=' ${a.length?"tint_c_products_discover":"hide_tint_c_products_discover"}'
              >
                ${Drupal.t("Discover more")}
              </p> 
              <div class="tint_c_products">
                ${a.map(t=>`
                      <div class='tint_c_products_item'>
                        <a       
                          target=${l}                   
                          href=${t.attributes.url}
                        >
                          <img src=${t.attributes.image_url} alt=${t.attributes.name} />
                          <p>
                            ${t.attributes.name}
                          </p>
                        </a>
                        
                      </div>
                    `).join("")}
              </div>
            </div>             
            
            <div class="popup_slide-bottom">
              <div class="bottom_cta-wrap">
                <button 
                  class="bottom_cta read_more ${displayShowmore(t.attributes.text)}"
                  onclick="readMoreHandle('${e}')"
                >
                  ${Drupal.t("Read more")}
                </button>
                <a class="bottom_cta ${t.relationships.cta_associations.meta.included?"show":"hide_btn"}" target=${l} href='#' : ''}>
                  ${Drupal.t("Info about brand")}
                </a>
                ${((e,t)=>{t=t.filter(t=>+t.index-1==+e);return 0<t.length?`
            <a
              href=${t[0].item_url}
              class="bottom_cta_content"
              target=${l}
            >
              ${t[0].link_text}
            </a>
          `:""})(e,r)}
              </div>
              <span onclick="openSharePanel(${e})" class='slide-bottom_share ${"hide"===i?"hide-share":"show-share"}'>
              
  <svg fill="#000000" width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>share</title><path d="M385 464Q357 464 339 445 320 426 320 399 320 390 321 388L171 303Q154 320 129 320 102 320 83 301 64 282 64 255 64 229 83 211 102 192 129 192 154 192 171 209L321 125Q320 122 320 111 320 85 339 67 357 48 384 48 410 48 429 67 447 85 448 111 448 138 429 157 410 176 384 176 361 176 341 159L191 244Q192 246 192 255 192 265 191 268L341 353Q361 336 385 336 415 336 431 355 447 374 447 400 447 426 431 445 415 464 385 464Z" /></svg>
  
                <span class="share-overlay"></span>
                <ul class="slide-bottom_socials">
                  <a class="socials-link" target="_blank" href="http://www.facebook.com/sharer.php?u=${encodeURIComponent(t.attributes.url)}&amp;via=tint&amp;t=${encodeURIComponent(t.attributes.text)}">
                    <li class="social_item facebook">
                      Facebook
                    </li>
                  </a>
                  <a class="socials-link" target="_blank" href="https://www.linkedin.com/shareArticle?url=${encodeURIComponent(t.attributes.url)}&title=${encodeURIComponent(t.attributes.text)}&source=TINT">
                    <li class="social_item linkedin">
                      LinkedIn
                    </li>
                  </a>
                  <a class="socials-link" target="_blank" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(t.attributes.url)}&amp;text=${encodeURIComponent(t.attributes.text)}">
                    <li class="social_item twitter">
                      Twitter
                    </li>
                  </a>
                  <a class="socials-link" target="_blank" href="mailto:?subject=You+are+going+to+love+this&amp;body=${encodeURIComponent(t.attributes.text)}">
                    <li class="social_item email">
                      Email
                    </li> 
                  </a> 
                  <a class="socials-link" target="_blank" href="https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(t.attributes.url)}&amp;description=${encodeURIComponent(t.attributes.text)}&amp;media=${t.attributes.image_url}">
                    <li class="social_item pinterest">
                      Pinterest
                    </li>    
                  </a>                    
                </ul>
              </span>
            </div>
          </div>

          ${t.attributes.video_url?`
              <video class="popup_slide-image" controls poster=${t.attributes.image_url} playsinline="" preload="auto"><source type="video/mp4" src=${t.attributes.video_url}></video>
              `:`
                <img class="popup_slide-image" src="${t.attributes.image_url}" alt="@${t.attributes.author.username||t.attributes.author.name}">  
              `}
        
                                        
        </div>
    `}).join(""),d=(o.forEach(t=>{t.innerHTML=`<div class="popup-swiper">
    <button class='close-popup_btn'>
      <span class='close_one'></span>
      <span class='close_two'></span>
    </button>
    <div class="swiper-wrapper additional-swiper">

    </div>   
    <div class='swiper-button-prev'></div>
    <div class='swiper-button-next'></div>
    <div class='swiper-pagination'></div>                    
  </div>`}),document.querySelectorAll(".additional-swiper").forEach(t=>{t.innerHTML=c}),document.querySelectorAll(".close-popup_btn").forEach(t=>{t.addEventListener("click",()=>{n.forEach(t=>{t.classList.remove("is-active"),document.body.style.overflow="auto"})})}),new Swiper(".popup-swiper",{spaceBetween:16,initialSlide:t,slidesPerView:1,watchOverFlow:!0,cursor:"grab",effect:"fade",autoHeight:!0,allowTouchMove:!1,fadeEffect:{crossFade:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0}}));d.on("slideChange",function(t){setTimeout(()=>{document.querySelectorAll(".popup_slide-content").forEach(t=>{t.classList.contains("show_more")&&(t.classList.remove("show_more"),document.querySelectorAll(".bottom_cta").forEach(t=>{t.innerHTML=Drupal.t("Read more")}))}),document.querySelectorAll(".slide-bottom_share").forEach(t=>{t.classList.contains("active")&&t.classList.remove("active")})},50)}),d.on("click",()=>{setTimeout(()=>{d.update()},50)}),d.on("slideChangeTransitionEnd",()=>{var t=d.slides[d.previousIndex].querySelector("video");t&&t.pause(),setTimeout(()=>{d.update()},50)}),o.forEach(t=>{t.querySelectorAll(".popup-swiper .additional-swiper .swiper-slide").forEach(t=>{new Hammer(t).on("panend",function(t){t.direction===Hammer.DIRECTION_LEFT?d.slideNext():t.direction===Hammer.DIRECTION_RIGHT&&d.slidePrev()})})})}function readMoreHandle(t){var t=document.querySelectorAll(".popup_slide-content")[t],e=t.querySelector(".bottom_cta");t.classList.toggle("show_more"),t.classList.contains("show_more")?e.innerHTML=Drupal.t("Read less"):(e.innerHTML=Drupal.t("Read more"),t.querySelector(".content_description").scrollTo({top:0,behavior:"smooth"}))}function openSharePanel(t){document.querySelectorAll(".popup_slide-content")[t].querySelector(".slide-bottom_share").classList.toggle("active")}function definedDescriptionLength(t){if(null==t)return"";let e=0;return e=!0==0<window.innerWidth?180:t.length,t.length>e?t.substring(0,e)+" ...":t}function displayShowmore(t){return null!=t&&!0!=(0<=window.innerWidth&&t.length<180)?"":"hide_btn"}function setupStyles(t){var e=document.querySelectorAll(".paragraph--type--tint-component .post-user"),a=document.querySelectorAll(".paragraph--type--tint-component .tint_post_item"),r=document.querySelectorAll(".paragraph--type--tint-component .popup_slide-content"),s=document.querySelectorAll(".paragraph--type--tint-component .close-popup_btn"),i=document.querySelectorAll(".paragraph--type--tint-component .tint_c_loadmore"),o=document.querySelector(".popup-swiper .swiper-button-prev"),n=document.querySelector(".popup-swiper .swiper-button-next");const l=t.theme_color.color,c=t.text_color.color,d=t.popup_color.color,u=t.overlay_bg,p=t.overlay_text_color.color;var t=`
        <svg width="60px" height="60px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L3 7.5L10 1" stroke=${l} stroke-linecap="square"/>
        </svg>
    `,m=`
        <svg width="60px" height="60px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 14L12 7.5L5 1" stroke=${l} stroke-linecap="square"/>
        </svg>
    `;function _(t,e){return t=t.replace("#",""),`rgba(${parseInt(t.substring(0,2),16)}, ${parseInt(t.substring(2,4),16)}, ${parseInt(t.substring(4,6),16)}, ${e})`}n&&(n.innerHTML=m),o&&(o.innerHTML=t),e.forEach(t=>{t.style.backgroundColor=l,t.style.color=c}),a.forEach(t=>{var e=`linear-gradient(48deg, ${_(u.color,u.opacity)} 49%, ${_(u.color,u.opacity)} 100%)`;t.querySelector(".slide-overlay").style.background=e,t.querySelector(".slide-overlay").style.color=p}),i.forEach(t=>{t&&(t.style.background=l,t.style.color=c,t.style.border="1px solid "+l,t.addEventListener("mouseover",()=>{t.style.background=c,t.style.color=l}),t.addEventListener("mouseleave",()=>{t.style.background=l,t.style.color=c}))}),r.forEach(t=>{var e=t.querySelector(".slide-bottom_share svg path");const a=t.querySelector(".popup_slide-bottom .bottom_cta"),r=t.querySelector(".popup_slide-bottom .bottom_cta_content");t.style.color=d,e.style.fill=l,r&&(r.style.background=l,r.style.color=c,r.style.border="1px solid "+l,r.addEventListener("mouseover",()=>{r.style.background=c,r.style.color=l}),r.addEventListener("mouseleave",()=>{r.style.background=l,r.style.color=c})),a&&(a.style.background=l,a.style.color=c,a.style.border="1px solid "+l,a.addEventListener("mouseover",()=>{a.style.background=c,a.style.color=l}),a.addEventListener("mouseleave",()=>{a.style.background=l,a.style.color=c}))}),s.forEach(t=>{t.querySelectorAll("span").forEach(t=>{t.style.background=l})})}jQuery,Drupal.behaviors.component_tint_init={attach:function(t,e){var a=document.querySelectorAll(".paragraph--type--tint-component .tint-api_out .loader");const r=e.tintComponent.theme_color.color;a.forEach(t=>{t.style.borderTop="8px solid "+r})}},function(g){g.behaviors.component_tint_grid={attach:function(t,e){const m=e.tintComponent;if("grid"===m.template){const _=document.querySelectorAll(".tint-api_out");e=`https://api.tintup.com/v2/tints/${m.api_key}/posts?include=product_tags.product`;const h=+m.initial_posts_g;let c=+h;const v=+m.max_posts,y=+m.desktop_posts_g,b=+m.mobile_posts_g;let d=[],u=[],p=m.cta_posts;!async function t(e){try{var a=await(async t=>{const e=t;try{const a=await fetch(e),r=await a.json();return r}catch(t){throw console.error(t),t}})(e);if(a.data&&d.push(...a.data),a.included&&u.push(...a.included),a.links.next)t(a.links.next);else{const s=d.slice(0,v).slice(0,h),n=Array.from(new Set(u.map(JSON.stringify))).map(JSON.parse);if(s.length<1)return;window.readmoreLoadPosts=function(){const i=document.querySelectorAll(".grid__item").length;var t=c,t=(c=+m.more_posts+c,d.slice(0,v).slice(t,c));const e=d.slice(0,v).slice(0,c),o=document.createDocumentFragment();t.forEach((t,e)=>{(a=document.createElement("div")).setAttribute("data-slide",i+e),a.classList.add("grid__item","tint_post_item"),(r=document.createElement("div")).classList.add("slide-image_container"),(s=document.createElement("img")).setAttribute("data-slide",i+e),s.classList.add("mm-columns__img"),s.setAttribute("src",t.attributes.image_url),s.setAttribute("alt","@"+(t.attributes.author.username||t.attributes.author.name)),r.appendChild(s),a.appendChild(r),(s=document.createElement("span")).setAttribute("data-slide",i+e),s.classList.add("slide-overlay"),(r=document.createElement("p")).setAttribute("data-slide",i+e),r.classList.add("slide-overlay_text"),r.textContent=t.attributes.text?180<t.attributes.text.length?t.attributes.text.substring(0,180)+"...":t.attributes.text:"",s.appendChild(r),a.appendChild(s),(r=document.createElement("p")).setAttribute("data-slide",i+e),r.classList.add("post-user"),r.textContent="@"+(t.attributes.author.username||t.attributes.author.name),a.appendChild(r);var a,r,s=a;o.appendChild(s)}),document.querySelector(".grid-wrapper").appendChild(o),document.querySelectorAll(".grid__item").forEach(t=>{t.addEventListener("click",t=>{t=t.target.getAttribute("data-slide"),document.body.style.overflow="hidden",createPopupSlider(t,e,p,n,m.share_button,m),l.forEach(t=>{t.classList.add("is-active")}),setupStyles(m)})}),t=document.querySelectorAll(".grid__item"),(v>=d.length?d.length:v)===t.length&&document.querySelectorAll(".tint_content_wrapper .tint_c_loadmore").forEach(t=>{t.style.display="none"}),setupStyles(m)},_.forEach(t=>t.innerHTML=`
                <div class="tint_content_wrapper">                
                  <div class="grid-wrapper mm-columns tint_content_out">
              
                  </div>  
                  <button 
                    class="tint_c_loadmore"
                    onclick="readmoreLoadPosts()"
                  >
                    ${g.t("More Posts")}
                  </button>              
                </div>
              `);const l=document.querySelectorAll(".tint-api_popup-container"),i=document.querySelectorAll(".grid-wrapper"),o=(i.forEach(t=>t.innerHTML=s.map((t,e)=>`
                  <div data-slide="${e}" class="grid__item tint_post_item">
                    <div class="slide-image_container">
                      <img data-slide="${e}" class="mm-columns__img" src="${t.attributes.image_url}" alt="@${t.attributes.author.username||t.attributes.author.name}">
                    </div>
                    <span data-slide="${e}" class="slide-overlay">
                      <p data-slide="${e}" class="slide-overlay_text">${t.attributes.text?180<t.attributes.text.length?t.attributes.text.substring(0,180)+"...":t.attributes.text:""}</p>
                    </span>
                    <p data-slide="${e}" class="post-user">
                      @${t.attributes.author.username||t.attributes.author.name}
                    </p>
                  </div>
                `).join("")),document.querySelectorAll(".grid__item"));function r(){var t=document.querySelectorAll(".tint_content_wrapper .grid-wrapper");if(1100<window.innerWidth)t.forEach(t=>{t.style.gridTemplateColumns=`repeat(${y}, 1fr)`});else if(991<window.innerWidth){const e=4<=y?4:y;t.forEach(t=>{t.style.gridTemplateColumns=`repeat(${e}, 1fr)`})}else if(751<window.innerWidth){const a=3<=y?3:y;t.forEach(t=>{t.style.gridTemplateColumns=`repeat(${a}, 1fr)`})}else if(540<window.innerWidth){const r=2<=y?2:y;t.forEach(t=>{t.style.gridTemplateColumns=`repeat(${r}, 1fr)`})}else t.forEach(t=>{t.style.gridTemplateColumns=`repeat(${b}, 1fr)`})}o.forEach(t=>{t.addEventListener("click",t=>{t=t.target.getAttribute("data-slide"),document.body.style.overflow="hidden",createPopupSlider(t,s,p,n,m.share_button,m),l.forEach(t=>{t.classList.add("is-active")}),setupStyles(m)})}),window.addEventListener("resize",()=>r()),r(),setupStyles(m)}}catch(t){console.error(t)}}(e)}}}}((jQuery,Drupal)),jQuery,Drupal.behaviors.component_tint_slider={attach:function(t,e){const d=e.tintComponent;if("slider"===d.template){const u=document.querySelectorAll(".tint-api_out");e=`https://api.tintup.com/v2/tints/${d.api_key}/posts?include=product_tags.product`;let n=[],l=[],c=d.cta_posts;!async function t(e){try{var a=await(async t=>{const e=t;try{const a=await fetch(e),r=await a.json();return r}catch(t){throw console.error(t),t}})(e);if(a.data&&n.push(...a.data),a.included&&l.push(...a.included),a.links.next)t(a.links.next);else{const s=n.slice(0,d.max_posts),i=Array.from(new Set(l.map(JSON.stringify))).map(JSON.parse);if(!(s.length<1)){u.forEach(t=>t.innerHTML=`
              <div class="swiper tint_content_wrapper">                
                <div class="swiper-wrapper tint_content_out">
            
                </div>
                <div class='swiper-navigation'>
                  <div class='swiper-button-prev'></div>
                  <div class='swiper-button-next'></div>
                  <div class='swiper-pagination'></div>
                </div>
              </div>
            `);const o=document.querySelectorAll(".tint-api_popup-container");document.querySelectorAll(".swiper-wrapper").forEach(t=>t.innerHTML=s.map((t,e)=>`
                <div data-slide="${e}" class="swiper-slide tint_post_item">
                  <div class="slide-image_container">
                    <img data-slide="${e}" class="slide-image" src="${t.attributes.image_url}" alt="@${t.attributes.author.username||t.attributes.author.name}">
                  </div>
                  <span data-slide="${e}" class="slide-overlay">
                    <p data-slide="${e}" class="slide-overlay_text">${t.attributes.text?180<t.attributes.text.length?t.attributes.text.substring(0,180)+"...":t.attributes.text:""}</p>
                  </span>
                  <p data-slide="${e}" class="post-user">
                    @${t.attributes.author.username||t.attributes.author.name}
                  </p>
                </div>
              `).join("")),document.querySelectorAll(".swiper-slide").forEach(t=>{t.addEventListener("click",t=>{t=t.target.getAttribute("data-slide"),document.body.style.overflow="hidden",createPopupSlider(t,s,c,i,d.share_button,d),o.forEach(t=>{t.classList.add("is-active")}),setupStyles(d)})});var r="1"===d.slider_autoscroll;new Swiper(".swiper",{spaceBetween:16,speed:800,watchOverFlow:!0,direction:"horizontal",slidesPerView:1,initialSlide:1,loop:!0,autoplay:r&&{delay:3e3,disableOnInteraction:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{514:{slidesPerView:2},609:{slidesPerView:2.4},700:{slidesPerView:2.7},769:{slidesPerView:3},992:{slidesPerView:4}}}),setupStyles(d)}}}catch(t){console.error(t)}}(e)}}},function(w){w.behaviors.component_tint_tile={attach:function(t,e){const _=e.tintComponent;if("tile"===_.template){const h=document.querySelectorAll(".tint-api_out");e=`https://api.tintup.com/v2/tints/${_.api_key}/posts?include=product_tags.product`;const v=+_.initial_posts_t;let d=+v;const y=+_.max_posts,b=+_.desktop_posts_t,g=+_.mobile_posts_t;let u=[],p=[],m=_.cta_posts;!async function t(e){try{var a=await(async t=>{const e=t;try{const a=await fetch(e),r=await a.json();return r}catch(t){throw console.error(t),t}})(e);if(a.data&&u.push(...a.data),a.included&&p.push(...a.included),a.links.next)t(a.links.next);else{const s=u.slice(0,y).slice(0,v),n=Array.from(new Set(p.map(JSON.stringify))).map(JSON.parse);if(s.length<1)return;window.readmoreLoadPosts=function(){document.querySelector(".tint_content_wrapper_overlay").classList.add("wrapper_overlay_active"),document.querySelector(".wrapper_overlay__loader").classList.add("overlay_active_loader");const i=document.querySelectorAll(".grid__item").length;var t=d,t=(d=+_.more_posts_t+d,u.slice(0,y).slice(t,d));const e=u.slice(0,y).slice(0,d),o=document.createDocumentFragment();t.forEach((t,e)=>{(a=document.createElement("div")).setAttribute("data-slide",i+e),a.classList.add("grid__item","tint_post_item"),(r=document.createElement("div")).classList.add("slide-image_container"),(s=document.createElement("img")).setAttribute("data-slide",i+e),s.classList.add("mm-columns__img"),s.setAttribute("src",t.attributes.image_url),s.setAttribute("alt","@"+(t.attributes.author.username||t.attributes.author.name)),r.appendChild(s),a.appendChild(r),(s=document.createElement("span")).setAttribute("data-slide",i+e),s.classList.add("slide-overlay"),(r=document.createElement("p")).setAttribute("data-slide",i+e),r.classList.add("slide-overlay_text"),r.textContent=t.attributes.text?180<t.attributes.text.length?t.attributes.text.substring(0,180)+"...":t.attributes.text:"",s.appendChild(r),a.appendChild(s),(r=document.createElement("p")).setAttribute("data-slide",i+e),r.classList.add("post-user"),r.textContent="@"+(t.attributes.author.username||t.attributes.author.name),a.appendChild(r);var a,r,s=a;o.appendChild(s)}),document.querySelector(".tile-wrapper").appendChild(o),document.querySelectorAll(".grid__item").forEach(t=>{t.addEventListener("click",t=>{t=t.target.getAttribute("data-slide"),document.body.style.overflow="hidden",createPopupSlider(t,e,m,n,_.share_button,_),l.forEach(t=>{t.classList.add("is-active")}),setupStyles(_)})}),t=document.querySelectorAll(".grid__item"),(y>=u.length?u.length:y)===t.length&&document.querySelectorAll(".tint_content_wrapper .tint_c_loadmore").forEach(t=>{t.style.display="none"}),imagesLoaded(c,function(){document.querySelectorAll(".grid__item").forEach(t=>{t.style.opacity="1"}),r(),new Masonry(c,{itemSelector:".grid__item",gutter:15}),document.querySelector(".tint_content_wrapper_overlay").classList.remove("wrapper_overlay_active"),document.querySelector(".wrapper_overlay__loader").classList.remove("overlay_active_loader")}),setupStyles(_)},h.forEach(t=>t.innerHTML=`
                <div class="tint_content_wrapper">
                    <span class="wrapper_overlay__loader overlay_active_loader"></span>
                  <div class="tint_content_wrapper_overlay wrapper_overlay_active">
                    
                  </div>     
                  <div class="tile-wrapper mm-columns tint_content_out">
              
                  </div>  
                  <button 
                    class="tint_c_loadmore"
                    onclick="readmoreLoadPosts()"
                  >
                    ${w.t("More Posts")}
                  </button>              
                </div>
              `);const l=document.querySelectorAll(".tint-api_popup-container"),i=document.querySelectorAll(".tile-wrapper"),o=(i.forEach(t=>t.innerHTML=s.map((t,e)=>`
                  <div data-slide="${e}" class="grid__item tint_post_item">
                    <div class="slide-image_container">
                      <img data-slide="${e}" class="mm-columns__img" src="${t.attributes.image_url}" alt="@${t.attributes.author.username||t.attributes.author.name}">
                    </div>
                    <span data-slide="${e}" class="slide-overlay">
                      <p data-slide="${e}" class="slide-overlay_text">${t.attributes.text?180<t.attributes.text.length?t.attributes.text.substring(0,180)+"...":t.attributes.text:""}</p>
                    </span>
                    <p data-slide="${e}" class="post-user">
                      @${t.attributes.author.username||t.attributes.author.name}
                    </p>
                  </div>
                `).join("")),document.querySelectorAll(".grid__item"));function r(){var t=document.querySelectorAll(".tint_content_wrapper .grid__item");const e={5:"calc(20% - 12px)",4:"calc(25% - 12px)",3:"calc(33% - 12px)",2:"calc(50% - 12px)",1:"calc(100% - 12px)"};if(1100<window.innerWidth){const a=b;t.forEach(t=>{t.style.width=e[a]})}else if(991<window.innerWidth){const r=4<=b?4:b;t.forEach(t=>{t.style.width=e[r]})}else if(751<window.innerWidth){const s=3<=b?3:b;t.forEach(t=>{t.style.width=e[s]})}else if(540<window.innerWidth){const i=2<=b?2:b;t.forEach(t=>{t.style.width=e[i]})}else{const o=g;t.forEach(t=>{t.style.width=e[o]})}}o.forEach(t=>{t.addEventListener("click",t=>{t=t.target.getAttribute("data-slide"),document.body.style.overflow="hidden",createPopupSlider(t,s,m,n,_.share_button,_),l.forEach(t=>{t.classList.add("is-active")}),setupStyles(_)})}),window.addEventListener("resize",()=>r()),r(),setupStyles(_);const c=document.querySelector(".tile-wrapper");imagesLoaded(c,function(){document.querySelectorAll(".grid__item").forEach(t=>{t.style.opacity="1"}),new Masonry(c,{itemSelector:".grid__item",gutter:15}),document.querySelector(".tint_content_wrapper_overlay").classList.remove("wrapper_overlay_active"),document.querySelector(".wrapper_overlay__loader").classList.remove("overlay_active_loader")}),document.querySelector(".wrapper_overlay__loader").style.borderTop="8px solid "+_.theme_color.color}}catch(t){console.error(t)}}(e)}}}}((jQuery,Drupal));