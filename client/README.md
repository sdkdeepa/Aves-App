# Client Side

> Using **React Framework:**

### Install React boilerplate with: 
``` npx create-react-app cloud-developer-capstone ```

### Install Dependencies and Dev-Dependencies: 
``` npm install @types/node @types/react @types/react @types/react-dom @types/react-router-dom react-router-dom semantic-ui-css semantic-ui-react styled-components typescript -S ```

``` npm install @types/styled-components auth0-js --save-dev```

### How to run client:
```npm i```
```npm run start```

## Image Model
Each Image item has the following fields: 

* `imageId` (string) - unique id for an image
* `description` (string) - description of the image
* `createdAt` (boolean) - date and time when an image was created
* `imageUrl` (string) - a URL pointing to an image using S3

### Directory Layout: 
``` 
.
├── node_modules
├── .gitignore
├── public
├── package.json
├── README.md
├── tsconfig.json
├── src
    ├── api
        ├── images-api.ts
    ├── auth
        ├── Auth.js
    ├── components
        ├── Callback.tsx
        ├── CreateImage.tsx
        ├── EditImage.tsx
        ├── ImageItem.tsx
        ├── ImageList.tsx
        ├── NotFound.tsx
    ├── type-interfaces
        ├── CreateImageRequest.ts 
        ├── ImageModel.ts
        ├── UpdateImageRequest.ts 
    ├── App.tsx
    ├── index.tsx
    ├── routing.tsx
    ├── config.ts
    ├── react-app-env.d.ts
``` 
