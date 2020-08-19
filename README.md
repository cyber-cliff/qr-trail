# QR Trail

QR Trail is a web app created to help with contact tracing for Covid-19. It's main premise is to automate the manual process of having to fill up a form everytime you enter an establishment. It replaces it by having people register and generate their own QR code in which their data is encoded. So that when they visit different establishments, all they have to do is have their QR code scanned so the security personnel in that building can get their data.

The following steps represents the entire flow of the system:

1. User enters their info through the website [https://qr_trail.surge.sh](https://qr_trail.surge.sh). This can be than at the comfort of their own home since the website can be access anywhere. 
2. Once all the data is entered, the user clicks on the **Generate QR Code** button to encode their data into a QR code.
3. The user downloads the QR code on their phone and have it printed so it can be easily scanned later on.
4. With the QR code in hand, the user enters an establishment and shows their QR code to the security personnel. 
5. The personnel goes to [https://qr_trail.surge.sh/#/scan](https://qr_trail.surge.sh/#/scan) to scan the QR code. For this to work, their phone needs to be a smartphone with a camera.
6. Once the QR code is recognized, the visitor's info will appear on the screen. The personnel can then skip the questionnaire and save the default data as it is. They can also go through the questionnaire and ask the visitor. 
7. At the end of the day, the security personnel can go to [https://qr_trail.surge.sh/#/files](https://qr_trail.surge.sh/#/files) or simply click on the **Files** button while on the scan page to view all the visitors that day. From this page, they can download the CSV (comma-separated list) file containing all the visitors data for that day.
8. The security personnel submits the CSV file to whoever is in charge with collecting the data for contact tracing.

## Privacy Concerns

As the system is built primarily with portability in mind, all the data just lives on user's phones. Thus it's necessary for business establishments to provide their own phone primarily used for the purpose of scanning. Otherwise, the security personnel can just take home all the visitor data.
Alternatively, they can just have the security personnel, manually clear all the data from their phone. This can be done by deleting the downloaded CSV file and clearing the browser history.

## FAQ

**Q:** Which data does the app collect?

**A:** The app asks for the following info: Last name, first name, middle name, nationality, age, gender, phone number, address.


**Q:** Is my data stored in a database somewhere?

**A:** No. This web app doesn't use or communicate with any database. All your data is stored on your phone (or computer). You can simply clear your history and all the data used by the app will be removed from your phone.


**Q:** Can the app be used by anyone?

**A:** Yes. But it's only for demo purposes. The app is currently served on a static file server site called [surge.sh](https://surge.sh). It is free so reliability can't really be ensured, especially if a lot of people starts using it. Thus it's encouraged that business establishments try to get a copy of the app on their own and also serve on [surge.sh](https://surge.sh). Though it's best if the city/municipality runs a copy of this app on their own, and have the businesses use it.
