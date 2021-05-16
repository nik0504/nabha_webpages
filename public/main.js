var config = {
  apiKey: "AIzaSyAyG7NvTcckmS_hVMdoIWIsC6zAulb1SNY",
  authDomain: "nabha-app.firebaseapp.com",
  databaseURL: "https://nabha-app.firebaseio.com",
  projectId: "nabha-app",
  storageBucket: "nabha-app.appspot.com",
  messagingSenderId: "420620959416",
  appId: "1:420620959416:web:cdfc9c1adf5204b6ecbe4d",
  measurementId: "G-8YMMEMVDXY",
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

$("#contactForm").submit(function (e) {
  e.preventDefault();
  localStorage.clear();
  localStorage.setItem("ShopImage", "");
  localStorage.setItem("ShopImage2", "");
  var ur =
    "Shops/" +
    $(".category").val() +
    "/" +
    $(".subcategory").val() +
    "/" +
    $(".shopname").val() +
    $(".phoneNo").val();

  console.log(ur);
  var type = "shopForm/" + $(".category").val() + "/" + $(".subcategory").val();
  console.log(type);
  var messagesRef = firebase.database().ref(type);

  const ref = firebase.storage().ref(ur);
  const file = document.querySelector("#photo1").files[0];
  var file2 = document.querySelector("#photo2").files[0]
    ? document.querySelector("#photo2").files[0]
    : "no";
  // var file3 = document.querySelector("#photo3").files[0]
  //   ? document.querySelector("#photo3").files[0]
  //   : "no";
  console.log(file2 != "no");
  // console.log(file3);
  const name = +new Date() + "-" + file.name;
  const name2 = +new Date() + "-" + "Extra";
  // const name3 = +new Date() + "-" + "Owner";
  const metadata = {
    contentType: file.type,
  };

  if (file2 != "no") {
    const uploadTask2 = ref.child(name2).put(file2, metadata);
    console.log("2nd");
    uploadTask2.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {},
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      function () {
        uploadTask2.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          localStorage.setItem("ShopImage2", downloadURL);
          trigger();
        });
      }
    );

    const uploadTask1 = ref.child(name).put(file, metadata);

    uploadTask1.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {},
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      function () {
        // if (file2 == "no") {
        //   localStorage.setItem("ShopImage2", "");
        // }
        uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          localStorage.setItem("ShopImage", downloadURL);
          // setTimeout(function () {
          //   i();
          // }, 1000);
          // i();
          trigger();
        });
      }
    );
    // i();
  } else {
    const uploadTask1 = ref.child(name).put(file, metadata);

    uploadTask1.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {},
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      function () {
        if (file2 == "no") {
          localStorage.setItem("ShopImage2", "");
        }
        uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          localStorage.setItem("ShopImage", downloadURL);
          // setTimeout(function () {
          //   i();
          // }, 1000);
          i();
        });
      }
    );
  }

  function trigger() {
    if (
      localStorage.getItem("ShopImage").length > 0 &&
      localStorage.getItem("ShopImage2").length > 0
    ) {
      i();
    }
  }

  // if (file3 != "no") {
  //   const uploadTask3 = ref.child(name3).put(file3, metadata);
  //   console.log("3rrrd");

  //   uploadTask3.on(
  //     firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //     function (snapshot) {},
  //     function (error) {
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           break;
  //         case "storage/canceled":
  //           break;
  //         case "storage/unknown":
  //           break;
  //       }
  //     },
  //     function () {
  //       uploadTask3.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //         console.log("File available at", downloadURL);
  //         localStorage.setItem("ShopImage3", downloadURL);
  //       });
  //     }
  //   );
  // }

  // const uploadTask1 = ref.child(name).put(file, metadata);

  // uploadTask1.on(
  //   firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //   function (snapshot) {},
  //   function (error) {
  //     switch (error.code) {
  //       case "storage/unauthorized":
  //         break;
  //       case "storage/canceled":
  //         break;
  //       case "storage/unknown":
  //         break;
  //     }
  //   },
  //   function () {
  //     if (file2 == "no") {
  //       localStorage.setItem("ShopImage2", "");
  //     }
  //     uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //       console.log("File available at", downloadURL);
  //       localStorage.setItem("ShopImage", downloadURL);
  //       // setTimeout(function () {
  //       //   i();
  //       // }, 1000);
  //       i();
  //     });
  //   }
  // );
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

  var shopName = $(".shopname").val();
  var category = $(".category").val();
  var subCategory = $(".subcategory").val();
  var yourname = $(".yourname").val();
  var phoneNo = $(".phoneNo").val();
  var wphoneNo = $(".wphoneNo").val();
  var oTime = $(".oTime").val();
  var cTime = $(".cTime").val();
  var address = $(".address").val();
  var nearby = $(".nearby").val();
  var map = $(".map").val();
  var description = $(".description").val();

  function i() {
    var newMessageRef = messagesRef.push();
    var ShopI = localStorage.getItem("ShopImage");
    var ShopI2 = localStorage.getItem("ShopImage2")
      ? localStorage.getItem("ShopImage2")
      : "";
    // var ShopI3 = localStorage.getItem("ShopImage3")
    //   ? localStorage.getItem("ShopImage3")
    //   : "";
    console.log("File available at", ShopI);
    console.log("File available at", ShopI2);
    newMessageRef.set({
      shopName: shopName,
      category: category,
      subCategory: subcategory,
      ownerName: yourname,
      phoneNo: phoneNo,
      wphoneNo: wphoneNo,
      oTime: oTime,
      cTime: cTime,
      address: address,
      nearby: nearby,
      map: map,
      description: description,
      ShopImage2: ShopI2.length < 1 ? [ShopI] : [ShopI, ShopI2],
      ShopImage: ShopI,
      // ShopImage3: ShopI3,
      verify: false,
      slider: [""],
      extra1: "",
      extra2: "",
      extra3: "",
    });
    localStorage.clear();
    $(".success-message").show();
    alert("success");
    $("#contactForm")[0].reset();
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
