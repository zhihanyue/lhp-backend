curl -l -H 'Content-Type: application/json' -X POST -d '{"username": "test","password": "pass","email": "test@test.com","phonenum": "15311111111","university": "武汉大学", "stu_num": "2014141312312"}' http://localhost:3000/api/users

curl -l -H 'Content-Type: application/json' -X POST -d '{"username": "test","password": "pass"}' http://localhost:3000/api/tokens

curl -l -H 'Content-Type: application/json' -X POST -d '{"username": "test","password": "pass"}' http://localhost:3000/api/tokens

curl -l -H 'Content-Type: application/json' -X GET http://localhost:3000/api/tokens/http3ywzg2ltyl693alv9ii4nf0us4os?uid=7

curl -l -H 'Content-Type: application/json' -X GET http://localhost:3000/api/users/7?uid=7&token=http3ywzg2ltyl693alv9ii4nf0us4os

curl -l -H 'Content-Type: application/json' -X PUT -d '{"uid": 7, "token": "http3ywzg2ltyl693alv9ii4nf0us4os", "info": {"university": "武汉大学","stu_num": "2015301500366"}}' http://localhost:3000/api/users/7

curl -l -H 'Content-Type: application/json' -X POST -d '{"uid": 1,"token": "aszvwewr2weasa231sf2131dzv","content": "这里是回答","forum_id": 1}' http://localhost:3000/api/answers
