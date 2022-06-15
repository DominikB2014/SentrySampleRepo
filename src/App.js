import logo from "./logo.svg";
import "./App.css";
import * as Sentry from "@sentry/react";

const test = () => {
  throw new Error("This code is broken!");
};

const makeApiCall = () => {
  return {
    error: true
  }
}

const triggerTransaction = () => {
  const transaction = Sentry.startTransaction({ name: "test-transaction" });
  Sentry.getCurrentHub().configureScope((scope) => scope.setSpan(transaction));
  console.log("triggering ");
  const result = makeApiCall();
  const span = transaction.startChild({
    data: {
      result
    },
    op: 'task',
    description: 'a test transaction'
  })
  if (result.error) {
    span.setStatus("unknown_error");
  } else {
    span.setStatus("ok");
  }

  span.finish();
  transaction.finish();
};

function App() {
  return (
    <div className="App">
      <button onClick={test}>BROKEN!!!</button>
      <button onClick={triggerTransaction}>Test Transaction</button>
    </div>
  );
}

export default App;
