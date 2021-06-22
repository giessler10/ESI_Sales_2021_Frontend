# ESI 2021 - Sales - Frontend

This is the frontend git repository of team sales. 

- URL to Sales Page: https://main.d39311pnrl2sqh.amplifyapp.com/
- URL to whole project: http://yourshirt.epizy.com/

## Demo

![](https://github.com/giessler10/ESI_Sales_2021_Frontend/blob/22dd2d8ebb7b400420acf0e43fa34605d5abe7b1/ESI_Sales.gif)

# Get started
## - Create React App, Github and Amplify connection
1. Install <a href="https://nodejs.org/en/download/">Node.js</a>
2. Create a blanc React App in an individual folder with cmd-code: npx create-react-app amplifyapp
3. Push files in your github repository.
4. Go in your AWS account to 'AWS Amplify' and press 'Host web app'.
5. Connect Amplify with your github repository
6. Amplify automatically create an url. 

Read whole <a href="https://aws.amazon.com/de/getting-started/hands-on/deploy-react-app-cicd-amplify/">documentation</a>.

## - Connect React App with API Gateway
1. Go to your API Gateway method in your AWS account and copy your REST URL,</br> e.g. https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?customerId=
2. Open CMD and navigate to your frontend directory. Install Axios: npm install axios
3. Go to your frontend code and import Axios in your js file:</br> 
```bash
import axios from 'axios'
```
5. Simply call your REST-Url, e.g. </br>

```bash
  function CustomerOrders()
{
  axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/orders?customerId=' + C_NR)
      .then(res => {
       console.log(res.data.body);
     } 
  )
}
```

<br></br>
If you got an error 'Has been blocked by CORS policy', then go to your REST Method in your API Gateway (AWS) and activate CORS.</br>
Don't forget to deploy API Gateway.

## Authors

- Christoph Werner
- Tobias Gießler
- Eva Katarina Helbig
- Aline Schaub





