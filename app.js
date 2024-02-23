const heading = React.createElement("div", {}, [
  React.createElement("div", {}, [
    React.createElement("h1", {}, "Hello from React 1.1!"),
    React.createElement("h1", {}, "Hello from React 1.2!"),
  ]),
  React.createElement("div", {}, [
    React.createElement("h1", {}, "Hello from React 2.1!"),
    React.createElement("h1", {}, "Hello from React 2.2!"),
  ]),
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);
