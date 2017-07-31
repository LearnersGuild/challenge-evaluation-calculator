# Challenge Evaluation Calculator

A Google Chrome extension that converts coding challenge gists with weighted requirements into a form that can be used to calculate the total score for a challenge.

In short, it turns this:

![before](https://user-images.githubusercontent.com/709100/28796901-4d87fc3a-760d-11e7-841b-535841d42abf.png)

into this:

![after](https://user-images.githubusercontent.com/709100/28798464-8e778986-7612-11e7-9cd4-f36cceb0fb00.png)


## Installation

The easiest way to install this extension is to clone the repo and then drag the downloaded folder into [chrome://extensions](chrome://extensions). For more info, read the [Getting Started guide from Chrome](https://developer.chrome.com/extensions/getstarted#unpacked).

## How it Works

In a nutshell, it looks within the page of any [GitHub gist](https://gist.github.com/) for checklist items that have text matching the format `<number>: <description>`, e.g.:

> **50:** The layouts of your views match the wireframes.

It then replaces each checkbox with a number input field (setting both default and max value to the `<number>`) and automatically re-calculates the total whenever any of these numbers are changed.
