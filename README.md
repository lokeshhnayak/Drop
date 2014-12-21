# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Vehicle Tracking and Surveillance System.
* Initial Draft
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* If not done already, install chrome and set chrome as your default browser.
* Install LiveReload from here: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-ntp-icon
* Ensure you've installed Node from here: http://nodejs.org/
* Ensure you've install git from here: http://git-scm.com/download. You can follow the steps described here: http://git-scm.com/book/en/v2/Getting-Started-Installing-Git.
* Identify your project folder and create a new folder called "VTSS" inside that folder.
* Open command prompt as an administrator and "cd" into the above directory.
* Clone the project repository using the git url found above (Don't forget the "." in the end): 
`git clone <Your GIT URL> .`
* You should now see a Client directory inside your VTSS folder.
* cd into Client directory. You should now see 3 directories inside your Client directory - bower, grunt and public.
* We will be using bower for front end dependencies management. Install bower using:
`npm install -g bower`
* We will be using grunt for build management. Install grunt using:
`npm install -g grunt-cli`
> Note: The below 2 steps might take a while, so this might be your chance to grab a cup of coffee.
* From your command line, navigate to the bower folder and type `bower install`. This should install all the front end dependencies.
* From your command line, navigate to the grunt folder and type `npm install`. This should install all grunt dependencies.
* Once done, build the project using `grunt vtp`. This should prepare the build and launch the application in your chrome browser.

### Who do I talk to? ###

* Repo owner or admin
* Santhosh Reddy