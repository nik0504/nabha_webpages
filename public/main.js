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

  // console.log(ur);
  var type = "shopForm/" + $(".category").val() + "/" + $(".subcategory").val();
  var typeall = "allFormData/";
  // console.log(type);

  var messagesRef = firebase.database().ref(type);
  var messagesRefAll = firebase.database().ref(typeall);

  const file = document.querySelector("#photo1").files[0];
  var file2 = document.querySelector("#photo2").files[0]
    ? document.querySelector("#photo2").files[0]
    : "no";
  // var file3 = document.querySelector("#photo3").files[0]
  //   ? document.querySelector("#photo3").files[0]
  //   : "no";
  // console.log(file2 != "no");
  // console.log(file3);
  const name = +new Date() + "-" + file.name;
  const name2 = +new Date() + "-" + "Extra";
  // const name3 = +new Date() + "-" + "Owner";
  const ref1 = firebase.storage().ref(ur).child(name);
  const ref2 = firebase.storage().ref(ur).child(name2);

  const metadata = {
    contentType: file.type,
  };

  if (file2 != "no") {
    var reader1 = new FileReader();

    // Set the image for the FileReader
    reader1.onload = function (event) {
      var img = document.createElement("img");
      img.onload = function (e) {
        // Create your canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 500;
        var MAX_HEIGHT = 500;
        var width = img.width;
        var height = img.height;

        // Add the resizing logic
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        //Specify the resizing result
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        // console.log(file);

        var dataurl1 = canvas.toDataURL(
          document.querySelector("#photo1").files[0].type
        );
        // console.log(dataurl1);

        const uploadTask1 = ref1.putString(dataurl1.toString(), "data_url");

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
            uploadTask1.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                // console.log("File available at", downloadURL);
                localStorage.setItem("ShopImage", downloadURL);
                trigger();
              });
          }
        );
      };
      img.src = event.target.result;
    };
    reader1.readAsDataURL(document.querySelector("#photo1").files[0]);

    //2nd

    var reader2 = new FileReader();

    // Set the image for the FileReader
    reader2.onload = function (event) {
      var img = document.createElement("img");
      img.onload = function (e) {
        // Create your canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 500;
        var MAX_HEIGHT = 500;
        var width = img.width;
        var height = img.height;

        // Add the resizing logic
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        //Specify the resizing result
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        // console.log(file);

        // var dataurl1 = canvas.toDataURL(
        //   document.querySelector("#photo1").files[0].type
        // );
        var dataurl2 = canvas.toDataURL(
          document.querySelector("#photo2").files[0].type
        );
        // console.log(dataurl1);
        // console.log(dataurl2);

        const uploadTask2 = ref2.putString(dataurl2.toString(), "data_url");
        // console.log("2nd");
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
            uploadTask2.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                // console.log("File available at", downloadURL);
                localStorage.setItem("ShopImage2", downloadURL);
                trigger();
              });
          }
        );
      };
      img.src = event.target.result;
    };
    reader2.readAsDataURL(document.querySelector("#photo2").files[0]);
  } else {
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = document.createElement("img");
      img.onload = function (e) {
        // Create your canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 500;
        var MAX_HEIGHT = 500;
        var width = img.width;
        var height = img.height;

        // Add the resizing logic
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        //Specify the resizing result
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        var dataurl1 = canvas.toDataURL(
          document.querySelector("#photo1").files[0].type
        );
        // console.log("only 1 " + dataurl1);
        const uploadTask1 = ref1.putString(dataurl1.toString(), "data_url");

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
            uploadTask1.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                // console.log("File available at", downloadURL);
                localStorage.setItem("ShopImage", downloadURL);
                i();
              });
          }
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(document.querySelector("#photo1").files[0]);
  }

  function trigger() {
    if (
      localStorage.getItem("ShopImage").length > 0 &&
      localStorage.getItem("ShopImage2").length > 0
    ) {
      i();
    }
  }

  var shopName = $(".shopname").val();
  var category = $(".category").val();
  var subcategory = $(".subcategory").val();
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
    var newMessageRefAll = messagesRefAll.push();
    var ShopI = localStorage.getItem("ShopImage");
    var ShopI2 = localStorage.getItem("ShopImage2")
      ? localStorage.getItem("ShopImage2")
      : "";
    // var ShopI3 = localStorage.getItem("ShopImage3")
    //   ? localStorage.getItem("ShopImage3")
    //   : "";
    // console.log("File available at", ShopI);
    // console.log("File available at", ShopI2);
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
      extra4: "",
      extra5: "",
    });
    newMessageRefAll.set({
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
      extra4: "",
      extra5: "",
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
