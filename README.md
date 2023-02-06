## Automatic Batching

This feature was implemented as default in React 18. Before React 18, it only appeared in React event handler

```jsx
// Before React 18 is released: Only React events were batched

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // As you can see we have two setState function here
  // But if you try to invoke this function, the component only re-renders once but not twice (that's called batching)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // But if you put it in a setTimeout, setInterval, it will re-render twice now (no batching)
}, 1000);
```

<br>

```jsx
// After React 18 is released:

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Ditto, still the same output (still re-render only once)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React component will only re-render once now after the React 18 release (that's called batching !!)
}, 1000);
```

But what if you still want to force React component to re-render twice for each setState line, then you may use `flushSync`. Here is the example of flushSync in real situation:

```jsx
import { flushSync } from "react-dom";

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag((f) => !f);
  });
  // React has updated the DOM by now
}
```

## useLayoutEffect and useEffect

You might wondering what're the differences between useEffect and useLayoutEffect? Here's an example of a small difference between useLayoutEffect and useEffect in React:

Let's just create a simple Counter app to make an example to:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // First, let's start with the useEffect one:
  useEffect(() => {
    if (count === 3) {
      setCount(0);
    }
  }, [count]);
}
```

Now let's test the code, shall we? I will click the `Increase` button 3 times

And as you can see:

![Count:0](https://i.ibb.co/TBSx91N/image.png)

The count number went back to 0 after the `state: count` is equal to 3, but if you throttle your computer to lower its performance (in case your PC is too strong), you can see a flicker of the number 3 before it went back to 0

![Count:3](https://i.ibb.co/z77WNLW/image.png)

This flickering thing will **become very annoying** when you work with redirecting pages in React.

In real-life situation: `You haven't logged in = you won't get the authority to see the "authenticated" pages`.

But if you typed the correct URL into the Google search bar, you will still see a glimpse of that `Login page` when using useEffect hook. Example:

```jsx
const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      // if you've logged in, you will redirect back to the homepage
      navigate("/");
    } else {
      // If not then continue directing to the login page
      navigate("/log-in");
    }
  }, []);
};
```

Now you typed in the search bar for example: `https://facebook.com/log-in` after you've logged in, you will still get to see a glimpse of the login page >:( and i don't want that to be happened

Okay, now you've understood what i was talking about, we will dive deeper into these two hooks. I had created 2 FigJam files with flowcharts in it:

- Vietnamese version: [Flowcharts Vietnamese Version](https://www.figma.com/file/p4QHmRybehnDH1RlOOUAHh/useEffect-vs-useLayoutEffect-VI-version?node-id=0%3A1&t=1YxJz77MZ8OwlCDW-1)

- English version: _coming soon..._

Figma simple cheatsheet for Vozers who don't know how to use it:

- Zoom in : hold Ctrl + Scroll up to Zoom in

- Zoom out: hold Ctrl + Scroll down to Zoom out

- press H: To move around

- press V: To select a text, a object, ...e.t.c
