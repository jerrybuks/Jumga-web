# Jumga-web
Here is a Brief explanation of my Implementation

1. For creation of account by store owner:
I setup a hash, webhook and option to retry failed transactions.when a store owner completes registration by paying the 20 dollar, flutterwave calls my endpoint, upon which I check the hash, verify the transaction before recording the transaction in my database, once this has been done the app automatically updates as it listens for change in the db to the users store verification status.

for handling Payments made by the store owner's cutomers, I used the flutterwave sub account feature. dispatch riders can be registered on this route https://jumga-web.firebaseapp.com/dispatchRider. once a store owner creates an account, one of the registered dispatch riders is attached to the account and upon successful purchase of items from the store by a customer, I split the payment between Jumga(myself in this case), the store owner and dispatch rider using the subaccount id's based on the metrics given in the task.

mobile money and several payment options are allowed...
