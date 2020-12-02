### Trim

------------
Fully featured URL shortener written in Angular. Create url groups, trim links and record user visits.

The backend is written in flask-restful and is available [here](https://github.com/olamileke/trim-be "here"). 

View the live application [here](https://trimm.xyz "here").

To run this application locally, you must have node installed. Get that [here](https://nodejs.org "here"). You also need to have the Angular CLI installed. To do this, open up your terminal and run

```
npm install -g @angular/cli
```

This will install the latest version of the Angular CLI which will enable you to run Angular applications.

Next up, navigate into the directory of your choice on your system and clone this repository by running

```
git clone https://github.com/olamileke/trim-fe.git
```

When cloning is complete, navigate into the application directory by running

```
cd Trim-Fe
```

At this point, we need to install all the packages needed by the app to run. Do this by running

```
npm install
```

This will install all the packages defined in the package.json file in the application root.

Navigate to the src/environments directory and set the api_url option in the environment.prod.ts file to http://localhost:5000 or whatever url the cloned backend is running on.

Still in the terminal, run

```
ng serve
```
When the application is done compiling, access it at localhost:4200. Alternatively, you can specify the port you want the app to run at by adding a port parameter like

```
ng serve --port 2000
```
Here the app will be available at localhost:2000.




