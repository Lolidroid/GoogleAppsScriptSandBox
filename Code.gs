//
// Chrome V8 エンジン有効時に列挙可能なプロパティを表示
// 
function testEnumerableProperties() {
  Logger.log("Object.keys(%s) = %s", Logger, Object.keys(Logger));
  Logger.log("Object.keys(%s) = %s", {a: function(){}, b: 0}, Object.keys({a: function(){}, b: 0}))
}
