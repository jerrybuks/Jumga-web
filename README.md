# Jumga-web
Here is a Brief explanation of my Implementation

1. For creation of account by store owner:
I setup a hash, webhook and option to retry failed transactions from my flutterwave dashboard. when a store owner completes registration by paying the 20 dollar, flutterwave calls my webhook url, upon which I check the hash(so as to verify the webhook signature and ensure it's from flutterwave), verify the transaction before recording the transaction in my database (implemented it in such a way that its idempotent), once this has been done the app automatically updates as it listens for change in the db to the users isStoreVerification status. Since my project is powered by GCp and flutterwave retries failed transactions every 1hr 30 minutes for the next 36hrs, I believe this should be sufficent to make sure no transation is left unrecorded, ensures its verified and also idempotent. This logic can be found in the functions/index.js file for the server side and client side call can be found in Jumga-web-client/src/pages/verifyStore.

2. For handling Payments made by the store owner's customers, I used the flutterwave sub account feature. dispatch riders can be registered on this route https://jumga-web.firebaseapp.com/dispatchRider. once a store owner creates an account, one of the registered dispatch riders is attached to the account. The store owner also has to provide their bank account details during registration and upon successful purchase of items from the store by a customer, I split the payment between Jumga, the store owner and dispatch rider using the subaccount id's based on the metrics given in the task. Flutterwave also calls my webhook url which I then use to verify and record the transaction detail in my DB.

Metrics breakdown
from the example given in the challenge, here are the deductions I made, which I used in calculating the split.

- The store owner get's 95% of the actual cost of the item(s) being purchased
- The delivery fee was calulated as 7.5% of the cost of the item(s) being purchased
- from the calculated delivery fee,the dispatch rider gets 80% of it
-the remaing 20% of the delivery fee goes to Jumga in addition to the 5% commission gotten from the cost of the items
-Jumga then settles flutterwave out of this money and keeps whatever is left

Here is screenshot of the outcome of a transaction
 [sub account transaction](https://drive.google.com/file/d/1gOkwkJD7weCLTgn3rkziGmQrYjnGqiCl/view?usp=sharing)


Also, store owners can share link to their store to their friends, families e.t.c. NB: Beacuse the store link are ment for customers or potential buyers, you cannot view this route when logged in, so you would have to logout of the app or open the store link you copied in private window/incognito in order to see the customer facing store route.
Here is a screenshot
[customer facing store](https://drive.google.com/file/d/1oa_Y5yArO1vN1wif-nBkKZRTh0qWLu4v/view?usp=sharing)
 
mobile money and several payment options are allowed...
