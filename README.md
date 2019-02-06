# Tabless-Thursday-Orlando


## Endpoints

### Users overview
|Method|Action   |Front-end Request|Backend Response    |
|------|---------|-----------------|--------------------|
|POST  |Signup   |{username:String, password:String, phone:String,email:String} |{expiresIn:num(min), token:String,username: String, userId: String}|
POST|Signin|{username:String, password: String}|{expiresIn:num(min), token:String,username: String, userId: String}|
GET|Load usertabs|userId: String <in request url>|tabs: [Tab:Object]|
POST|Add new tab|Tab: {url: String, importance: !String, Category: !String, creator: userId}| {updatedTabs: [Tab:Object]}
PUT|Update tab|Tab: {tabId: String, tabIdurl: String, importance: !String, Category: !String, creator: userId}|{updatedTabs: [Tab: Object]}
DELETE|Delete Tab| __*backend tell front end how you want to receive request*__|updatedTabs: [Tab:Obeject] 
