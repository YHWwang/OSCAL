$(function () {
  gallerySort = function (name) {
    let html = ''
    switch (name) {
      case 'night': setModal(3); break;
      case 'light': setModal(2); break;
      case 'dog': setModal(3); break;
      case 'flower': setModal(3); break;
    }
    function setModal(num) {
      for (let i = 1; i <= num; i++) {
        html += `
    <input type="radio" name="slide_switch" id="`+ name + i + `" ${ i==1?'checked="checked"':''}>
    <label for="`+ name + i + `">
        <img width="100" src="../static/img/gallery/`+ name + i + `.jpg" width="100">
    </label>
    <img class="big-img" src="../static/img/gallery/`+ name + i + `.jpg">
    `
      }
      $('.galleryContent .modal-dialog .slider').html(html)
    }
  }
})