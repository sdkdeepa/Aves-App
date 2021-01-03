# Udacity Cloud Developer Capstone Project

I developed a image uploading app for birds called "AVES APP". This app caters for bird lovers who can upload beautiful images of birds. The techology used behind in devloping this app is as follows:

- AWS Services used
   
   - Lambdas for storing functions
   - DynamoDB
   - Api Gateway (front-door securing, monitoring...the REST API)
   - S3 Bucket (storage of images)
   - CloudFormation (infrastructure as code, provisioning a collection of needed resources)
   - IAM user
   - XRay 
   
- Serverless Framework 

- Frontend client
   - ReactJS
   
- Auth0
   - OAuth integration for 3rd party apps
   - RS256 Algorithm

- Few Optimisations added
   - Global Secondary Indexes on DynamoDB
   - Xray for debugging logs 

The video of this application can be found here: https://youtu.be/CfkXlrWH_qQ

# Endpoints:
  GET - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images
  POST - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images
  PATCH - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images/{imageId}
  DELETE - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images/{imageId}
  POST - https://ptzezohp22.execute-api.us-east-2.amazonaws.com/dev/images/s3/{imageId}
  
# Functions:
  Auth: Aves-dev-Auth
  getImages: Aves-dev-getImages
  createImage: Aves-dev-createImage
  updateImage: Aves-dev-updateImage
  deleteImage: Aves-dev-deleteImage
  generateUploadUrl: Aves-dev-generateUploadUrl

# Screenshots

### Serveless deployment
![Alt text](screenshots/sls%20deployed.png?raw=true "sls deployed")

### CloudFormation
![Alt text](screenshots/CloudFormation.pngraw=true "CloudFormation")

### s3 buckets

![Alt text](screenshots/s3buckets.png?raw=true "s3buckets")

![Alt text](screenshots/s3Images.png.png?raw=true "s3Images")

### AWS lambdas
![Alt text](screenshots/aws-lamdas.png?raw=true "aws-lamdas")


### XRay service map
![Alt text](screenshots/XRay.png?raw=true "XRay")


# Error Handling

### User not logged in

![Alt text](screenshots/Error-1.png?raw=true "Error-1")


### User tries to upload with choosing an image

![Alt text](screenshots/Error-2.png?raw=true "Error-2")














