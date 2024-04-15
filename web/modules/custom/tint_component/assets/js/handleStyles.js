function setupStyles(tint_user_settings) {

    const post_user_main = document.querySelectorAll('.paragraph--type--tint-component .post-user');
    const post_overlay = document.querySelectorAll('.paragraph--type--tint-component .tint_post_item');
    const popup_text_content = document.querySelectorAll('.paragraph--type--tint-component .popup_slide-content');
    const popup_close_btn = document.querySelectorAll('.paragraph--type--tint-component .close-popup_btn');
    const load_bore_btn = document.querySelectorAll('.paragraph--type--tint-component .tint_c_loadmore');

    const popupSwiperArrowP = document.querySelector('.popup-swiper .swiper-button-prev');
    const popupSwiperArrowN = document.querySelector('.popup-swiper .swiper-button-next');

    const theme_color = tint_user_settings.theme_color.color;
    const text_color = tint_user_settings.text_color.color;
    const popup_text_color = tint_user_settings.popup_color.color;
    const overlay_bg_color = tint_user_settings.overlay_bg;
    const overlay_text_color = tint_user_settings.overlay_text_color.color;

    const leftArrow = `
        <svg width="60px" height="60px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L3 7.5L10 1" stroke=${theme_color} stroke-linecap="square"/>
        </svg>
    `;

    const rightArrow = `
        <svg width="60px" height="60px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 14L12 7.5L5 1" stroke=${theme_color} stroke-linecap="square"/>
        </svg>
    `;

    if (popupSwiperArrowN) {
        popupSwiperArrowN.innerHTML = rightArrow;
    }
    
    if (popupSwiperArrowP) {
        popupSwiperArrowP.innerHTML = leftArrow;
    }        

    post_user_main.forEach(user_main => {
        user_main.style.backgroundColor = theme_color;
        user_main.style.color = text_color;
    });

    post_overlay.forEach(postTeaser => {
        const gradient = `linear-gradient(48deg, ${defineRGBA(overlay_bg_color.color, overlay_bg_color.opacity)} 49%, ${defineRGBA(overlay_bg_color.color, overlay_bg_color.opacity)} 100%)`;

        postTeaser.querySelector('.slide-overlay').style.background = gradient;
        postTeaser.querySelector('.slide-overlay').style.color = overlay_text_color;
    });

    load_bore_btn.forEach(button => {
        if(button) {
            button.style.background = theme_color;
            button.style.color = text_color;
            button.style.border = `1px solid ${theme_color}`;

            button.addEventListener('mouseover', () => {
                button.style.background = text_color;
                button.style.color = theme_color;
            });
            button.addEventListener('mouseleave', () => {
                button.style.background = theme_color;
                button.style.color = text_color;
            });
        }
    })

    popup_text_content.forEach(content => {
        const shareBtn = content.querySelector('.slide-bottom_share svg path');
        const readMoreBtn = content.querySelector('.popup_slide-bottom .bottom_cta');
        const bottomCtaContent = content.querySelector('.popup_slide-bottom .bottom_cta_content');

        content.style.color = popup_text_color;   
        shareBtn.style.fill = theme_color;        

        if(bottomCtaContent) {
            bottomCtaContent.style.background = theme_color;
            bottomCtaContent.style.color = text_color;
            bottomCtaContent.style.border = `1px solid ${theme_color}`;

            bottomCtaContent.addEventListener('mouseover', () => {
                bottomCtaContent.style.background = text_color;
                bottomCtaContent.style.color = theme_color;
            });
            bottomCtaContent.addEventListener('mouseleave', () => {
                bottomCtaContent.style.background = theme_color;
                bottomCtaContent.style.color = text_color;
            });
        }     

        if(readMoreBtn) {
            readMoreBtn.style.background = theme_color;
            readMoreBtn.style.color = text_color;
            readMoreBtn.style.border = `1px solid ${theme_color}`;
    
            readMoreBtn.addEventListener('mouseover', () => {
                readMoreBtn.style.background = text_color;
                readMoreBtn.style.color = theme_color;
            });
            readMoreBtn.addEventListener('mouseleave', () => {
                readMoreBtn.style.background = theme_color;
                readMoreBtn.style.color = text_color;
            });
        }     
    });

    popup_close_btn.forEach(button => {
        button.querySelectorAll('span').forEach(span => {
            span.style.background = theme_color;
        })
    });

    function defineRGBA(hex, alpha) {
        hex = hex.replace('#', '');
    
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }    
}