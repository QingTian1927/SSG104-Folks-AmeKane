Rainboot
========

An online personal finance tracker made for my in-group working skills class (totally related)

![Dashboard home page (landscape layout)](https://github.com/QingTian1927/SSG104-Folks-AmeKane/blob/master/public/home/hero.jpg)

![Dashboard pages (portrait layout)](https://github.com/QingTian1927/SSG104-Folks-AmeKane/blob/master/public/home/features.gif)

**Note:** As of 2025-04-22, Rainboot services have been suspended. Only the home page remains accessible.

# Table of Contents
1. [Features](#features)
2. [Usage](#usage)

# Features
* Track income or spending by categories
* Create multiple financial accounts
* View helpful statistics on your accounts
* Responsive design that works on virtually any devices
* Dynamic light and dark themes that change according to system settings
* And many more (probably :v)

# Usage
To access Rainboot, launch your favorite web browser and enter the URL: [https://rainboot.onrender.com/](https://rainboot.onrender.com/)

An account is required to access Rainboot services. If you already have a Google or Facebook account, you can log in to Rainboot right away. **Currently, only account registration with Google or Facebook is supported.**

To start using Rainboot, please access the dashboard. The user interface is designed to be as intuitive as possible, so users can start tracking their finances immediately with no problem. Should you encounter any difficulties, you can always refer back to this manual or contact support if needed.

## Tracking Financial Items
Tracking your finances starts with creating a financial account. You can create some by accessing the Accounts page.

Once you have created your accounts, you need to define some spending/income categories. This serves to divide your finances into visually distinct sections.

With your newly created categories, you can now start tracking your finances by accessing the dashboard and clicking the big "+" button.

## Setting Saving Goals
To define saving goals, you can access the Savings page and create a new saving item. Simply set the target amount and your current saving progress if any, and then you are done.

Saving goals are editable, and so are any other financial items in Rainboot. You can update saving goals by simply adjusting the saving progress on the edit page.

## Deleting Your Account
At any point, should you not feel like using Rainboot anymore, you can simply delete your account on the settings page. **Please note that deleting your account is permanent and irreversible.**

At the time of writing, Rainboot does not support exporting data. Please do **manually back up your finances** beforehand.

# Running Locally
It is possible to run Rainboot locally by cloning this repo and setting up a local Supabase instance. Please read [this article](https://supabase.com/docs/guides/local-development) for the instructions on setting up Supabase.

There is no `.env` file provided with the repo itself for security reasons (obviously), so you will need to provide one yourself. Please check out [`env.d.ts`](https://github.com/QingTian1927/SSG104-Folks-AmeKane/blob/master/src/env.d.ts) for more information on the environment keys.

Should there be any issues, please check out the Astro config [`astro.config.mjs`](https://github.com/QingTian1927/SSG104-Folks-AmeKane/blob/master/astro.config.mjs) and the Supabase config [`config.toml`](https://github.com/QingTian1927/SSG104-Folks-AmeKane/blob/master/supabase/config.toml). You can make any changes necessary to match with your environment.
