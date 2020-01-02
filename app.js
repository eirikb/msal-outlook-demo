import "core-js/stable";
import "regenerator-runtime/runtime";
import 'whatwg-fetch';
import { UserAgentApplication } from 'msal';

const clientId = process.env.CLIENTID;
const scopes = ['User.Read'];
const msal = new UserAgentApplication({ auth: { clientId } });

const p = document.querySelector('p');
const loginButton = document.querySelector('#login');
const clearCacheButton = document.querySelector('#clear-cache');

clearCacheButton.addEventListener('click', () => {
  msal.clearCache();
});

function log(text) {
  p.innerText = JSON.stringify(text);
}

async function callApi() {
  log('Call API');
  try {
    const { accessToken } = await msal.acquireTokenSilent({ scopes });
    log(accessToken);
    const me = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }).then(res => res.json());
    log(me);
  } catch (e) {
    log(e);
    throw e;
  }
}

Office.onReady(() => {
  if (msal.isCallback(window.location.hash)) {
    log('Window is callback (wait)');
    Office.context.ui.messageParent(window.location.hash);
  } else {
    log('ready');
    if (msal.getAccount()) {
      callApi();
    } else if (msal.getLoginInProgress()) {
      log('Logging in...',);
    } else {
      loginButton.disabled = false;
      log('Ready. Click button');
    }
  }
});

loginButton.addEventListener('click', async () => {
  log('login 1');
  msal.openPopup = () => {
    const dummy = {
      close() {
      },
      location: {
        assign(url) {
          Office.context.ui.displayDialogAsync(url, { displayInIframe: true }, res => {
            dummy.close = res.value.close;
            res.value.addEventHandler(Office.EventType.DialogMessageReceived, ({ message }) =>
              dummy.location.href = dummy.location.hash = message
            );
          });
        }
      }
    };
    return dummy;
  };
  await msal.loginPopup({ scopes });
  log('login 2');
  callApi();
});
