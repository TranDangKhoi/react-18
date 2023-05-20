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

Now let's run and test the code, shall we? I will click the `Increase` button 3 times.

As you can see:

![Count:0](https://i.ibb.co/TBSx91N/image.png)

The count number went back to 0 after the `state: count` is equal to 3, but if you throttle your computer to lower its performance (in case your PC is too strong), you can see a glimpse of the number 3 before it went back to 0

![Count:3](https://i.ibb.co/z77WNLW/image.png)

This flickering thing will **become very annoying** when you work with large amount of data data in React. Because in order to load a huge amount of data, you must wait for your browser to fully load before display it properly

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

Furthermore, its id has a `:` in it, colon isn't supported in `CSS Selectors` and `querySelectorAll` (Actually you can use `\:` but still... NO DON'T USE IT ALONG WITH CSS SELECTORS 🤬)

`useId` should not be used to create keys for a rendered list ❌

## useImperativeHandle

React kinda vaguely explained this hook:

```bash
`useImperativeHandle` is a React Hook that lets you customize the handle exposed as a ref.
```

That's true, `useImperativeHandle` is used to handle ref properties. Let's say you're referencing an inputRef into an input element:

```jsx
const Form = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  return (
    <form>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};
```

The `inputRef.current` will have input's Javascript functions such as:

- `inputRef.current.focus()`: to focus into the input when you activate focus() through an event.
- `inputRef.current.blur()`: to blur out of the input when you activate blur() through an event.

For example:

```jsx
const Form = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  return (
    <form>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="button" onClick={() => inputRef.current.focus()}>
        Focus
      </button>
    </form>
  );
};
```

In the above codes, I added a button tag which has an onClick event that passed in the `current` property, followed with the focus() function to focus the input.

So now, the users can focus the input when they click on the button. But what if the input is a component ??

```jsx
const Form = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  return (
    <form>
      <UseImperativeInput
        value={value}
        setValue={setValue}
        ref={inputRef}
      ></UseImperativeInput>
      <button type="button" onClick={() => inputRef.current.focus()}>
        Focus
      </button>
    </form>
  );
};
```

Yeah easy, we will use `forwardRef` to send the ref back to the `Form component`.

```jsx
// passing in props and ref
const UseImperativeInput = ({ value, setValue }, ref) => {
  return (
    <>
      <input
        type="text"
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
// forwardRef
export default React.forwardRef(UseImperativeInput);
```

And now, we can focus the input after clicking the button once again ^o^. But ... what if I say `we can created a brand new function for this input with useImperativeHandle hook`. Let's say not only focus the input, i want the button to also alert something, and set the value of the input to something else without passing the `value` and `setValue` props. Okay let's get rid of those props and declare our own state inside the UseImperativeInput component:

```jsx
const UseImperativeInput = (props, ref) => {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </>
  );
};

export default React.forwardRef(UseImperativeInput);
```

Get rid of the unused states in the Form component:

```jsx
const Form = () => {
  const inputRef = useRef();
  return (
    <form>
      <UseImperativeInput ref={inputRef}></UseImperativeInput>
      <button type="button" onClick={() => inputRef.current.focus()}>
        Focus
      </button>
    </form>
  );
};

export default Form;
```

Before doing that, let's explain the hook first. For me, useImperativeHandle let you customize the return values of a ref. Normally, when you use useRef you will only get the functions that suitable for what the ref references to. It let you replace the native functions with your own functions.

Okay now let's use the HOOK inside the UseImperativeInput component:

```jsx
const UseImperativeInput = (props, ref) => {
  // Declare our own local state
  const [value, setValue] = useState("");
  // Create a brand new ref inside and REMEMBER to reference it to t
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      // return a function that was written by you
      focusInput: () => {
        inputRef.current.focus();
        setValue("what is this hook?");
      },
    };
  });
  return (
    <>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </>
  );
};

export default React.forwardRef(UseImperativeInput);
```

Now in the Form component, you can use the function `focusInput()` for the button.

```jsx
const Form = () => {
  const inputRef = useRef();
  return (
    <form>
      <UseImperativeInput ref={inputRef}></UseImperativeInput>
      <button type="button" onClick={() => inputRef.current.focusInput()}>
        Focus
      </button>
    </form>
  );
};

export default Form;
```

## useDeferredValue

This hook is almost the same to debounce value. But when you debounce a value, you will have to set a timeout for that value.

This hook is different, it will look for a perfect timeout to make the value debounce, so the application won't be as laggy as it was

Usage:

```jsx
const [name, setName] = useState("");
const debounceName = useDeferredValue(name);
// Then you can use this in your JSX code
```
