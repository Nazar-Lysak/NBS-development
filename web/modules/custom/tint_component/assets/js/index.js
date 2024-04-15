(function ($, Drupal) {
    Drupal.behaviors.component_tint_init = {    
      attach: function (context, settings) { 

        // styled initial loader
        
        const loaderElement = document.querySelectorAll('.paragraph--type--tint-component .tint-api_out .loader')
        
        const theme_color = settings.tintComponent.theme_color.color;
        loaderElement.forEach(loader =>{
          loader.style.borderTop = `8px solid ${theme_color}`;
        })        
      }
    };
  })(jQuery, Drupal);


  

  
  
  
  