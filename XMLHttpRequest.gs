
class UrlFetchRequest {
  constructor() {
    /**
    * Constants
    */
    this.UNSENT = 0;
    /*
    this.OPENED = 1;
    this.HEADERS_RECEIVED = 2;
    this.LOADING = 3;
    */
    this.DONE = 4;
    
    // Class properties
    this.responseType = "";
    // Current state
    this.readyState = this.UNSENT;
    
    // default ready state change handler in case one is not set or is set late
    this.onreadystatechange = null;
    
    // Result & response
    this.responseText = "";
    this.response = null;
    this.status = null;
    this.onload = null;
    this.onerror = null;
    this.option = {};
    this.url = "";

  }
  
  // user, passwordは非対応
  // asyncは常にtrue?
  open(method, url, async, user, password) {
    //this.abort();
    this.url = url;
    this.option.method = method;
  }
  
  send(){
    // 暫定：path.join()は連続する「/(スラッシュ)」文字を置き換えてしまうための対策
    const url = this.url.replace(/(^https?:\/)([^\/])/, "$1/$2");
    const response = UrlFetchApp.fetch(url, this.option);
    
    if(this.responseType == "arraybuffer"){
      this.response = response.getContent();
    }else if(this.responseType == "blob"){
      this.response = response.getBlob();
    }
    this.responseText = response.getContentText();
    
    this.status = response.getResponseCode();
    this.readyState = this.DONE;
    
    // Call callback function
    if(this.onreadystatechange){
      this.onreadystatechange();
    }
    if(this.readyState === this.DONE){
      if(this.status === 0){
        if(this.onerror){
          this.onerror();
        }
      }else if(this.status !== 0){
        if(this.onload){
          this.onload();
        }
      }
    }
  }  
};

const XMLHttpRequest = UrlFetchRequest;