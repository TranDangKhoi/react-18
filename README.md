### All of these were written by Khoi aka me 😊

## Automatic Batching 🤖

This feature was implemented as default in React 18. Before React 18, it only appeared in React event handler

```jsx
// Before React 18 is released: Only React events were batched

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // As you can see we have two setState function here
  // But if you try to invoke this function through a react event handler (e.g: onClick, onChange, ...)
  // the component only re-renders once but not twice (that's called batching)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // But if you put it in a setTimeout or a setInterval, it will re-render twice now (no batching)
}, 1000);
```

<br>

```jsx
// After React 18 is released:
function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Ditto, still the same output (still re-render only once) 🙄
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React component will only re-render once now after the React 18 release (that's called batching !!)
}, 1000);
```

But what if you still want to force React component to re-render twice for each setState line, then you may use `flushSync`. Here is an example of flushSync in practical coding situation:

```jsx
import { flushSync } from "react-dom";

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // Re-rendered once, React has updated the DOM by now
  flushSync(() => {
    setFlag((f) => !f);
  });
  // Re-rendered once more, React has updated the DOM by now
}
```

## useLayoutEffect and useEffect 😎

You might be wondering what're the differences between useEffect and useLayoutEffect? Here's an example of a small difference between useLayoutEffect and useEffect in React:

Let's just create a simple Counter app to make an example about:

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

Now let's run and test the code, shall we? I will click the `Increase` button 3 times, 1.. 2.. and then 3 💥.

As you can see:

![Count:0](https://i.ibb.co/TBSx91N/image.png)

The count number went back to 0 after the `state: count` is equal to 3, but if you throttle your computer to lower its performance (in case your PC is too strong), you can see a flicker of the number 3 before it went back to 0

![Count:3](https://i.ibb.co/z77WNLW/image.png)

This flickering thing will **become very annoying** when you work with redirecting pages in React.

In real-life situation: `You haven't logged in = you won't get the authority to see the "authenticated-permission" pages`.

But if you typed the correct URL into the Google search bar, you will still see a glimpse of that `authenticated-permission page` when using useEffect hook. Example:

```jsx
const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      // if you've logged in, you will be redirected back to the homepage
      navigate("/");
    } else {
      // If not then continue directing to the login page
      navigate("/log-in");
    }
  }, []);
};
```

Now you try to type into the search bar, for instance: `https://mywebsite.com/log-in` after you've logged in, you will still get to see a glimpse of the login page >:( and YOU don't want that to be happened

### Flowcharts for everyone 📊

Okay, now if you've understood what i was talking about, we will dive deeper into these two hooks. I had created 2 FigJam files with flowcharts in it:

- Vietnamese version: [Flowcharts Vietnamese Version](https://www.figma.com/file/p4QHmRybehnDH1RlOOUAHh/useEffect-vs-useLayoutEffect-VI-version?node-id=0%3A1&t=1YxJz77MZ8OwlCDW-1)

- English version: _coming soon because the owner is lazy..._

### A simple Figma cheatsheet for **boomers** who don't know how to use it:

- Zoom in : hold Ctrl + Scroll up to Zoom in

- Zoom out: hold Ctrl + Scroll down to Zoom out

- press H: To switch to "viewing-mode" then hold left-click move around

- press V: To switch to "editing-mode" then select a text, a object, ...e.t.c to edit it

For normal computer users aka z00mers, the shortcuts above are not extraneous issues 😉

As you can see in the Figma file i attached up there, useEffect and useLayoutEffect have different life cycles, i will summarize it right here in this markdown

- useEffect: Init the component -> Init the useEffect (Callback hasn't run yet) => Render JSX => Update virtual DOM => Update real DOM (The HTML Elements) => Paint every single needed pixels **`(this is why you see the number 3 before it turn back to 0) after painting the number 3 into the website, the component will re-render again => run the callback inside the useEffect => run the if statement => then set it back to 0`** => Check the dependencies

  - In this **"Check the dependencies"** step, we will split it into 2 branches, one for the **"Changed dependencies"** and one for the **"Same dependencies"**

  - Branch 1: Changed dependencies value => Run callback inside useEffect => Does the callback have setState inside ?

    - Yes: Update state => Composite layers => Users see it => Users interact with it => Re-render => Run from the beginning once again

    - No: Composite layers => Users see it => Users interact with it

  - Branch 2: Same dependencies value => Does the callback have setState inside ?

    - Yes: Update state => Re-render => Run from the beginning once again => Composite layers => Users see it => Users interact with it

    - No: Composite layers => Users see it => Users interact with it

- useLayoutEffect (just a small change): Init the component => Init the useLayoutEffect (Callback hasn't run yet) => Render JSX => Update virtual DOM => Update real DOM (The HTML Elements) => Check the dependencies

  - In this **"Check the dependencies"** step, we will split it into 2 branches, one for the **"Changed dependencies"** and one for the **"Same dependencies"**

  - Branch 1: Changed dependencies => Run callback inside useLayoutEffect => Does the callback have setState inside ?

    - Yes: Set state => Re-render => Run from the beginning

    - No: Paint => Composite layers => Users see it => Users interact with it

  - Branch 2: Same dependencies => Paint => Composite layers => Users see it => Users interact with it

Yes, i'm having a headache right now 😠🤜🧠. You can just simply understand that:

- `useEffect` will update the UI (paint) before running the callback inside it. So that's why you saw the number 3 before it went back to 0 => After setting it back to 0 the useEffect ran once more then finished

- `useLayoutEffect` will run the callback inside it before updating the UI (paint). So that's why you didn't see the number 3 because it's checking the **if-statement** condition before painting, if the condition return false then no more painting/updating

## useId 😲

**useId** is a hook to help you create an unique ID 😋

```jsx
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React? 😻</label>
      <input id={id} type="checkbox" name="react" />
    </>
  );
}
```

> **Usages**:

- Create an unique ID, suitable for `htmlFor` in label tag and `id` in input tag

- If your server return an id `a` but on client it render an id `b` that means your server and client are not synced. `useId` can help you with that, if you work with `NextJS` or `run React on server` you can understand this process quickly, don't mind it when you hasn't known about them 😐

> **Notes**:

Please don't use CSS for this type of unique ID.

Furthermore, its id has a `:` in it, colon isn't supported in `CSS Selectors` and `querySelectorAll` (Actually you can use `\:` but still... NO NO NO NO 🤬)

`useId` should not be used to create keys for a rendered list ❌
