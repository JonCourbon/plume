# Plume - A theme for Hugo! generator

**Plume** is a theme for [Hugo](https://gohugo.io/) dedicated to build Environmentally Friendly Websites. More than just a theme, it contains "good practises" to create such a website using Hugo !

## Features
- Lightweight CSS using the *chota* micro CSS framework [https://jenil.github.io/chota/](https://jenil.github.io/chota/) (lightweight, basic set of CSS variables, mobile first) + shortcodes
- Dark mode (by default)
- CSS/JS minification
- CSS pruning
- Image processing
- Client side searching with Fuse.js (based on JSON indexes) (refer for instance to [gist](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae)
- [Fuse.js](https://fusejs.io/) powerful, lightweight fuzzy-search library, with zero dependencies.



## Installation

### Requirements
- npm is installed
- Hugo! is installed
- For CSS pruning, the package @fullhuman/postcss-purgecss is required.
Add the *package.json* file (in the root folder) with content:
````
{
  "name": "quickstart", 
  "version": "1.0.0",
  "description": "",
  "main": "postcss.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "",
  "dependencies": {
    "@fullhuman/postcss-purgecss": "github:fullhuman/postcss-purgecss",
    "autoprefixer": "^10.0.1"
  }
}

````
and install the package with a classical command:
`    npm install`

### Starting point
````
    hugo new site quickstart
    cd quickstart
    mkdir themes
    cd themes
    git clone https://github.com/JonCourbon/plume.git
````

Change *config.toml* (in root folder):
````
    baseURL = ""
    DefaultContentLanguage = "fr"
    languageCode = "fr"
    title = "My wonderful website"
    theme="plume"
````

### Configuration (for development)

Basic configuration file *config.toml* for local usage
````
baseURL = ""
DefaultContentLanguage = "fr"
languageCode = "fr"
title = "My wonderful website"
theme="plume"

theme="plume"

[outputs]
  home = ["HTML", "JSON"] # json is used for the search library
  
[frontmatter]
  date = ["date"]
  lastmod = ["lastmod"]

[author]
  #...

[params]
  mainSections = ["posts"]
````

Add entries to the main menu (entries are ordered by weight)
````
[menu]
    [[menu.main]]
        identifier = "formations"
        name = "Formations"
        url="/formations/"
        weight = 1
````
and entries to the bottom menu (for mobile)
````
    [[menu.bottom]]
        identifier = "formations"
        name = "Formations"
        url="/formations/"
        weight = 1
````

### Configuration (for production)
#### Configuration file for production *config/production/config.toml*
- Set the parameters of the final site (the base URL and the publication directory)
````
baseURL = "http:..../"
theme="plume"
publishDir = "public/"
````

- To enable CSS post-processing (CSS pruning), add:
````
[build]
  writeStats = true
````
(that will create a file named *hugo_stats.json* that contains statistics such as the liste of classes and ids in HTML)

- Minification parameters (when using `hugo --minify`)
````
[minify]
  disableCSS = true
  disableHTML = false
  disableJS = true
  disableJSON = false
  disableSVG = false
  disableXML = false
  minifyOutput = true
  [minify.tdewolff]
    [minify.tdewolff.css]
      decimals = -1
      keepCSS2 = true
    [minify.tdewolff.html]
      keepConditionalComments = true
      keepDefaultAttrVals = true
      keepDocumentTags = true
      keepEndTags = true
      keepQuotes = true
      keepWhitespace = false
    [minify.tdewolff.js]
    [minify.tdewolff.json]
    [minify.tdewolff.svg]
      decimals = -1
    [minify.tdewolff.xml]
      keepWhitespace = false
````
CSS and JS can be disable as minification is done automatically within the partials/ layout files dedicated to Js scripts and CSS inclusion.

If required, privacy setting relative to GDPR can be added such as:
````
[privacy]
  [privacy.youtube]
    disable = false
    privacyEnhanced = true
````

Refer to: [https://gohugo.io/about/hugo-and-gdpr/](https://gohugo.io/about/hugo-and-gdpr/)


#### CSS pruning
- Create the *postcss.config.js* file (root folder).
- Add the content:
````
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [ './hugo_stats.json' ],
    whitelist: [
      'img','dark'
    ],
    fontFace: true,
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
    }
});

module.exports = {
    plugins: [
        require('autoprefixer'),
        ...process.env.HUGO_ENVIRONMENT === 'production'
		  ? [purgecss]
		  : []
    ]
};
````
The whitelist contains selectors that have not to be deleted (it may contain some selectors that are not present in the HTML at the beginning but that will be added dynamically using Javascript codes).

### Test and build
During development, use:
````
    hugo -D server
````

To generate the final website, use:
````
    hugo --minify
    hugo --gc
````


## Creating contents


### Posts and images
To create a new post:

```
content/            assets/      
└── afolder/        └── img/  
    └── mypost.md       ├── img1.png 
                        └── img2.jpg

```
Use the path *img/img1.png* and *img/img2.jpg* within the post.

**Images within the assets folder are un-processed images**. Used images will be read, processed and save in the *img/* folder in the publish directory.

### Images
The shortcode **improcess.html** has been created to process the image (resize, fill, to graylevel). By default, an image of a width under 600px is not resized excepted if it is forced.
````
    {{< improcess src="the image path (relative to assets/ folder)" resize="200x jpg q90" grayscale="1" alt="the alternative text" caption="The caption" forceredim="1" >}}
````
(resize to 200x width, included if it is under 600px width, convert to jpg format with a quality of 90 and then convert to gray level)

Set the image width for mobile screen (mobile-first approach) such that images are not resized in the web browser !

For the parameters, refer to: [Hugo Image processing](https://gohugo.io/content-management/image-processing/)



### Gallery of images
The shortcode **gallery.html** allows to combine multiple images. The global parameters (image resize / fill / to gray) may be passed directly as the gallery parameters to be used for all images.

````
{{<gallery resize="200x jpg" grayscale="1">}}
  {{< improcess src="img/image1.png" alt="alt 1" >}}
  {{< improcess src="img/image2.png" alt="alt 2" >}}
  {{< improcess src="img/image3.png" alt="alt 3" >}}
{{</gallery>}}
````

### Summary
In lists, posts summaries are displayed. By default, it is the beginning of the post content (until < !--more--> if it is too long). If a summary is provided in the front-matter, it is displayed:
`     summary:"a summary of the post"`

### Table of contents
Table of contents can be displayed within posts.

- In the front-matter, add the following element:

`     displaytoc: true`

- In the file *config.toml*
````
[markup]
  [markup.tableOfContents]
    endLevel = 2
    ordered = false
    startLevel = 2
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
````

### Tags
- In the configuration file, add the taxonomy:
````
[taxonomies]
  tag = "tags"
````

- In the front-matter, add the following element (the second line is the tag list):
````
displaytag: true
tags: ["BUT", "Bachelor"]
````



## Tips (Hugo / Markdown / plume)

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
