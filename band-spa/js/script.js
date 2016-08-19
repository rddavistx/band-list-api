"use strict";
$(document).ready(function() {
  loadBands()
  $(document).on('click', 'a.deleteBand', function (e) {
    e.preventDefault()
    var link = $(this)

    $.ajax({
      url: link.attr('href'),
      method: 'DELETE'
    })
    .done(function () {
      link.parent('li').remove()
    })
  })
});

function loadNewBands() {
  $('#new-band').on('submit', function() {
    var newBandName = $('#new-band-name').val();
    var newBandGenre = $('new-band-genre').val();
    console.log(newBandName);
    $.ajax({
      url: 'http://localhost:3000/bands',
      type: 'POST',
      data: $('#new-band').serialize()
    })
  })
}
loadNewBands()


function loadBands() {
  $.ajax({
      url: 'http://localhost:3000/bands',
    })
    .done(function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        data[i]
        var li = $('<li></li>')
        var band = data[i]
        li.html(band.name + ' ')
        var a = $('<a></a>')
        a.text('DELETE')
        a.attr('href','http://localhost:3000/bands/' + band._id)
        a.addClass('deleteBand')
        li.append(a)
        $('#bandList').append(li)
      }
    })
}
