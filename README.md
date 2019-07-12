# Boxed directive

With 'boxed" directive you can simply wrap a dom element and apply classes to style it.
is a div with id bar and classes 'foo hello'

# Installation

npm install ng-boxed

And import the module in your app.module.ts  

```
imports: [
    .....,
    NgBoxedModule
  ],
```

## Emmet notation
'boxed' supports an "emmet-style" way to describe the wrappers and their hierarchy.

'div' is a div element
'div.foo' is a div with class foo
'div#bar' is a div with id bar
'div#bar.foo" is a div with id bar and class foo
'div#bar.foo.hello' 

'div>div' is a div with another div as a child
'div.a>div.b' is a div of class a with a div of class b as child

## Basic usage - single box 

```
<a class="foo" boxed="div">This is a link</a>

yields:

<div>
   <a class="foo">This is a link</a>
</div>
```

## Multiple boxes

```
<a class="foo" boxed="div>div">This is a link</a>

yields

<div>
   <div>
       <a class="foo">This is a link</a>
   </div>
</div>
```

## Styled boxes

```
<a class="foo" boxed="div.hello>div.all">This is a link</a>

yields

<div class="hello">
   <div class="world">
       <a class="foo">This is a link</a>
   </div>
</div>
```

## More advanced usage

```
<a class="foo" boxed="div#the_id.hello.world>div.first.second">This is a link</a>

yields

<div class="hello world" id="the_id">
   <div class="first second">
       <a class="foo">This is a link</a>
   </div>
</div>
```

## Default value

You can use boxed without any parameter. In this case it wraps the element in a div.col-12 (bootstrap-like)

```
<div boxed>This is a text</div>

yields

<div class="col-12">
   <div class="first second">This is a text</div>
</div>
```

