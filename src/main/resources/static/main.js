// import jQuery https://code.jquery.com/jquery-3.3.1.min.js
var elementSelected = null;
var typeSelected = false;
var ChoicePick=null;

var elementSelected2 = null;
var typeSelected2 = false;
var ChoicePick2=null;

$(document).on('click', '.list-image > img', function(){
  $('.list-image > img').each(function(){
    $(this).removeClass('active');
  })
  $(this).addClass('active');
  elementSelected = $(this);
   ChoicePick=$(this).attr('alt');
  typeSelected = false;
});
/* 
$(document).on('click', '.list-image2 > img', function(){
  $('.list-image2 > img').each(function(){
    $(this).removeClass('active');
  })
  $(this).addClass('active');
  elementSelected2 = $(this);
   ChoicePick2=$(this).attr('alt');
  typeSelected2 = false;
});
*/
$(document).on('input', '#text-src', function(){
  $('.list-image > img').each(function(){
    $(this).removeClass('active');
  })
  elementSelected = $(this);
  typeSelected = true;
})

$(document).on('click', '#button-confirm', function(){
 /* $('.select-image').hide();*/
$('#button-confirm').hide();

  if(typeSelected == true){
    $('.view-image > img').attr('src', elementSelected.val());
     console.log('***** ' + ChoicePick);
  }
  else{
    $('.view-image > img').attr('src', elementSelected.attr('src'));
       console.log('***** ' + ChoicePick);
}
  $('.view-image').fadeIn('high');
})

$(document).on('click', '#button-other', function(){
  $('.view-image').hide();
  $('.select-image').fadeIn('high');
$('#button-confirm').show();
})