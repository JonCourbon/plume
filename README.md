# Plume - A theme for Hugo! generator

## Installation

### Starting point
````
    $ mkdir themes
    $ cd themes
    $ git clone https://github.com/JonCourbon/plume.git
````

Set **config.toml**:
````
    baseURL = ""
    DefaultContentLanguage = "fr"
    languageCode = "fr"
    title = "My wonderful website"
    theme="plume"
````

### Main setup


## Features


## How-to

## Hugo / theme tips 

### Opening an hyperlink in a new page
➡️ use the shortcode target-blank.html
````
    {{<target-blank url="http://www.uca.fr" title="Website">}}
````


### Generating an hyperlink to an existing page

```
    [text]({{<ref "page">}})
```
for instance:  
```
    [see more]({{<ref "blog/but2021.md">}})
```
