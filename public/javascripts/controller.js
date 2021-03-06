// Generated by CoffeeScript 1.4.0

this.addPages = function(page) {
  var formData, xhr;
  document.getElementById(page.id).innerHTML = "<div class=\"iPreview\"><img src=\"../Images/Icons/Load/load-8.gif\" alt=\"load\"></div>";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      return document.getElementById(page.id).innerHTML = "<div class=\"simple_buttons\"><div class=\"bwIcon i_16_checkbox ui-state-active\" style=\"cursor:default;\">Added</div></div>";
    }
  };
  xhr.open('POST', "/app/dashboard/addPages", true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  formData = new FormData();
  formData.append('id', page.id);
  formData.append('name', page.getAttribute('name'));
  formData.append('category', page.getAttribute('category'));
  formData.append('accessKey', page.getAttribute('accesskey'));
  return xhr.send(formData);
};

this.activatePage = function(pageId, pageName) {
  var formData, xhr;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    var data;
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      data.user = data.message;
      return document.getElementById('pageList').innerHTML = window.toffee.templates["/pageList.toffee"].render(data);
    }
  };
  xhr.open('POST', "/app/dashboard/activatePage", true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  formData = new FormData();
  formData.append('id', pageId);
  formData.append('name', pageName);
  return xhr.send(formData);
};

this.closeModal = function(button) {
  document.getElementById('simpleModal').style.opacity = 0;
  document.getElementById('background').style.display = 'none';
  document.closeFunction(function(err) {
    if (err != null) {
      return console.log(err);
    }
  });
  return document.closeFunction = null;
};

this.openModal = function(partial, onOpen, onClose) {
  document.getElementById('background').style.display = 'block';
  document.getElementById('simpleModal').innerHTML = window.toffee.templates["/" + partial + ".toffee"].render({});
  document.closeFunction = onClose;
  document.getElementById('simpleModal').style.opacity = 1;
  return onOpen(function(err, data) {
    if (err != null) {
      console.log(err);
    }
    return document.getElementById('simpleModal').innerHTML = window.toffee.templates["/" + partial + ".toffee"].render(data);
  });
};

this.openPagePopup = function() {
  return this.openModal("pagePopup", function(callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      var data;
      if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        return callback(null, data);
      }
    };
    xhr.open('POST', "/app/dashboard/getPages", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return xhr.send();
  }, function(callback) {
    return document.getElementById('pageList').innerHTML = window.toffee.templates["/pageList.toffee"].render(window.user);
  });
};
