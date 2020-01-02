# MSAL Outlook Demo

Example of using MSAL in Outlook Native.  

Run like this:
  * Open manifest.xml and replace "someuser.ngrok.io" with your desirable host. - I use ngrok for Add-in development because of https.
  * Create a file called `.env` with `CLIENTID=...` with Client ID of your AAD app.
  * `npm i`
  * `npm start`
  * `ngrok http 1234 --username someuser.ngrok.io`
  * Add custom Add-in by file or url (https://someuser.ngrok.io/manifest.xml).
  
  
What makes this demo special:
Overrides `openPopup` of MSAL with custom hack using [Outlook Office API Dialog](https://docs.microsoft.com/en-us/javascript/api/office/office.dialogoptions).  
See https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1072 .
