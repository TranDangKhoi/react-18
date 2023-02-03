# Automatic Batching

Tính năng này được thêm vào như là mặc định trong React 18. Trước đó thì nó chỉ xuất hiện trong React event handler

```jsx
// Trước khi React 18 ra mắt:

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React chỉ re-render 1 lần trong khi mình thay đổi 2 cái state lận
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Component re-render 2 lần (đó được gọi là batching)
}, 1000);
```

```jsx
// Sau khi React 18 cập nhật:

function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React sẽ chỉ re-render 1 lần
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Lên React 18 thì khi chạy đoạn setTimeout này React cũng sẽ chỉ re-render 1 lần (đó là batching)
}, 1000);
```

Trong trường hợp muốn ép React re-render, bỏ qua batching thì dùng `flushSync`

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
