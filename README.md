# ShakeSearch Challenge

Welcome to the Pulley Shakesearch Challenge! This repository contains a simple web app for searching text in the complete works of Shakespeare.

## Prerequisites

To run the tests, you need to have [Go](https://go.dev/doc/install) and [Docker](https://docs.docker.com/engine/install/) installed on your system.

## Your Task

Your task is to fix the underlying code to make the failing tests in the app pass. There are 3 frontend tests and 3 backend tests, with 2 of each currently failing. You should not modify the tests themselves, but rather improve the code to meet the test requirements. You can use the provided Dockerfile to run the tests or the app locally. The success criteria are to have all 6 tests passing.

## Instructions

<img width="404" alt="image" src="https://github.com/ProlificLabs/shakesearch/assets/98766735/9a5b96b5-0e44-42e1-8d6e-b7a9e08df9a1">

*** 

**Do not open a pull request or fork the repo**. Use these steps to create a hard copy.

1. Create a repository from this one using the "Use this template" button.
2. Fix the underlying code to make the tests pass
3. Include a short explanation of your changes in the readme or changelog file
4. Email us back with a link to your copy of the repo

## Running the App Locally


This command runs the app on your machine and will be available in browser at localhost:3001.

```bash
make run
```

## Running the Tests

This command runs backend and frontend tests.

Backend testing directly runs all Go tests.

Frontend testing run the app and mochajs tests inside docker, using internal port 3002.

```bash
make test
```

Good luck!

## Test Case Fixes

### TestSearchCaseSensitive

I updated the suffix array to include the lower case content, and lower cased the query when supplied to ensure the lookup is case insensitive.

### TestSearchDrunk

Pagination! I asked for some assistance -- I was not sure what the significance of the 20 results was. My initial thought was:
- There are over 100 responses for "drunk". Maybe we wanted to filter the exact term "drunk" instead of including terms like "drunkard"?
- If so, I tried to update the regex to ignore those other terms, but couldn't get to 20.
- I thought that maybe we didn't want to show duplicates since some of the terms would show up multiple times in the response:
    - We return a 250 character window around the search term, so its possible multiple "drunk" terms appear in other windows.
- However, that didn't get me to 20 results.

Once I got a response that the 20 represented the default page size, it was much simpler to solve.

### Front-end changes
- Added handler for clicking "Load More" button. 
- Persisting the # of pages loaded so far so we can paginate the responses.
- Using the correct ID for the load more button
- Disabling "Load More" if the results are below the page size (so its clear there are no more pages to grab)