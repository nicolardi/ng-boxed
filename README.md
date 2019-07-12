# Boxed

With 'boxed" directive you can simply wrap a dom element and apply classes to style it.

# Installation

npm install ng-boxed

And import the module in your app.module.ts  

```
imports: [
    .....,
    NgBoxedModule
  ],
```

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

