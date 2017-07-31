# Challenge Evaluation Calculator

A Google Chrome extension that converts coding challenge gists with weighted requirements into a form that can be used to calculate the total score for a challenge.

Once the points have been determined for each requirement, you can generate and download a JSON report.

In short, it turns this:

![before](https://user-images.githubusercontent.com/709100/28796901-4d87fc3a-760d-11e7-841b-535841d42abf.png)

into this:

![after](https://user-images.githubusercontent.com/709100/28799671-8a014522-7617-11e7-8ec2-17644dc295ca.png)

## Installation

The easiest way to install this extension is to clone the repo and then drag the downloaded folder into [chrome://extensions](chrome://extensions). For more info, read the [Getting Started guide from Chrome](https://developer.chrome.com/extensions/getstarted#unpacked).

## How it Works

In a nutshell, it looks within the page of any [GitHub gist](https://gist.github.com/) for checklist items that have text matching the format `<number>: <description>`, e.g.:

> **50:** The layouts of your views match the wireframes.

It then replaces each checkbox with a number input field (setting both default and max value to the `<number>`) and automatically re-calculates the total whenever any of these numbers are changed.
