import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { equals, path, compose } from 'ramda';
import { Redirect, Route } from 'react-router-dom';

const mapStateToProps = (state) => ({
  store: state
});

class AuthRoute extends React.Component {
  static displayName = Math.random();

  static propTypes = {
    defaultRedirect: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    deepCheck: PropTypes.bool,
    location: PropTypes.object.isRequired,
    middlewares: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    store: PropTypes.object,
    component: PropTypes.any.isRequired,
    render: PropTypes.func,
  }

  static defaultProps = {
    defaultRedirect: {
      pathname: '/login'
    },
    middlewares: [],
    deepCheck: false,
    store: {},
    render: null
  }

  constructor(props) {
    super(props);

    this.defaultRedirect = this.props.defaultRedirect;

    this.unique = Math.random().toString(16);

    this.state = {
      hasntChecked: true,
      isCheckingMiddlewares: false,
      redirect: null
    };
  }

  componentDidMount() {
    this.runMiddlewares();
  }

  componentDidUpdate(prevProps) {
    if (!equals(prevProps.location, this.props.location)) {
      this.setState({
        hasntChecked: false,
        isCheckingMiddlewares: false,
        redirect: null
      }, () => {
        if (this.props.deepCheck) {
          this.runMiddlewares();
        }
      });
    }
  }

  runMiddlewares = () => {
    this.setState({ isCheckingMiddlewares: true, hasntChecked: false });

    const dontPassMiddleware = (this.props.middlewares || []).find(item => !item.middleware(this.props.store));

    if (dontPassMiddleware) {
      this.setState({ redirect: dontPassMiddleware.redirect, isCheckingMiddlewares: false });
      // this.props.history.push(dontPassMiddleware.redirect);
    } else {
      this.setState({ isCheckingMiddlewares: false });
    }
  }

  render() {
    const { component: C, render, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => {
        if (this.state.isCheckingMiddlewares || this.state.hasntChecked) { return null; }
        if (this.state.redirect) { console.log('redirect:', path(['pathname'], this.state.redirect) || this.state.redirect);return (
          <Redirect exact to={{
            pathname: path(['pathname'], this.state.redirect) || this.state.redirect,
            search: path(['pathname'], this.state.search) || "",
            state: { from: props.location }
          }} />
        ); }
        if (render) { return render(props); }
        if (C) { return <C {...props} />; }
        return null;
      }}/>
    );
  }
}

export default compose(
  connect(mapStateToProps),
)(AuthRoute);
