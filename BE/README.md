# BE-README

## DB 설계
![Untitled](https://user-images.githubusercontent.com/69128652/122521572-f36e0680-d04f-11eb-9b84-df8b3ed0e36b.png)


## 구현 완료된 API

#### Oauth
1. 로그인 페이지

   * Web
     https://github.com/login/oauth/authorize?client_id=b09a851597aba83d2b5e&redirect_uri=http://3.34.122.67/api/login/web
   * iOS
     https://github.com/login/oauth/authorize?client_id=1f8b844e0951dd8b43cb&redirect_uri=issuetracker://login

1. User 정보

   * `GET: http://3.34.122.67/api/login/web?code=[$code]`

   * `GET: http://3.34.122.67/api/login/ios?code=[$code]`

   * Response Body

     ```json
      {
       "jwt": {
       "jwt": "6_m0PMpk0Ia4",
       "tokenType": "Bearer"
       },
       "avatarUrl": "https://avatars.githubusercontent.com/u/69128652?v=4",
       "loginId": "Jiwon-JJW"
      }
     ```

#### 기본

1. 라벨 `http://3.34.122.67/api/labels`

   * 전체보기 `GET: http://3.34.122.67/api/labels`
     Response Body

       ```json
      {
     "data": [
         {
             "id": "Long",
             "name": "String",
             "content": "String",
             "color_code": "String",
         }
     ],
     "msg": "String"
     }
       ```

   * 라벨 추가 `POST: http://3.34.122.67/api/labels`
     Request Body

     ```json
     {
       "name":"String",
       "content":"String",
       "color_code":"String"
     }
     ```

   * 삭제 `DELETE: http://3.34.122.67/api/labels/{@labelId}`

   * 편집 `PUT: http://3.34.122.67/api/labels/{@labelId}`
     Request Body

     ```
     {
       "name":"String",
       "content":"String",
       "color_code":"String"
     }
     ```

1. 마일스톤 `http://3.34.122.67/api/milestones`

   - 전체보기 `GET: http://3.34.122.67/api/milestones`
   ResponseBody

     ```
     {
     "data" :[
     	{
       "id": "Long",
       "title":"String",
       "due_date":"String (yyyy-MM-dd hh:MM)",
       "description":"String"
     	},
       {
       "id": "Long",
       "title":"String",
       "due_date":"String",
       "description":"String"
     	}
     ]
     }
     ```

   - 추가`POST: http://3.34.122.67/api/milestones`
     RequestBody

     ```json
     {
       "title":"String",
       "due_date":"String (yyyy-MM-dd hh:MM)",
       "description":"String"
     }
     ```

     

   - 삭제`DELETE: http://3.34.122.67/api/milestones/{$milstoneId}`

   - 편집`PUT: http://3.34.122.67/api/milestones/{$milstoneId}`

     RequestBody

     ```json
     {
       "title":"String",
       "due_date":"String (yyyy-MM-dd hh:MM)",
       "description":"String"
     }
     ```

   
