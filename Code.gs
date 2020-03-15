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

function createGoogleDriveTextFile(folderId, filename) {
 
  // fileName = "test_text_" + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMddHHmmss') + ".txt";//Create a new file name with date on end
  //content = "This is the file Content";
  
  var folder = DriveApp.getFolderById(folderId);
  newFile = folder.createFile(filename);//Create a new text file in the root folder
  return newFile;
};

function listFiles(){
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
  //var DIC_URL = "https://takuyaa.github.io/kuromoji.js/demo/kuromoji/dict/";
  const DIC_URL = '1OSARoUrjt2H0FKvvB2t22wjmycrzZUNq/';
  kuromoji.builder({ dicPath: DIC_URL }).build(function (error, _tokenizer) {
    if (error != null) {
        Logger.log(error);
    }
    const tokenizer = _tokenizer;
    var path = tokenizer.tokenize("すもももももももものうち");
    Logger.log(path);
  });
}

function testGetFullFolderPath(){
  const path = '1OSARoUrjt2H0FKvvB2t22wjmycrzZUNq/readme.txt';
  const [folderId, fileName] = path.split('/');
  Logger.log(folderId +","+fileName);
  const file = DriveApp.getFolderById(folderId).getFilesByName(fileName).next();
  Logger.log(file.getId());
}

function testreadText(){
  const textFileName = "test.txt";
  const content = "qwertyuiop@[";
  
  const scriptId = ScriptApp.getScriptId();
  const script   = DriveApp.getFileById(scriptId);
  const folder   = script.getParents().next(); // has next?
  Logger.log("folder name : %s, folder id : %s", folder.getName(), folder.getId());
  
  // Create
  //const textFile = folder.createFile(textFileName, content);
  const textFile = folder.getFilesByName(textFileName).next(); // open
  
  // Read
  let readTextContent;
  readTextContent = textFile.getBlob().getDataAsString();
  Logger.log(readTextContent);
  
  // Write
  const newContent = "hogehogehogehogehogehoge";
  textFile.setContent(newContent);
  
  // Read
  readTextContent = textFile.getBlob().getDataAsString();
  Logger.log(readTextContent);
  
  // Delete
  //folder.removeFile(textFile);
}

function generateRandomString(n){
  const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(Array(n)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
}

function testreadGoogleDoc(){
  const content = "qwertyuiop@[";
  const docId = '1AeLqtnckEcyCZzCKrkjNYSyEsMYWgb9ixRaMSj2VbxU';
  
  // Create
  // const docFile = DocumentApp.create(docFileName);
  const docFile = DocumentApp.openById(docId);
  
  // Read
  let readTextContent;
  readTextContent = docFile.getBody().getText();
  Logger.log(readTextContent);
  
  // Write
  const newContent = "hogehogehogehogehogehoge";
  docFile.getBody().setText(newContent);
  
  // Read
  readTextContent = docFile.getBody().getText();
  Logger.log(readTextContent);
  
}


function testReadWriteText(){
  let t1, t2;
  const TEST_COUNT  = 5;
  let readTextContent;
  //const content = generateRandomString(9999999);
  const content = new Array(999999).fill("---test text---").join('');
  
  // Open Text file
  const scriptId = ScriptApp.getScriptId();
  const script   = DriveApp.getFileById(scriptId);
  const folder   = script.getParents().next(); // has next?
  const textFileName = "test.txt";
  const textFile = folder.getFilesByName(textFileName).next(); // open
  
  // Open Doc file
  const docId = '1AeLqtnckEcyCZzCKrkjNYSyEsMYWgb9ixRaMSj2VbxU';  
  const docFile = DocumentApp.openById(docId);
  
  Logger.log("----- Measure start ----- [ms]");
  
  for(let i = 0; i < TEST_COUNT; i++){
    t1 = new Date().getTime();
    
    //text write
    textFile.setContent(content);
    
    t2 = new Date().getTime();
    Logger.log("[Count %s] Text Write time : %s",i, t2 - t1);
  }
  
  for(let i = 0; i < TEST_COUNT; i++){
    t1 = new Date().getTime();
    
    //text read
    readTextContent = textFile.getBlob().getDataAsString();
    
    t2 = new Date().getTime();
    Logger.log("[Count %s] Text Read time : %s",i, t2 - t1);
  }
  
  for(let i = 0; i < TEST_COUNT; i++){
    t1 = new Date().getTime();
    
    //doc write
    docFile.getBody().setText(content);
    
    t2 = new Date().getTime();
    Logger.log("[Count %s] Doc Write time : %s",i, t2 - t1);
  }
  
  for(let i = 0; i < TEST_COUNT; i++){
    t1 = new Date().getTime();
    
    //doc read
    readTextContent = docFile.getBody().getText();
    
    t2 = new Date().getTime();
    Logger.log("[Count %s] Doc Read time : %s",i, t2 - t1);
  }
  
}
