function signOut() {
    localStorage.removeItem('emailUS');
    sessionStorage.clear();
    localStorage.removeItem('datosUserlo');
    localStorage.removeItem('profileImg');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    location.href = "index.html";
  }
  function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }


