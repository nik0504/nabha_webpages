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

$("#contactForm").submit(function (e) {
  e.preventDefault();
  localStorage.clear();
  localStorage.setItem("ShopImage", "");
  // localStorage.setItem("ShopImage2", "");
  var ur =
    "workerForm/" +
    $(".category").val() +
    //   "/" +
    //   $(".subcategory").val() +
    "/" +
    $(".shopname").val() +
    $(".phoneNo").val();

  // console.log(ur);
  var type = "workerForm/" + $(".category").val();
  // console.log(type);
  var messagesRef = firebase.database().ref(type);

  var file = document.querySelector("#photo1").files[0];
  // var date = new Date();
  // console.log(date);

  const name = +new Date() + "-" + file.name;

  const ref = firebase.storage().ref(ur).child(name);

  // const name = +new Date() + "-" + file.name;

  // const name2 = +new Date() + "-" + "Extra";
  // const name3 = +new Date() + "-" + "Owner";
  // const metadata = {
  //   contentType: file.type,
  // };
  // console.log(file);

  // if (file) {
  var reader = new FileReader();

  // Set the image for the FileReader
  reader.onload = function (event) {
    var img = document.createElement("img");
    img.onload = function (e) {
      // Create your canvas
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var MAX_WIDTH = 300;
      var MAX_HEIGHT = 300;
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

      var dataurl = canvas.toDataURL(
        document.querySelector("#photo1").files[0].type
      );
      const uploadTask1 = ref.putString(dataurl.toString(), "data_url");

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
  // }

  // const name = +new Date() + "-" + file.name;
  // // const name2 = +new Date() + "-" + "Extra";
  // // const name3 = +new Date() + "-" + "Owner";
  // const metadata = {
  //   contentType: file.type,
  // };

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
  //     //   if (file2 == "no") {
  //     //     localStorage.setItem("ShopImage2", "");
  //     //   }
  //     uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //       console.log("File available at", downloadURL);
  //       localStorage.setItem("ShopImage", downloadURL);
  //       i();
  //     });
  //   }
  // );

  var shopName = $(".shopname").val();
  var category = $(".category").val();
  // var yourname = $(".yourname").val();
  var phoneNo = $(".phoneNo").val();
  var wphoneNo = $(".wphoneNo").val();
  // var oTime = $(".oTime").val();
  // var cTime = $(".cTime").val();
  // var address = $(".address").val();
  // var nearby = $(".nearby").val();
  // var map = $(".map").val();
  var description = $(".description").val();
  // var date = new Date();

  function i() {
    var newMessageRef = messagesRef.push();
    var ShopI = localStorage.getItem("ShopImage");
    // var ShopI3 = localStorage.getItem("ShopImage3")
    //   ? localStorage.getItem("ShopImage3")
    //   : "";
    // console.log("File available at", ShopI);
    //   console.log("File available at", ShopI2);
    // const d = new Date();
    // console.log(date);
    newMessageRef.set({
      shopName: shopName,
      category: category,
      // ownerName: yourname,
      phoneNo: phoneNo,
      wphoneNo: wphoneNo,
      // oTime: oTime,
      // cTime: cTime,
      // address: address,
      // nearby: nearby,
      // map: map,
      description: description,
      // ShopImage2: ShopI2.length < 1 ? [ShopI] : [ShopI, ShopI2],
      ShopImage: [ShopI],
      // ShopImage3: ShopI3,
      verify: false,
      // createdOn: date.length > 0 ? date : "",
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
});
