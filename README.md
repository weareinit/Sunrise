# Sunrise
🌅 A QR code focused check-in and redemption webapp

---
# Getting Started
1. Scan the **Authorization QR Code** to authenticate
    > The **Authorization QR Code** is a QR Code that contains Base-64 encoded JSON in the following format
    >```json
    >{
    >   "password": "SomePassWord"
    >}
    >```

# For Development
0. Run `yarn start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# To Do's
- [ ] Retrieve and store the event list on load
- [ ] Avatar group at Check In
- [ ] Generic Event Check in
    - [ ] Settings Modal Only, notification to make sure they checked in sucessfully
- [ ] Wav-ify the page