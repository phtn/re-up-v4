svix message create app_2cnfVOZpCGcstCu2dmWPANKI45d \
    --data-eventType "user.created" \
    --data-payload '{
        "system": "cli",
        "device": "xpriori"
    }'

# ep_2ddQAUT5b7837biHVNVbJhcAkl6
# https://re-up.ph/webhooks/app_2cnfVOZpCGcstCu2dmWPANKI45d/wVCXdHyGbOTPqdKi1De-FBWBcPFGpJ-ftSer36lzr_s_ep

curl --request POST \
--url 'https://api.copperx.dev/api/v1/checkout/sessions' \
--header 'Authorization: Bearer pav1_07xCFkzauWfX0kZTaJdrf1z3gGhXyP66azR2bIWrUSTYWsxs3QTa1oc7gUMbj7Gz' \
--header 'Content-Type: application/json' \
--data-raw '{
    "successUrl": "https://copperx.io/success?cid=s_id",
    "lineItems": {
        "data": [
            {
                "priceData": {
                    "currency": "USDT",
                    "unitAmount": "100000000",
                    "productData": {
                        "name": "Basic",
                        "description": "For early stage projects who are getting started"
                    }
                }
            }
        ]
    }
}'
