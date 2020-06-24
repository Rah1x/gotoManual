# README

Go to various manuals with one click (opens in browser).

VSCode Marketplace:
https://marketplace.visualstudio.com/items?itemName=rhasan.gotomanual

Github Repo:
https://github.com/Rah1x/gotoManual

## Features

1] Supporting various manuals:

* PHP manual for functions only (via PHP.net),
* JS manual (via W3School),
* CSS manual (via developer.mozilla.org)
* Python document search (via docs.python.org)
* Golang search (via golang.org)
* C++ manual (via documentation.help)
* and the good ol google search

This is what it looks like once installed and when you right-click on a piece of code:

![Output](resources/output_2.png)
\
\
![Output](resources/demo_1.png)

2] Editor's active language specific menu only = show only relevant menu. This means if you are working on a PHP file it will show all options, but if you are working on a css file it will only show `goTo: CSS` option. Meanwhile `goTo: Google Search` is always available.

I will update this later as we go and add more options, but if you have anything in mind (for example if you want another manual, or another file type for one of these languages) just create an issue with the label `enhancement` at the github repo and I will add it as well:
https://github.com/Rah1x/gotoManual


## Special Usage Instructions

1) **CSS**:
For pseudo class or elements, please select the starting colons (:) as well. For example `:last-child` with the colons instead of just `last-child`

## Requirements

On the first run you would need to add the url base (for example `google.com`) to the trusted domains.\
So when you select any goTo menu for the first time you will see a popup that looks like the following image. Just click on `Configure Trusted Domains` (only if you see a trusted domain btw).

![Add To Trusted Step 1](resources/add_to_trusted_1.png)
\
\
![Add To Trusted Step 2](resources/add_to_trusted_2.png)

## Extension Settings

This extension contributes the following settings:

* `gotomanual.url.Google`: url for Google search selected text
* `gotomanual.url.GoogleStackOverFlow`: url for Google search selected text for stackoverflow
* `gotomanual.url.PHP`: url for PHP 'function' search via php.net
* `gotomanual.url.JS`: url for JS reference search via W3School
* `gotomanual.url.CSS`: url for CSS reference search via developer.mozilla.org
* `gotomanual.url.Python`: url for Python reference search via docs.python.org
* `gotomanual.url.Golang`: url for Golang reference search via golang.org
* `gotomanual.url.CPP`: url for C++ reference search via documentation.help

## 0.2.3
Stackoverflow search (via google) added

## 0.2.0

C++ reference search added,
Extension script code improved

## 0.1.1

GoLang reference search added

## 0.0.61

Python reference search added

## 0.0.55

Language specific activation

## 0.0.5

CSS manual added

## 0.0.4

Minor fixes

## 0.0.1

Initial release
