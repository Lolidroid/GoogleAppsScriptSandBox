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

