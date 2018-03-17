---
layout: post
title: Hello World !!
description: "Hello World !! Welcome to my first post in my blog"
author: PhenixLi
---
This is my first post in github, hello world!

In github, the aim is to share something you like, or discovered, or summarized that can help others, 
so I share the step by step setup procedure of this blog and the development environment (in MacOS) in my first post to make it easier to all. And at the same time, practice to use "jekyll" and "markdown" to create the web. Let's start ;)

### Step 1: Register account in Github and create the blog ###
* Browse the [github page](https://github.com, "Github's homepage") and create an account if you don't have.
![alt text](/assets/img/2018-02-20-Hello-World/github-reg.png)
* Login to your github account
* Create a new repository with the name with format "\<user name\>.github.io"
![alt text](/assets/img/2018-02-20-Hello-World/github-new-repo.png)
> PS: It is important that \<user name\> must be same as your github account, otherwise it may not work
* Create and commit a dummy page
> Execute below command from terminal window
```bash
	cd <destination directory>
	git clone https://github.com/<user name>/<user name>.github.io
	cd <user name>.github.io/
	echo "Hello World" > index.html
	git add --all
	git commit -m "Initial commit"
	git push -u origin master
```
* Congs, the page is created and you can see it in "http://\<user name\>.github.io" 
![alt text](/assets/img/2018-02-20-Hello-World/first-github-page.png)
> PS: During push the source to master, it is found that it return error code 403 sometimes.
> If this happen, need to add the username to the URI in the file .git/config to resolve, ie.
>> cat .git/config 

>>> ...<br>
>>> [remote "origin"]<br>
>>> url = https://<font color='red'><b><i>&#60;user name&#62;@</i></b></font>github.com/<user name>/<user name>.github.io<br>
>>> ...

>>> Ref: [stackoverflow](https://stackoverflow.com/questions/7438313/pushing-to-git-returning-error-code-403-fatal-http-request-failed)


### Step 2: Create the jekyll development environment ###
* Install home-brew and libffi 
> Execute below command from terminal window
```bash
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
	brew install libffi
```
> Ref: [home-brew and libffi installation guide](http://macappstore.org/libffi/)
* Install jekyll for development and test the Github page locally
> Execute below command from terminal window
```bash
sudo gem update
sudo gem install jekyll
sudo gem install github-pages
gem install jekyll bundler
```
>PS: Don't know if because my notebook is slow, need to download and compile for a while as this step ... zzZ<br><br>
>Ref: [Jekyll-now](https://github.com/barryclark/jekyll-now),
>[Jekyll installation](https://jekyllrb.com/docs/installation/),
>[Jekyll quickstart](https://jekyllrb.com/docs/quickstart/)

* Create the basic web template using Jekyll
> Execute below command from terminal window
```bash
jekyll new <user name>.github.io
cd <user name>.github.io
jekyll serve
```
> Now, you have create the initial web template locally and able to modify based on this.<br>
> You can view your blog locally using any browser to url (http://localhost:4000) 
![alt text](/assets/img/2018-02-20-Hello-World/jekyll-template.png)

> PS: You have only created (and update) the blog in local computer, it is not yet committed to Github.

* Commit to Github after you finalized the web content
> Execute below command from terminal window
```bash
	git add --all
	git commit -m "Initial commit"
	git push -u origin master
```
> PS: You have deployed your first Github page already !!

### Step 3: Make it more beautiful ###
* Visit [jekyllthemes.org](http://jekyllthemes.org "Jekyll Themes homepage"), select and download your favorite theme.
![alt text](/assets/img/2018-02-20-Hello-World/jekyll-themes.png)
> PS: My one is modify from [Wall-E Theme](http://jekyllthemes.org/themes/wall-e/ "Wall-E Themes homepage") select from the link above, of coz you can also search more themes from internet or design your own theme. Feel free to leave me message if you found any question and comment.

> Ref: [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet "markdown cheatsheet"),
> [disqus](https://disqus.com/)
