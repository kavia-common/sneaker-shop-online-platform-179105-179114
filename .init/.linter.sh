#!/bin/bash
cd /home/kavia/workspace/code-generation/sneaker-shop-online-platform-179105-179114/shoes_business_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

