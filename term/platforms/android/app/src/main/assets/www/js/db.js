document.addEventListener("deviceready", onDeviceReady, false);
var db;
function onDeviceReady() {
    window.plugins.sqlDB.copy("matzip", 0,
        function(tx, result) {
             alert("copy success!!");
        },
        function(error) {
             alert("copy failed");
        }
    );
    db = window.sqlitePlugin.openDatabase({name: "matzip.db", location: "default"});
}

function createTable(){
    db.transaction(function(tx){
         tx.executeSql('CREATE TABLE IF NOT EXISTS testTable (name, score)', [],
              function(tx, result) {
                   alert("success!!");
              },
              function(error) {
                   alert("failed");
              });
    });
}

function insertData(){
    db.transaction(function(tx){
         tx.executeSql("INSERT INTO testTable VALUES(?,?)", [txtName.value, txtScore.value]);
    });
}

function selectData(){
    db.transaction(function(tx){
         tx.executeSql("SELECT * FROM testTable", [], successCB);
    });
}

function successCB(tx, res){
    document.getElementById('resultTable').innerHTML = "<th>가게 명</th><th>평점</th><th>자세히</th>";
    for(var i = 0; i < res.rows.length; i++){
          var row = res.rows.item(i);
          document.getElementById('resultTable').innerHTML += "<tr><td>" + row['name'] + "</td><td>" + row['score'] + "</td><td></td></tr>";
    }
}