var AJAX = (function() {

  var newTag = function(x, y, name, callback) {
    var data = {
      character_name: name,
      x_location: x,
      y_location: y,
      score_id: parseInt(window.location.href.split('/').pop())
    }
    $.post({
      url: "/tags", 
      data: data,
      success: function(response){
        callback(response);
      }
    })
  }

  return {
    newTag: newTag
  }

})();


var photoMethods = {

  friends: ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"],

  fixTargetEvent: function(event) {
    var friendList = $("<ul class='friends'></ul>");
    for (var i = 0; i< photoMethods.friends.length; i++) {
      var listItem = $("<li></li>").text(photoMethods.friends[i])
      friendList.append(listItem);
    }

    var leftCoord = event.pageX - 50 + "px";
    var topCoord = event.pageY - 25 + "px";

    var frame = $('<div/>')
                    .addClass('fixed-container')
                    .css('top', topCoord)
                    .css('left', leftCoord);

    $('#photo-div').append(frame);


    frame.append(
      $('<div/>')
      .addClass('fixed-tags')
      );

    frame.append(friendList);

    $('img').off('click', photoMethods.fixTargetEvent);

    $('ul').click(function(e) {
      // send an AJAX request registering a tag whose character_name attribute is the e.target.text();
      // whose x_location and y_location are the center of the fixTarget div
      // i.e. leftCoord, leftCoord

      frame.remove();

      AJAX.newTag(leftCoord, topCoord, e.target.text,
                  photoMethods.addNewTagToDOM);

      // var list = $(e.currentTarget);
      // list.parent().addClass('selectedCont');

      // var currentEle = $(e.target);
      // currentEle.addClass("selected");

      // list.after(
      //   $('<li/>')
      //   .addClass('remove-tag')
      //   .text("Remove tag")
      //   );

      // $('ul').children().filter(function(_, ele) {
      //   ele = $(ele);
      //   return !ele.hasClass('selected');
      // }).hide();
      $('img').on('click', photoMethods.fixTargetEvent);

    });

    $('img').on('click', photoMethods.allowTagCancel);

  },

  addNewTagToDOM: function(tagObj) {
    var leftCoord = tagObj.x_location;
    var topCoord = tagObj.y_location;

    var frame = $('<div/>')
                    .addClass('fixed-container')
                    .css('top', topCoord)
                    .css('left', leftCoord);

    $('#photo-div').append(frame);
    var $friendList = $("<ul class='friends'></ul>");
    var $newTag = $("<li></li>").text(tagObj.character_name);
    $friendList.append($newTag);
    frame.append($friendList);
  },

  allowTagCancel: function() {
    if (!$('.fixed-container').last().hasClass('selectedCont')) {
      $('.fixed-container').last().remove();
    }
    $('img').on('click', photoMethods.fixTargetEvent);
    $('img').off('click', photoMethods.allowTagCancel);
  },

  fixTarget: function() {
    $('img').on('click', photoMethods.fixTargetEvent);
  },

};

$(document).ready(function() {
  photoMethods.fixTarget();
  $(".fixed-container").hide();
  $('#photo-div').mouseenter(function(){
    $(".fixed-container").show();
  });
  $('#photo-div').mouseleave(function(){
    $(".fixed-container").hide();
  });
  // $('#photo-div').hover(function() {
  //   $(".fixed-container").show();
  // }, function(){
  //   $(".fixed-container").hide();
  // })
});
