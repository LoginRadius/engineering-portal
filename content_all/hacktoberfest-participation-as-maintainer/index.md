---
type: async
title: How to Participate in Hacktoberfest as a Maintainer
date: 2021-09-28 
author: Narendra Pareek
tags: ["Hacktoberfest", "Hacktoberfest 2021", "Open Source"]
coverImage: "cover.png"
description: This ultimate guide is the resource you need to open source your project and participate in Hacktoberfest to get valuable contributions from the community.
---

You might have already participated in Hacktoberfest as a contributor. But what if you have a project that you want to open source and get contributions during Hacktoberfest?

Well, this guide covers everything you need to know:

- How to make your repo open source?
- How to get valuable contributions from the open source community?
- How to participate in Hacktoberfest as a maintainer?

> Most Important: The project should be in Working Condition or at both Logical and Coding End (if coding project). Here are the list of [OpenSource repos](https://www.loginradius.com/open-source/) by LoginRadius and the [issues/guidelines](/hacktoberfest-2021/) for contributers.

If your project satisfies the above condition, you can just go ahead and implement the steps described as follows. By implementing these steps, you can successfully open source your project and get contributions for your open source project, especially during Hacktoberfest.

## Title

Your project should have a concise title. This title will be the name of your project repo on GitHub.

- The title should be simple and easy to understand.
- No longer than 15 characters.
- Use a hyphen (-) to separate words, not pascal or camel casing. E.g., **engineering-portal**

## Repository Description

- Each project must have a description of the project. The description should give a gist of the project and what the project does.
- The description should not be more than two lines.

## Topic/Labels

As part of Hacktoberfest and to make it easy to find the project, the repository should have one or more of the following labels
- hacktoberfest (mandatory)
- The technology it’s using (golang, react, javascript, etc.)
- open-source 
- contributions-welcome
- hacktoberfest2021

## Project README

Each project must have a README file.
- README should be in Markdown format (README.md)
- README should have the following sections:
    - Name of the project in h1 Heading at the top of your README.
    - A Table of Contents in which each item will link to the following headings:

        - Introduction to the project 
            -  The introduction should start after the heading. 
            - The introduction should be well written and clarify what your project is doing and what it is about.
            - You can also provide a Get Started heading, which should link to the How to Section (Installation).
        - Features (Optional): If you want to highlight any features, add a list here.
        - How to install and run the project (h2 Heading: Installation)
            - This section should clearly describe how someone can run the project locally and if it requires any installations — e.g., `npm i` for node projects.
            - Add any extra information like creating a .env file or anything needed to run the application locally.
        - If it’s a library or utility that the user can directly access or use, add an API or Usage section providing a code snippet.
        - How to Contribute section (h2 Contributing)	
            - Section 1 with a link to the open issues tab. 
                - If you want to contribute, please check the open issues (link of the issues).
            - Section 2 with a link to CONTRIBUTING.md. [Sample](https://github.com/LoginRadius/business-email-validator/blob/master/CONTRIBUTING.md) here.
                - LICENSE: Mention the license of your project. [Sample](https://github.com/LoginRadius/engineering-portal#license) here.

## CONTRIBUTING.MD

It should have instructions on how to contribute to the project. Contributions guidelines should have at least three different sections.

- Guidelines on Reporting New Issues
    - Title and description of the issue.
    - Useful tags, if any.
    - Steps required to reproduce the issue, if applicable.
    - You can also mention an issue template here if required. Issue and PR Templates [here](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates).

- Submitting PRs
    - How to submit a PR? — e.g., details on what changed, what was removed, any action items needed before submitting a PR like running tests, etc.
    - You can add a `PULL_REQUEST_TEMPLATE.md` in the project root to automatically populate templated content while creating a PR.
- Commit Message Format
    - You can add an optional commit message format to maintain commit consistency. Recommended [Commit Message Format](https://github.com/LoginRadius/business-email-validator/blob/master/CONTRIBUTING.md#commit-messages) here.

## License

Choose an appropriate open source license for your project

MIT license is one of the [popular open source licenses](https://opensource.org/licenses) used by many open source projects on GitHub. [Click here](https://opensource.org/licenses) to know more about open source licenses and choose the license most appropriate for your project.


## Issues in Repos

Each repo should have at least 5-10 well-labeled issues to be considered for Hacktoberfest.

- Following are the different issue types:
    - hacktoberfest (mandatory)
    - good-first-contribution
    - good-first-issue
    - exp/beginner
    - help-wanted
    - kind/docs
    - kind/enhancement
    - up-for-grabs
- For more information about managing issues with labels, follow these [GitHub guidelines](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)

As a maintainer, you could also be eligible to win swag from DigitalOcean for participating in Hacktoberfest. For more information, [click here](https://hacktoberfest.digitalocean.com/resources/maintainers).