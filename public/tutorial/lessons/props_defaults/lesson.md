Props are what we call the object that is passed to our component function on execution that represents all the attributes bound to its JSX. Props objects are readonly and have reactive properties which are wrapped in Object getters. This allows them to have a consistent form regardless of it the caller used signals, signal expressions, or simple or static values. You simply access them by `props.propName`.

For this reason it is also very important to not just destructure them as that will lose reactivity if not done within a tracking scope. In general accessing properties on the props object outside of Solid's primitives or JSX can lose reactivity. This applies not just to destructuring, but spreads and functions like `Object.assign`.

In so Solid has a few utilities to help when working with props. The first `mergeProps` is much like what it sounds. It merges potentially reactive objects together without losing reactivity. The most common use is setting default props for our components.

> Todo Example