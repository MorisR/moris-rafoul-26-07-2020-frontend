# moris-rafoul-26-07-2020 - frontend
https://moris-rafoul-26-07-2020.netlify.app/

## Important Notes 
- this project was made in a week alongside the backend project [(link to the backend project)](https://github.com/MorisR/moris-rafoul-26-07-2020-backend)
- this is my first time ever using "material ui", I had to learn it on the spot and master it in 1~2 days
- I've tried my best to make the code as user friendly as I could (within the given time frame), although I’m still trying to figure out the best strategy for it. 
- when I tried to host the front end app, I came across some difficulties because of the way I proxied the api calls to the backend, 
    - the routes mall functioned
    - the cross-origin functionality didn't function correctly 
    - hosting the website on differant hosting services ( firebase / heroku / netlify ) returned doffrant results on each one
    - when I made a call to the backed to clear the cookies, it didn't happen ( yet creating the cookies seemed to work just fine...)
 the issue turned out to be that the app was cashing the api calls to the backend :/ (the more you know), I’ve got it working now
- **I would really like the opportunity to grow and gain more experience, I’m willing to put in the effort, whatever it takes!**

### Installation
1) clone the repo 
2) install dependencies by running 
    ```
    npm install
    ```
3) add .env file to the root of the project
    - you can do that by renaming the ".env_template" file in the root directory to ".env" and filling in the correct values
    - read [".env file"](https://github.com/MorisR/moris-rafoul-26-07-2020-backend/issues/25) for more info about the values and purpose of each field
4) start the server running the following command
    ```
    npm start
    ```


### Used Technologies
- react
- react-dom-router
- moment
- material-ui
- recoil (a state manager similar to redux)

### Multi Screen Sizes Support 

<table>
  <tr>
    <td>
      <image src="https://user-images.githubusercontent.com/10247681/89106699-b3506600-d434-11ea-9521-3b63ccbd6e02.png">
    </td>
    <td>
      <img  src="https://user-images.githubusercontent.com/10247681/89106703-c19e8200-d434-11ea-8efc-6c64819c91b6.png">
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/10247681/89106707-c8c59000-d434-11ea-8ed7-f571f63f73e0.png">
    </td>
</table>



### Concept Design Resources
- https://dribbble.com/shots/7897478-Mail-Client/attachments/496439?mode=media
- https://dribbble.com/shots/10057832-Email-App-Mobile-UI
- https://dribbble.com/shots/4797890--Chat-Property-dashboard/attachments/1078924

