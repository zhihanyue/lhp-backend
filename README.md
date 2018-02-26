# RESTful APIs

> Project Name: 掌上人文
> Base URL: 未部署
> ALL RESTful Resources: /users /tokens /swipers /pages{/activities /lectures /courses /subjects /questions} /forums /answers /favorites
> Author: 岳知涵
> Version: 1.10
> HTTP Response Code: use **200 for success** and **400 for failure**

```
User: id username password_digest email phonenum university stu_num role
-  Token: id token user_id
Swiper: id title image_url page_id
Page: id type pv forum_id content
-  Activity: page_id title speaker datetime location img_s img_m
-  Course: page_id title major speaker
-  Subject: page_id title img_s img_m date
-  Question: page_id title weight
Forum: id last_answer_time
-  Answer: id content last_answer_time forum_id
Favorite: id user_id page_id
```

## Register
 
`POST /users`

```js
// Request sample
{
    "username": "test",
    "password": "pass",
    "email": "test@test.com",
    "phonenum": "15311111111",
    "university": "武汉大学", // optional
    "stu_num": "2015301500999" // optional
}

// Response sample
{
    "uid": 111 // 用户ID
}
```

## Login

`POST /tokens`

```js
// Request sample
{
    "username": "test",
    "password": "pass"
}

// Response sample
{
    "uid": 111, // 用户id，存下来，之后大多数请求会用到
    "token": "aszvwewr2weasa231sf2131dzv", // 令牌，存下来，之后大多数请求会用到
    "role": 3 // 用户角色，3代表普通用户
}
```

## Check token

`GET /tokens/:token`

```js
// 系统安全机制，令牌一段时间后会失效，此时需要重新Login

// Request sample
{
    "uid": 111,
}

// Response sample
{
    "status": true, // true表示令牌有效，false表示令牌无效
    "role": 3
}
```

## Query a user

`GET /users/:id`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
}

// Response sample
{
    "info": {
        // 隐私权控待考虑
        "email": "test@test.com",
        "phonenum": "15311111111",
        "university": "武汉大学",
        "stu_num": "2015301500999"
    }
}
```

## Update a user

`PUT /users/:id`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
    "info": {
        "university": "武汉大学",
        "stu_num": "2015301500999"
    }
}

// Response sample
{}
```

## Query swipers

`GET /swipers`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv"
}

// Response sample
{
    "results": [
        {
            "title": "国家宝藏来武大",
            "image_url": "/assets/img/1.jpg",
            "page_id": 3
        }, {
            "title": "第二个",
            "image_url": "/assets/img/2.jpg",
            "page_id": 4,
        }, {
            "title": "第三个",
            "image_url": "/assets/img/3.jpg",
            "page_id": 1
        }
    ]
}
```


## Query pages

`GET /pages/activities`
`GET /pages/lectures`
`GET /pages/courses`
`GET /pages/subjects`
`GET /pages/questions`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
    "num_page": "0", // 从第0页开始。-1表示显示全部结果
    "num_per_page": "10"
}

// Response sample
{
    "results": [1,2,3,4,5,6,7,8,9,10] // page_id构成的列表
}
```

## Search pages

`GET /pages/activities/search`
`GET /pages/lectures/search`
`GET /pages/courses/search`
`GET /pages/subjects/search`
`GET /pages/questions/search`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
    "keyword": "aaa bbb ccc",
    "num_page": "0", // 从第0页开始。-1表示显示全部结果
    "num_per_page": "10"
}

// Response sample
{
    "results": [1,2,3,4,5,6,7,8,9,10] // page_id构成的列表
}
```

## Query a page

`GET /pages/:id`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv"
    // page_id在uri中，因此在这里省略不写，下文同，不再赘述
}

// Response sample 1（lecture/activity）
{
    "type": "lecture", // 对于activity，下面的格式没有区别
    "pv": 100, // page view
    "forum_id": -1, // 表示这个页面没有挂载讨论区
    "info": {
        "title": "神经语言学方法与中国传统文化研究",
        "speaker": "杨亦鸣（江苏师范大学长江学者特聘教授）", // or 活动主办方
        "datetime": "2018-02-01 14:10:00",
        "location": "珞珈山庄二会议室",
        "img_s": "/assets/img/1.jpg", // 小图
        "img_m": "/assets/img/2.jpg", // 大图
    },
    "content": "这里是内容（如果需要富样式，可以考虑做个webview html读取）"
}

// Response sample 2（course）
{
    "type": "course",
    "pv": 100,
    "forum_id": -1,
    "info": {
        "title": "中国哲学原著选读",
        "major": "哲学学院", // 表示授课学院
        "speaker": "廖璨璨",
    },
    "content": "这里是内容（如果需要富样式，可以考虑做个webview html读取）"
}

// Response sample 3（questions）
{
    "type": "questions",
    "pv": 100,
    "forum_id": 5, // 使用id为5的讨论区
    "info": {
        "title": "备考哲学研究生的注意事项？",
        "weight": 1000, // 管理员设置权重，权重高的优先显示
    },
    "content": "本人是15级哲学基地班的在读本科生，于今年底想考武大的哲学研究生，准备开始备考，请问有什么经验方法想了解借鉴一下～"
}

// Response sample 4（subject）
{
    "type": "subject",
    "pv": 100,
    "forum_id": -1,
    "info": {
        "title": "哲学学院师生书画作品撷英",
        "img_s": "/assets/img/1.jpg",
        "img_m": "/assets/img/2.jpg",
        "date": "11月下旬",
    },
    "content": "这里是内容（如果需要富样式，可以考虑做个webview html读取）"
}

```

## Query a page (basic)

`GET /pages/:id/basic`

例子同上，但不返回content，目的：

1. 确保在列表页面查询时的效率；
2. 查询全部内容会使PV加一，查询基本内容则不会。

## Query a forum

`GET /forums/:id`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv"
}

// Response sample
{
    "results": [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5}], // answer_id构成的列表
    "last_answer_time": "2018-02-01 14:10:00"
}
```

## Create an answer

`POST /answers`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
    "content": "这里是回答",
    "forum_id": 1
}

// Response sample
{
    "answer_id": 7
}
```

## Query an answer

`GET /answers/:id`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv"
}

// Response sample
{
    "uid": 1, // 回复者uid
    "content": "这里是内容（如果需要富样式，可以考虑做个webview html读取）",
    "last_answer_time": "2018-02-01 14:10:00",
    "forum_id": 1
}
```

## Query favorites

`GET /favorites`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv"
}

// Response sample
{
    "results": [1,2,3,4] // a set of page_id
}
```

## Create a favorite

`POST /favorites`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
    "page_id": 5
}

// Response sample
{}
```

## Delete a favorite

`DELETE /favorites/a`

```js
// Request sample
{
    "uid": 111,
    "token": "aszvwewr2weasa231sf2131dzv",
    "page_id": 5
}

// Response sample
{}
```
