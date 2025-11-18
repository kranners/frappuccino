---
id: I hate the ClickUp API
date: "01 August, 2025"
---

# I hate the ClickUp API

I urge you to go to ClickUp right now, go to any ol' tab, and open the Network
tab in your debugger.

Then do anything at all, and just check out how many API calls it makes.

## Getting the sprint tasks

You wanna get the sprint tasks right?

Maybe you know the name of your Space, and you want to get the tasks in that
Spaces' sprint. You idiot.

First you need to [Get Spaces.](https://developer.clickup.com/reference/getspaces)

Get the one that has the name you want.

Then you need to [Get Folders in that Space.](https://developer.clickup.com/reference/getfolders)

Get the one that's called "Sprints". Maybe.

Then you need to [Get the Lists in that Folder.](https://developer.clickup.com/reference/getlists)

You want the most recent one for the current sprint with `archived` turned off.
It's off by default.

You can also get the previous sprints. If you turn `archived` back on.

But OK. One of those. Now you need to [Get the List Views in that List.](https://developer.clickup.com/reference/getlistviews)

Then. Finally. You can [Get the Tasks in that List View.](https://developer.clickup.com/reference/getviewtasks)

So.
```
- Get the Spaces in the team
    - Get the space with a particular name
    - Get its ID
        - Get the Folders in that space
            - Get the folder with a particular name
            - Get its ID
                - Get the Lists in a Folder
                    - Get the list with a particular name
                    - Get its ID
                        - Get the List Views in a List
                            - Get the list view with a particular name
                            - Get its ID
                                - Get the View Tasks in a List View
```

## The NodeJS "API package"
- [ ] Is just their OpenAPI schema that installs itself using some third party
package which attempts to make libraries out of schemas.

It does pretty good to be honest, but it is just an insane dev experience.

Not to mention the TypeScript types come _broken out of the box!!_

## The schema is actually just wrong

OK nevermind, the NodeJS API thing is unusable.

The [Get Folders](https://developer.clickup.com/reference/getfolders) endpoint returns an array of folders.

But the Node.JS API seems to think it's somehow a single folder.

Because the schema is wrong :).

## IDs

When the ClickUp API is returning anything, the IDs are all strings.

When the ClickUp API is taking a string in as an input, it's a number.

## Like getting tasks in a folder

I want to get a list of tasks that have been added to a sprint.

Each sprint is a list like "Sprint 77". 

There is a folder called "Sprints 🏃‍♂️" which contains all of the sprint lists.

So, I want an endpoint where I can pass it the folder ID for the sprints
folder, and it gets me the tasks inside.

There is of course, no endpoint which does that.

So, you could get an array of all the lists in the folder

[Using this](https://developer.clickup.com/reference/getfolder)

And then iterate over them

[Using this](https://developer.clickup.com/reference/gettasks)

But you'd definitely be rate limited unless you handle that personally.

## Get thing

[Get Folder](https://developer.clickup.com/reference/getfolder) means pass in a
folder ID and get all the lists underneath it.

But for [Get List](https://developer.clickup.com/reference/getlists), that
doesn't take in a list ID and gets all the tasks underneath it.

Instead, it takes in a list ID and gets everything about that list except for
the tasks in it.

No, you actually need [Get Tasks](https://developer.clickup.com/reference/gettasks), which does take in a
list ID and returns only the tasks.

You'd think that Get Tasks would just get you a bunch of flat tasks.

But for that, you need [Get Filtered Team Tasks.](https://developer.clickup.com/reference/getfilteredteamtasks)

So, you want to use these to filter by tasks in a folder? 

Well, you'll find there's a filter for space IDs, and list IDs, and... project IDs?!

## Even more get thing

The [Get Lists](https://developer.clickup.com/reference/getlists)
And the [Get Folder](https://developer.clickup.com/reference/getfolder)

Function **LITERALLY** do the same thing. They actually do the same thing.
They both get lists in a folder.

Also for anything where you need to pass it an array of stuff (list IDs), you
need to have at least 2 elements in that array or else ClickUp doesn't know
that it's an array, so I have to intentionally duplicate entries in that case.

