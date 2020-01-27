# MSAL Outlook Demo

Example of using MSAL in Outlook Native.  
See https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1072 .

## Test 

I've deployed this add-in to GitHub for testing purposes.  
Add this manifest:

https://eirikb.github.io/msal-outlook-demo/manifest.xml


## Run locally

Run like this:
  * Open manifest.xml and replace "someuser.ngrok.io" with your desirable host. - I use ngrok for Add-in development because of https
  * Create a file called `.env` with `CLIENTID=...` with Client ID of your AAD app
  * `npm i`
  * `npm start`
  * `ngrok http 1234 --username someuser.ngrok.io`
  * Add custom Add-in by file
  
  
What makes this demo special:
Overrides [`openPopup` of MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/e3f4081/lib/msal-core/src/UserAgentApplication.ts#L738-L770) with [custom hack](https://github.com/eirikb/msal-outlook-demo/blob/2a034bc/app.js#L62-L77) using [Outlook Office API Dialog](https://docs.microsoft.com/en-us/javascript/api/office/office.dialogoptions).  
