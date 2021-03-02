// var config = {
// apiKey: "AIzaSyAyG7NvTcckmS_hVMdoIWIsC6zAulb1SNY",
//     authDomain: "nabha-app.firebaseapp.com",
//     databaseURL: "https://nabha-app.firebaseio.com",
//     projectId: "nabha-app",
//     storageBucket: "nabha-app.appspot.com",
//     messagingSenderId: "420620959416",
//     appId: "1:420620959416:web:cdfc9c1adf5204b6ecbe4d",
//     measurementId: "G-8YMMEMVDXY"
// };
// firebase.initializeApp(config);

var messagesRef = firebase.database().ref('contactformmessages');
// var ref = firebase.storage().ref();

$('#contactForm').submit(function(e) {
    e.preventDefault();
    // var ur="";
    const ref = firebase.storage().ref();
      const file = document.querySelector("#photo").files[0];
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
    //   task.on('state_changed', function(snapshot){

    //   },
    //   function(){
    // var messagesRef = firebase.database().ref('contactformmessages');
    // var newMessageRef = messagesRef.push().key;
    // var durl= task.snapshot.databaseURL;
    //       console.log(durl);
    // var updates = {};
    // var postData = {
    //     name: $('.fullname').val(),
    //     email: $('.email').val(),
    //     subject: $('.subject').val(),
    //     message: $('.message').val(),
    //     url: durl
    // }
    // updates['/contactformmessages'+newMessageRef] = postData;
    // firebase.database().ref().update(updates);
    //       }
    //   );
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(url);
          localStorage.setItem("url", url);
          // setvalue(url);
          // const uri=url;
          // const ur=url;
          // console.log("fkjnsfnkjc "+ ur);
// var messagesRef = firebase.database().ref('contactformmessages');

//           var newMessageRef = messagesRef.push();
//     newMessageRef.set({
//         name: $('.fullname').val(),
//         email: $('.email').val(),
//         subject: $('.subject').val(),
//         message: $('.message').val(),
//         url: url
//     });

          // document.querySelector("#image").src = url;
        })
        .catch(console.error);
 
    var newMessageRef = messagesRef.push();
    var url=localStorage.getItem("url");
    newMessageRef.set({
        shopName: $('.shopname').val(),
        name: $('.yourname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val(),
        url: url,
    });
 
    $('.success-message').show();
 
    $('#contactForm')[0].reset();
});

// function setvalue(url){
//           var newMessageRef = messagesRef.push();
//      newMessageRef.set({
//         name: $('.fullname').val(),
//         email: $('.email').val(),
//         subject: $('.subject').val(),
//         message: $('.message').val(),
//         url: url
//     });
// }