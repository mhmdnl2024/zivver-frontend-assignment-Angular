### 7) Questions

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
1- iat: We usually add it to determine when this token was generated from server
2- iss: This property mentiones to that service on the backend side that generated this token

I think it won't be a good idea to share email address in payload, I highly recommend to add "UserId" or any other identifier for the value.

Besides that, Is really needed to mention to the user role in payload? as I said before, if we send UserId instead of email, we can simply find user role on the backend side.

In terms of best practices and naming convention, valid_until won't be a good name and we need to rename it to "exp" and value should be timestamp.

Finally, I highly recommend not to store much data in token, since not sharing cfitical data about user is also a security goal.

### 7-2) Security concerns due to request including HTML codes:

The first and most important one is XSS attack... In the previous question, JWT token was mentioned, we usually store them in LocalStorage or Cookie! Attacker is able to inject JavaScript code and access to the victim's browser to hijack the tokan value.