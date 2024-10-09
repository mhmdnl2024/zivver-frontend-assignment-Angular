## 1) Install
Clone this project on your machine then run this command in terminal:

```
cd posts
npm install
```

**Note:** Please make sure [Angular CLI](https://angular.dev/tools/cli) and a stable version of [Node JS](https://nodejs.org/en/download/package-manager/current) are already installed on your machine.

## 2) Start
In order to start the project run this command in terminal:

```
npm start
```

The project is available at this address: `http://localhost:4200/`

## 3) Unit Tests
Tests have been added, run this command in terminal to run them:

```
npm run test
```

## 4) E2E Tests
I've written e2e tests with Playwright that you can find them here: `./posts/e2e` In order to run e2e tests, first of all you need to start the project then, run this command in terminal:

```
npm run e2e:test
```

## 5) Are you a fan of Docker? 🐳
No worries... This project is dockerized. First of all, make sure Docker is installed on your machine then, run this command in terminal:

```
docker-compose up
```

**Note:** If you are running the project with Docker, you will need to install `node_modules` before running E2E and Unit tests.

Are you done? then run this command to stop containers and removes containers, networks, volumes, and images created by `up` command:

```
docker-compose down
```

## 6) Technical description about the project
In the following, I will explain a little about the work done and the reason for choosing some libraries.

### 6-1) Styles & TailWind CSS
I decided to use Tailwind CSS with SASS that alrady installed along side with Angular. I tried to make it Responsive as much as I can and use a nice color palette for the design.

### 6-2) NgRx as State Management
As you mentioned in requirements, I've used NgRx to store/share application states. There is a folder: `src/app/state` that you can find actions, effects, reducers and selectors there. I dedcided to move fetching posts logic to NgRx therefore, there is an effect that will be triggered after dispatching `fetchPosts` action. There are also other states like loading and error message with their selectors.

### 6-3) Playwright for E2E Testing
I also use Playwright for e2e testing, you can find test here: `./posts/e2e` that there is only one file: `home.spec.ts` to test Posts/Home page functionality. This test supports Development enviroment and I decided to mock API calls to make it more reliable. But in a real development enviroment, there should be 2 different test .env files `development` and `production` to make sure about functionality itself and data provided from server (If is needed).

### 6-4) App structure and folders
I decided to make it clear as much as I can... For example, you can find all shared components and pages here: `app/components` there is a specific folder for everything: services, models, and states.

## 7) Questions

Last but not least, I write the answers to the questions here:

### 7-1) JWT - Why is it (or isn't it) safe to use this?

According to the Authentication/Authorization process based on the JSON Token and not the classic session-cookie method, user enters username + password then back-end code generates JSON token that we can find it in server-response header, but for this token that you shared in PDF file:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lb25lQGV4YW1wbGUubmV0IiwiYWRtaW4iOmZhbHNlLCJ2YWxpZF91bnRpbCI6IldlZCBEZWMgMzEgMjM6NTk6NTkgQ0VTVCAxOTY5In0.4bl2puoaRetNjO1GsweKOnnQsYgwNa9bQIC-WQZkuNo
```

I used JWT decoder and found it that, there are some weaknesses (security concerns) that should be fixed in token payload:

```
{
  "sub": "someone@example.net",
  "admin": false,
  "valid_until": "Wed Dec 31 23:59:59 CEST 1969"
}
```

First of all, some properties are missing there:

**1- iat:** We usually add it to determine when this token was generated from server

**2- iss:** This property mentiones to that service on the backend side that generated this token

I think it won't be a good idea to share email address in payload, I highly recommend to add `userId` or any other identifier for the value.

Besides that, Is really needed to mention to the user role in payload? as I said before, if we send UserId instead of email, we can simply find user role on the backend side.

In terms of best practices and naming convention `valid_until` won't be a good name and we need to rename it to `exp` and value should be timestamp.

Finally, I highly recommend not to store much data in token, since not sharing critical data about users is also a security goal.

### Security concerns due to request including HTML codes:

The first and most important one is XSS attack... In the previous question, JWT token was mentioned, we usually store them in LocalStorage or Cookie! Attacker is able to inject JavaScript code and access to the victim's browser to hijack the tokan value.
