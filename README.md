# Make coupon : backend functions
<img src="https://user-images.githubusercontent.com/53554014/81337293-c083e000-90e5-11ea-890f-81846c376ac4.png" width="40%" height="40%" title="coupon" alt="1"></img><img src="https://user-images.githubusercontent.com/53554014/81337543-1eb0c300-90e6-11ea-8ec3-2b84db42ee13.jpg" width="55%" height="55%" title="db" alt="1"></img>


### Our purpose
 * make not duplicated number
 * not collide between new-made-number and already-saved-number(in DB) 

### Stack
 * JavaScript ES6
 * firebase
 
### DB schema
 * top node : coupon number
 * child node : coupon name(ex.birthday : for celebrating customer's birthday), expire date

## Getting Started

### Pre-requisties
|  <center>Requirement</center> |  <center>Description</center> |  
|:--------|:--------:|
|**Node.js** | <center>v10.15.2 or higher</center> |
|**npm** | <center>v6.4.1 or higher</center> |
|**git** | <center>We follow the Github flow</center> |
 
### Installation
```
npm install microtime
```
We will use this module to return microtime

```
npm install buffer-crc32
```
We will use this crc32 encoder

## Docs
* seed.js : those seed info(contents, expire, uid) is used to make coupon number

* getTime.js : get current time to use as an another seed

* make.js : make random coupon number and set the coupon info to DB

  |  <center>Parameters</center> |  <center>Description</center> |  
  |:--------|:--------:|
  |**seed** | <center>we make random number with this.</center> |
  |**count** | <center>how many coupons do you want to make?</center> |
  |**amount** | <center>and how much those coupons?</center> |
 
* index.js : designed for frontend

  |  <center>Parameters</center> |  <center>Description</center> |     
  |:--------|:--------:|
  |**admin** | check validated user(admin) is login or not |
  |**couponSeed** | set coupon info in coupon make page |
  |**couponMakeAndUpload** | make coupon and set them to DB in coupon make page |
  
  page architecture : admin-login page, coupon make page
