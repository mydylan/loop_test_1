var request = new XMLHttpRequest();
request.open('GET', 'http://loopme.me/api/v2/ads?p=1&vt=g89v1bs9cx&ak=caab1e2a20&pp=1', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    console.log(data);
  } else {
    console.log(error);

  }
};