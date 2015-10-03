Devcards.js
================

See https://github.com/bhauman/devcards
Then try to come back to the old world of js-land.

This project aims at doing the same as did Dan Abramov, bring back
some of the good tricks from more functional language to Js.

This time I aims at Devcards.
They are quite simple at the essence.
Just some simple React components with some nice features attached to them.

Should definitively read this: http://rigsomelight.com/devcards/#!/devdemos.core
And watch this: https://vimeo.com/97078905

I wont give more explanantion, Bruce Hauman did a great job at this.
Plus I don't intend to create features that don't exists in clojurescript's devcards.

Particular points
==================

* built with code reloading in mind

Exemples
=========

Simplest card
-------------

```jsx
//Let's say I've got a component this that
//This component wil just make a string "who $this.props.who"
<MyComponent who="Joe"/>

//And That I want to try it like this
devCard("A not so fancy card",  <MyComponent />);
});

```

Here is the result:
![First component devcards](readme-asset/first-comp.png)


A documenting card
------------------

```jsx

devCard(
  "A card with makrdown", 
  `## Important Stuff
  ### Really important stuff
  Es6 doesn\'t get proper support for multi line string
  What a shame for cards like this one
  
  Here is some *weird* String! Don\'t You thinK Paulie?`,
  <MyComponent str="Joe"/>
);
```

Here is the result:
![Second component devcards](readme-asset/second-comp.png)


A debugging card
----------------

```jsx
const props = {str: 'joe'}
devCard(
  "Show me the prrrrrrops", 
  null,
  <MyComponent {...props}/>, 
  props);
```
Here is the result:
![Third component devcards](readme-asset/third-comp.png)

