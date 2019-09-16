const data = {
  "query:user": {
    "code": "OK",
    "data": [
      {
        "id": 1,
        "name": "linlichun",
        "job": "前端开发工程师",
        "workTime": "1year"
      }
    ]
  }
};

const rules = [];

Object.keys(data).forEach(item => {
  rules.push({
    url: item,
    responseText: data[item]
  })
});
new MockRequest(rules).create();