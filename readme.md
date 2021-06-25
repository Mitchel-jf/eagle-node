# Send or Receive BTC (from me)
This app contains two endpoints. /receive_btc_from_user and /send_btc_to_user

## Base url
https://eagle-node.herokuapp.com


## Receive BTC from user
Method: GET
Route: baseURL/receive_btc_from_user
No request body required.
Responds with a wallet address in json where the btc can be sent to.


## Send BTC to user
Method: POST
Route: baseURL/send_btc_to_user
Request body: 
    - address (eamil, or btc wallet address)
    - amount (btc to receive from me)
