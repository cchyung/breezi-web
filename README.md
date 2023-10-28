# Getting set up 
1. Set up your `.env` in the root of this project:
```env
TWILIO_VERIFY_SERVICE_SID=
TWILIO_AUTH_TOKEN=
TWILIO_ACCOUNT_SID=

JWT_SECRET=test123

MONGO_DB_URL="mongodb://localhost:27017"
MONGO_DB_NAME="lookbook"

LOOKBOOK_GENERATOR_URL="http://localhost:5000/api"
```

2. Run `npm install`
3. Run `docker-compose up -D` to start the mongo db
4. To start the server and client, run `npm run dev`


   