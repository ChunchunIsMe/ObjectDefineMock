class MockRequest {
  constructor(rules) {
    this.rules = rules;
  }
  create() {
    const self = this;

    function matchRules(url) {
      const r = self.rules;
      const result = [];
      r.forEach(item => {
        if (item && url.indexOf(item.url) >= 0) {
          result.push(item);
        }
      });
      if (result.length > 0) {
        return result[0];
      }
    }

    const returnObj = {
      open(method, url, async) {
        this.url = url;
        this.xhr.open(method, url, async);
      },
      send(data) {
        const rule = matchRules(this.url);
        if (rule) {
          setTimeout(() => {
            this.readyState = 4;
            this.status = 200;
            this.responseText = rule.responseText;
            this.onreadystatechange();
          }, 100);
        } else {
          this.xhr.send(data);
        }
      },
    }

    Object.defineProperty(returnObj, "onreadystatechange", {
      get() {
        return this.xhr.onreadystatechange;
      },
      set(func) {
        const obj = this;
        obj.xhr.onreadystatechange = function (arg) {
          returnObj.readyState = this.readyState;
          returnObj.status = this.status;
          returnObj.responseText = this.responseText;
          returnObj.responseXML = this.responseXML;
          func(arg);
        }
      }
    })
    
    const _XMLHttpRequest = window.XMLHttpRequest;
    function MockRequestContructor() {
      this.xhr = new _XMLHttpRequest();
    }

    MockRequestContructor.prototype = returnObj;

    window.XMLHttpRequest = MockRequestContructor;
  }
}