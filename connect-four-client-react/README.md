Start Development Server

```
export API_BASE_URL="http://localhost:5000/" // use the port that api server is on
npm run dev // dev font-end server will be running at port 5005
sudo mongod --config /usr/local/etc/mongod.conf // run mongodb for testing

npm run lw // lint watch - in another tab
npm run tw // test watch - in another tab

or

npm run ltw // run lint/test watch in one tab
```

Build and run for Production (production server)

```
export API_BASE_URL="https://real-backend-url/"  
export PORT=5005 // default is 5005 if not specifing it
npm run build // production front-end server is running on port specified above
```
