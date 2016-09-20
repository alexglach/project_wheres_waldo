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
      dataType: "json",
      // contentType: "application/json",
      success: function(response){
        callback(response);
      }
    })
  };

  var getTags = function(scoreID, callback) {
    $.get({
      url: "/tags", // "/scores/" + scoreID,
      data: {
        id: scoreID
      },
      dataType: "json",
      success: function(response) {
        console.log(response);
        callback(response)
      },
    })
  };

  var getCharacters = function(scoreID) {
    $.get({
      url: "/scores",
      data: {
        id: scoreID
      },
      dataType: "json",
      success: function(response) {
        return response;
      },
    })
  };

  return {
    newTag: newTag,
    getTags: getTags,
    getCharacters: getCharacters
  }

})();


var photoMethods = {

  friends: [],

  updateFriends: function(){
    friends = AJAX.getCharacters(parseInt(window.location.href.split("/").pop()));
  },

  fixTargetEvent: function(event) {
    var friendList = $("<ul class='friends' id='current-ul'></ul>");
    for (var i = 0; i< photoMethods.friends.length; i++) {
      var listItem = $("<li></li>").text(photoMethods.friends[i].name)
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

    $('#current-ul').click(function(e) {
      $(e.target).addClass('selected')
      var $liToDelete = $('#current-ul li').filter( function(){
        return (!$(this).hasClass('selected'));
      });
      $liToDelete.remove();
      $('#current-ul').attr('id', "");

      AJAX.newTag(leftCoord, topCoord, e.target.innerHTML,
                  photoMethods.addNewTagToDOM);

      $('img').on('click', photoMethods.fixTargetEvent);

    });

    $('img').on('click', photoMethods.allowTagCancel);

  },

  loadTags: function() {
    AJAX.getTags(parseInt(window.location.href.split("/").pop()), photoMethods.placeSavedTags);

  },

  placeSavedTags: function(savedTags) {
    for (var i = 0; i < savedTags.length; i += 1) {
      photoMethods.addNewTagToDOM(savedTags[i]);
    }
  },


  addNewTagToDOM: function(tagObj) {
    var leftCoord = tagObj.x_location;
    var topCoord = tagObj.y_location;

    var frame = $('<div/>')
                    .addClass('fixed-container')
                    .css('top', topCoord)
                    .css('left', leftCoord)
                    .append($('<div/>').addClass('fixed-tags'));

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
  photoMethods.loadTags();
  $(".fixed-container").hide();
  $('#photo-div').mouseenter(function(){
    $(".fixed-container").show();
  });
  $('#photo-div').mouseleave(function(){
    $(".fixed-container").hide();
  });
  photoMethods.updateFriends();

});
