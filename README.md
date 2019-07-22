
#  Services for [dev-diaries](https://dev-diaries.netlify.com/)

  

## Run project locally
Run `npm run dev` to run the project on the dev environment. 

Kindly reach out for the env variables to run the project, we have the github app credentials which should not be uploaded on the repository.

##  Deployment
Auto-deployment is enabled on push to the `master` branch. The backend services are hosted on heroku. 

[Status service](https://dev-diaries.herokuapp.com/api/status) for your reference. 
## Tech-used

 1. `ExpressJs` for micro-services
 2. `Github Rest API's` for authenticating users
 3. `Husky` for `git-hooks` integration
 4. `Jest` for unit test cases
 5. [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) integrated search services are developed. FE integration of the service is WIP.
