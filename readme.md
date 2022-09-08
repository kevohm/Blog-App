## Blog App
* This is a blogging app where users can create an account and post their blogs for other users to see.
* See Live Site [here](https://tyrantx-blog-app.netlify.app/)

## want to check the source code ?
* <code>on root directory</code>
```
git clone https://github.com/kevohm/Blog-App.git
```
* create .env file to store the following variables for the code to work.
  * JWT_LIFETIME - stores lifetime of JWT token
  * MONGO_URI - stores link to the mongoDb clod database
  * JWT_SECRET - stores the secret used to create jwt
  * PORT - should be set to 5000 for code to work
* You will have to first create a mongoDB account and database from [here](https://www.google.com/aclk?sa=l&ai=DChcSEwiSmuCl_YX6AhVL43cKHRzBA0wYABABGgJlZg&sig=AOD64_1cYcCSc9ZyWz57xTNQQeZwV9a0VQ&adurl&ved=2ahUKEwivwNil_YX6AhXt_7sIHaBdCzwQqyQoAHoECAMQBQ)
```
 npm install
```
* Run to set up all the required dependencies
```
npm start
```
## Front End
* This is located on the <code>/client</code> directory.
```
npm run build
```
* You can Run to create ready for production.
## AOB
* The code is already prepared for deployment. It may need some changes to work on remotely.
