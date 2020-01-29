$(document).ready(function(){

  // MODAL
  var modalText = {
    rogue: {
      title: 'Election Map',
      tag: 'RESULTS ARE IN',
      detail: 'An interactive map of the results of a hypothetical election created with Javascript. Users can reveal who the winner is by mousing over each state, and the tables reflect the results as well.',
      link: 'portfolio/unplugged/index.html'
    },
    unplugged: {
      title: 'Unplugged',
      tag: 'RETREAT FROM THE MODERN WORLD',
      detail: 'Unplugged is a retreat that encourages individuals and teams to unplug from technology and spend time in nature, relaxing and bonding in the wilderness. Its beautifully designed site looks fantastic on a range of screens, from big to small.',
      link: 'portfolio/unplugged/index.html'
    },
    accelerate: {
      title: 'Accelerate Marketing',
      tag: 'MULTI-LEVEL MARKETING.',
      detail: 'Accelerate is a world class marketing company. Building off a previously implemented WordPress Theme, its site is now robust and functional thanks to a customized WordPress Child Theme that meets all their business needs.',
      link: 'http://webdevsteph.wpengine.com/'
    },
    dorothy: {
      title: 'Dorothy DeLong Photography',
      tag: 'FEMINIST PHOTOGRAPHY',
      detail: 'Dorothy is a feminist photographer who travels the country snapping pics of women doing amazing things. She wanted an elegant and modern website to showcase her work and all it to be shown more widely.',
      link: 'file:///C:/Users/steph/Desktop/portfolio-2-redesign/dorothy-delong-portfolio/index.html'
    },
    wholebean: {
      title: 'The Whole Bean',
      tag: 'COFFEE SHOP & CAFE',
      detail: 'The Whole Bean is your new neighborhood coffee shop. The brands identity was carefully crafted to complement the brands personality and inspire trust and loyalty to boost business and attract customers. Combined with an effective landing page, The Whole Bean was able to generate buzz and email subscribers for its grand opening.',
      link: 'file:///C:/Users/steph/Desktop/portfolio-2-redesign/whole-bean/index.html'
    },
    wordpress: {
      title: 'WordPress Blog',
      tag: 'PERSONAL BLOG',
      detail: 'An elegant and clean blog built by customizing a standard WordPress Theme.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart,
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)');
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)');
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });

    });
  }
})
