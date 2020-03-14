//
// Chrome V8 エンジン有効時に列挙可能なプロパティを表示
//

function testEnumerableProperties() {
  PrintKeys(PropertiesService.getScriptProperties());
  PrintKeys(new Object());
  PrintKeys(new Array());
  var  testObj = function(){};
  testObj.prototype.a = "a";
  testObj.b = "b";
  PrintKeys(testObj);

}

function PrintKeys(value){
  Logger.log("Object.keys(%s) = %s", value, Object.keys(value));
  Logger.log("Object.getOwnPropertyNames(%s) = %s", value, Object.getOwnPropertyNames(value));  
}

function createGoogleDriveTextFile() {
  var FOLDER_ID = "0BxQFVoGrWK1pV2d4Y19jVFdfNDA";
  var content,fileName,newFile;//Declare variable names
  
  fileName = "test_text_" + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMddHHmmss') + ".txt";//Create a new file name with date on end
  content = "This is the file Content";
  
  var folder = DriveApp.getFolderById(FOLDER_ID);

  newFile = folder.createFile(fileName,content);//Create a new text file in the root folder
};

function viewFiles(){
  // Log the name of every file in the user's Drive.
  var files = DriveApp.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
  }
}

function test_XMLHttpRequest(){
  const url = "http://example.com/";
  Logger.log(url);
  const callback = (text, obj) => {Logger.log({text:text, obj:obj})};
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    Logger.log("receive");  
    if (xhr.status > 0 && xhr.status !== 200) {
      callback(xhr.statusText, null);
      return;
    }
    var arraybuffer = this.response;
    Logger.log(arraybuffer);
  };
  xhr.onerror = function (err) {
      callback(err, null);
  };
  xhr.send();
}

function testKuromoji(){
  var DIC_URL = "https://takuyaa.github.io/kuromoji.js/demo/kuromoji/dict/";
  kuromoji.builder({ dicPath: DIC_URL }).build(function (error, _tokenizer) {
    if (error != null) {
        Logger.log(error);
    }
    const tokenizer = _tokenizer;
    var path = tokenizer.tokenize("すもももももももものうち");
    Logger.log(path);
  });
}

