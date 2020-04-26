# Macromé

Macromé (pronounced macro-may) is a build tool designed for generating files which will be checked into source control. This differs from existing build systems like grunt, gulp, or broccoli, all of which are designed to generate built outputs which will not be checked in.

Macromé **is not intended to replace other existing build systems**. It is intended to supplement them. You won't find plugins for compiling to CSS or es5, or bundling assets. You should still use another build system for those tasks.

Nothing about macromé is specific to Javascript, but it is expected to be used mostly on Javascript projects, particularly in combination with the excellent `babel-plugin-macros`.

## Usage

To get started with Macromé, first you'll need to [install watchman](http://facebook.github.io/watchman/docs/install). It is needed for its [filesystem settling](http://facebook.github.io/watchman/docs/subscribe#filesystem-settling) capabilities.

## Why would I need Macromé?

Macros are an time-tested and potentially highly useful technique, but they come with certain problems. Most importantly, they complicate the history of the codebase because the code with macros applied, suitable for execution and static analysis, isn't usually under source control. This means you can no longer read past code unless you understand the historical definition of any macros. You'd also be unable to use a git commit hash as a package.

Macrome helps you maintain that history, which even enables git commit hashes to be used as ad hoc packages.

## Features

- It can easily mark its output files as being autogenerated, omitting them from review on github
- It plays nice with git, even during operations like rebases
- It can run in build or watch mode
- It can clean all autogenerated files
- It can report generation failures
- When generation fails, the generated file throws a parse-time error.
- It can be used via the command line or its JS API
