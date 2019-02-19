import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
import logo from "./logo.svg";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import "./dropzone.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Bubblegum from "./Bubblegum";
Amplify.configure(aws_exports);
const federated = {
  google_client_id:
    "595089086135-uobb25oa8ra3j92nlqbm79do9ieaaekc.apps.googleusercontent.com"
};
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div></div>,
    main: () => (
      <div>
        <Bubblegum />
      </div>
    )
    //component: Bubblegum
  },
  {
    path: "/shoelaces",
    sidebar: () => <div></div>,
    main: () => <h2>Shoelaces</h2>
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      activeItem: "bio",
      files: []
    };
    this.gotoSignIn = this.gotoSignIn.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    var userdata;
    Auth.currentSession()
      //.then(data => console.log(JSON.stringify(data)))
      .then(data => console.log(data.getAccessToken))
      .catch(err => console.log(err));
    //console.log(userdata);
  }

  gotoSignIn() {
    // to switch the authState to 'signIn'
    this.props.onStateChange("signIn", {});
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Router>
        <Grid>
          <Grid.Column width={2}>
            <Menu fluid vertical tabular>
              <Link to="/">
                <Menu.Item
                  name="bio"
                  active={activeItem === "bio"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="/bubblegum">
                <Menu.Item
                  name="pics"
                  active={activeItem === "pics"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="/shoelaces">
                <Menu.Item
                  name="companies"
                  active={activeItem === "companies"}
                  onClick={this.handleItemClick}
                />
              </Link>

              <Menu.Item
                name="links"
                active={activeItem === "links"}
                onClick={this.handleItemClick}
              />
            </Menu>
            {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </Grid.Column>

          <Grid.Column textAlign='left' stretched padded floated='left' width={14}>
            <Segment textAlign='left' compact color='red'>
              {routes.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </Segment>
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

//export default App;
export default withAuthenticator(App, true);
