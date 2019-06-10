


let rootRef = firebase.database().ref().child("users");

rootRef.on("child_added", snap => {

    let name = snap.child("Name").val();
    let email = snap.child("Email").val();

    $("#table_body").append
        ("<tr><td>" + name + "</td>
        < td > " + email + "</td > <td>

                </tr > ");
});


let rootRef = firebase.database().ref().child("users");
$("#table_body").on('click','.delete-btn', function(e){
    let $row = $(this).closest('tr'),
       rowId = $row.data('id');
    let userKey = rootRef.child("id");

    rootRef.child(userKey).remove()

    .then(function() {
      $row.remove();
    })

    .catch(function(error) {
      console.log('ERROR');
    });
});

rootRef.on("child_changed", snap => {

  let userKey = snap.child("id").val();
  let name = snap.child("name").val();
  let brand = snap.child("brand").val();

$("#table_body").append("<tr data-id='"+userKey+"'>"+
                          "<td>" + name + "</td>" +
                          "<td>" + brand + "</td>" +

                          "<td><div buttons>"+
                                  "<button class='delete-btn>delete</button>"+
                                  "</div></td></tr>");
});


 firebase.initializeApp(firebaseConfig);

const subjectsList = [];
let groupList = [];
let firstName;
let lastName;
let userStudie;
let chatId;
let subject;
