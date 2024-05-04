# live

curl --request GET \
     --url https://api.copperx.io/api/v1/auth/me \
     --header 'accept: application/json' \
     --header 'authorization: Bearer pav1_Y84He7uef4lONhuoo83bsqXyyXHhDjEeeZdHfSrC4gYrv7e0iiwjmXHq0jfbRrGV'

# dev

curl --request GET \
     --url https://api.copperx.dev/api/v1/auth/me \
     --header 'accept: application/json' \
     --header 'authorization: Bearer pav1_xAl5bSIksrzTQoF3Z8Sdc3Icp0mFdkKZvoeoRHJMS801XtJWvYD6UdEtvHrebjHP'


# ICASH
curl --request POST \
     --url https://dev.i-cash.app:448/api/merchant/generate-trans-qr \
     --header 'accept: application/json' \
     --header 'authorization: Basic ZmFzdGluc3VyZTpYb2RaeTlENUtUY1lzUUxAJGFSSW5haE1kJHVmUjM5RHNZ' \
     --data '{"merchantCode": "FASTINSURE", "merchantUsername": "fastinsure", "merchantPassword": "XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY", "merchantCustomerId": "ID00003", "merchantTransactionId": "TXN02000000321", "firstName": "Jun", "lastName": "Jun", "amount": 100.00}'

curl --request POST \
     --url 'https://dev.i-cash.app:448/api/auth/login' \
     --header 'accept: application/json' \
     --header 'authorization: Basic ZmFzdGluc3VyZTpYb2RaeTlENUtUY1lzUUxAJGFSSW5haE1kJHVmUjM5RHNZ' \
     --data '{"merchantCode": "FASTINSURE", "merchantUsername": "fastinsure", "merchantPassword": "XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY"}'

curl --request POST \
     --url https://api.copperx.dev/api/v1/invoices \
     --header 'accept: application/json' \
     --header 'authorization: Bearer pav1_xAl5bSIksrzTQoF3Z8Sdc3Icp0mFdkKZvoeoRHJMS801XtJWvYD6UdEtvHrebjHP' \
     --header 'content-type: application/json' \
     --data '
     {
       "customFields": {
         "fields": [
           {
             "name": "string",
             "value": "string"
           }
         ]
       },
       "lineItems": {
         "data": [
           {
             "priceData": {
               "currency": "usdc",
               "productData": {
                 "name": "string",
                 "description": "string",
                 "images": [
                   "string"
                 ],
                 "unitLabel": "string",
                 "url": "string",
                 "visibility": 10
               },
               "interval": "day",
               "intervalCount": 1,
               "unitAmount": "9223372036854775807",
               "productId": "c3611c05-df51-4b47-ffff-f2eac02f4ef6",
               "type": "one_time"
             },
             "quantity": 1,
             "priceId": "c3611c05-df51-4b47-bbbb-f2eac02f4ef7",
             "periodStart": "2024-04-30T19:42:29.063Z",
             "periodEnd": "2024-05-30T19:42:29.063Z"
           }
         ]
       },
       "paymentSetting": {
         "allowSwap": false,
         "allowedChains": [
           {
             "chainId": 137
           }
         ],
         "preferredChainId": 1,
         "preferredCurrency": "usdc"
       },
       "description": "string",
       "dueDate": "2024-05-30T19:42:29.063Z",
       "footer": "string",
       "fromInvoiceId": "c3611c05-df51-4b47-cccc-f2eac02f4ef4",
       "clientReferenceId": "string",
       "visibility": 10,
       "allowPromotionCodes": true,
       "customerId": "c3611c05-df51-4b47-aaaa-f2eac02f4ef8"
     }
     '
