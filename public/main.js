var config = {
  apiKey: "AIzaSyAyG7NvTcckmS_hVMdoIWIsC6zAulb1SNY",
  authDomain: "nabha-app.firebaseapp.com",
  databaseURL: "https://nabha-app.firebaseio.com",
  projectId: "nabha-app",
  storageBucket: "nabha-app.appspot.com",
  messagingSenderId: "420620959416",
  appId: "1:420620959416:web:cdfc9c1adf5204b6ecbe4d",
  measurementId: "G-8YMMEMVDXY"
};
firebase.initializeApp(config);

// var type = 'shopForm/'+ $('.category').val();
// console.log(type);

// var messagesRef = firebase.database().ref(type);
// // var ref = firebase.storage().ref();
// $(document).ready(function(){
//   $("select").change(function(){
//     // alert("The text has been changed.");
//  type = 'shopForm/'+ $('.category').val();

//   });
// });

$('#contactForm').submit(function (e) {
  e.preventDefault();
  localStorage.clear();
  var ur = "Shops/" + $('.shopname').val() + $('.phoneNo').val();
  
  var type = 'shopForm/'+ $('.category').val();
console.log(type);
var messagesRef = firebase.database().ref(type);

  const ref = firebase.storage().ref(ur);
  const file = document.querySelector("#photo1").files[0];
  const file2 = document.querySelector("#photo2").files[0] ? document.querySelector("#photo2").files[0] : "no";
  const file3 = document.querySelector("#photo3").files[0];
  console.log(file2);
  const name = +new Date() + "-" + file.name;
  const name2 = +new Date() + "-";
  const name3 = +new Date() + "-";
  const metadata = {
    contentType: file.type
  };
  const uploadTask1 = ref.child(name).put(file, metadata);


  uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      //   case firebase.storage.TaskState.PAUSED: // or 'paused'
      //     console.log('Upload is paused');
      //     break;
      //   case firebase.storage.TaskState.RUNNING: // or 'running'
      //     console.log('Upload is running');
      //     break;
      // }
    }, function (error) {

      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }, function () {
      uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        localStorage.setItem("ShopImage", downloadURL);
        i();
      });
    });

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
  // uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
  //     // firebase.database().ref(ur)
  //     .then(url => {
  //       console.log(url);
  //       localStorage.setItem("url", url);
  //     })
  //     .catch(console.error);

  var shopName = $('.shopname').val();
  var category = $('.category').val();
  var yourname = $('.yourname').val();
  var phoneNo = $('.phoneNo').val();
  var oTime = $('.oTime').val();
  var cTime = $('.cTime').val();
  var address = $('.address').val();
  var nearby = $('.nearby').val();
  var description = $('.description').val();

  function i() {
    var newMessageRef = messagesRef.push();
    var ShopI = localStorage.getItem("ShopImage");
    console.log('File available at', ShopI);
    newMessageRef.set({
      shopName: shopName,
      category: category,
      ownerName: yourname,
      phoneNo: phoneNo,
      oTime: oTime,
      cTime: cTime,
      address: address,
      nearby: nearby,
      description: description,
      ShopImage: ShopI,
      verify:'false'
    });
  }

  // var newMessageRef = messagesRef.push();
  // var ShopI = localStorage.getItem("ShopImage");
  // console.log('File available at', ShopI);
  // newMessageRef.set({
  //   shopName: $('.shopname').val(),
  //   category: $('.category').val(),
  //   name: $('.yourname').val(),
  //   phoneNo: $('.phoneNo').val(),
  //   oTime: $('.oTime').val(),
  //   cTime: $('.cTime').val(),
  //   address: $('.address').val(),
  //   nearby: $('.nearby').val(),
  //   description: $('.description').val(),
  //   ShopImage: ShopI,
  // });

  $('.success-message').show();
  alert("success");

  $('#contactForm')[0].reset();
}
);

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