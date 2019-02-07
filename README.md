# Tabless-Thursday-Orlando


## Endpoints

### Users overview
|Method|Endpoint|Action   |Front-end Request|Backend Response    |
|------|--------|---------|-----------------|--------------------|
|POST| '/register'  |Signup |{username:String, password:String, phone:String, email:String} |{expiresIn:num(min), token:String, username: String, userId: String}|
POST| '/login'  |Signin|{username:String, password: String}|{expiresIn:num(min), token:String, username: String, userId: String}|
GET| '/tabs/:userId' |Load usertabs|userId: String |tabs: [Tab:Object]|
POST| '/tabs'  |Add new tab|Tab: {url: String, importance: !String, category: !String, creator: userId}| {updatedTabs: [Tab:Object]}
PUT| '/tabs/:tabId'  |Update tab|Tab: {tabId: String, tabUrl: String, importance: !String, category: !String, creator: userId}|{updatedTabs: [Tab: Object]}
DELETE| '/tabs/:tabId'  |Delete Tab| tabId: String |updatedTabs: [Tab:Obeject] 
