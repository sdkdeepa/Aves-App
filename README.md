# Udacity Cloud Developer Capstone Project

I developed an image uploading app for birds called "AVES APP". This app caters for bird lovers who can upload beautiful images of birds. This app was also tested using local environment (user based testing).The techology used behind in devloping this app is as follows:

### AWS Services 
   
   - Lambdas for storing functions
   - DynamoDB
   - Api Gateway (front-door securing, monitoring...the REST API)
   - S3 Bucket (storage of images)
   - CloudFormation (infrastructure as code, provisioning a collection of needed resources)
   - IAM user
   - XRay 
   
### Serverless Framework 

### Frontend client
   - ReactJS
   
### Auth0
   - OAuth integration for 3rd party apps
   - RS256 Algorithm

### Few Optimisations added
   - Global Secondary Indexes on DynamoDB
   - Xray for debugging logs 
   
# App functionality video:

The video of this application can be found here: https://youtu.be/CfkXlrWH_qQ

# Getting started:

### Installation
   Use the node package manager to install Aves app

`
      cd backend
      npm install

      cd ../frontend
      npm install
`
### To start the client in localhost

- Update client/src/config.ts credentials to match your Auth0 account and 
- Serverless deployment 

The client can be installed and run locally in http://localhost:3000/
`
      cd client
      npm runstart
`

# Endpoints:
  - GET - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images
  - POST - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images
  - PATCH - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images/{imageId}
  - DELETE - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images/{imageId}
  - POST - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images/s3/{imageId}
  
# Functions:
  - Auth: Aves-dev-Auth
  - getImages: Aves-dev-getImages
  - createImage: Aves-dev-createImage
  - updateImage: Aves-dev-updateImage
  - deleteImage: Aves-dev-deleteImage
  - generateUploadUrl: Aves-dev-generateUploadUrl

# Screenshots

### Serveless deployment:

![Alt text](screenshots/sls%20deployed.png?raw=true "sls deployed")

### CloudFormation:

![Alt text](screenshots/CloudFormation.png?raw=true "CloudFormation")

### s3 buckets:

![Alt text](screenshots/s3buckets.png?raw=true "s3buckets")


![Alt text](screenshots/s3Images.png?raw=true "s3Images")

### AWS lambdas:

![Alt text](screenshots/aws-lamdas.png?raw=true "aws-lamdas")


### XRay service map:

![Alt text](screenshots/XRay.png?raw=true "XRay")


### Auth0


# Successful upload message:

![Alt text](screenshots/upload-successful.png?raw=true "upload-successful")

# Error Handling:

### User not logged in:

![Alt text](screenshots/Error-1.png?raw=true "Error-1")


### User tries to upload with choosing an image:

![Alt text](screenshots/Error-2.png?raw=true "Error-2")
















