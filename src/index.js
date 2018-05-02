/**
 * refer to react-loadable
 * @author EvanLiu
 * @export  {Function}
 * @param   {Object} options for AsyncLoader
 * @returns {Class} React Component
 */
import React from "react";

export default function asyncLoader(options) {
  options = Object.assign({
    loader: null,
    loading: <div className="async-loading">loading...</div>,
    error: <div className="async-error">some error occurred.</div>,
    delay: 200,
  }, options)

  class AsyncLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        loading: true,
        component: null
      };
    }

    componentDidMount() {
      options.loader().then((e)=>{
        if(!e || !e.default) {
          this.setState({
            error: true
          });
          return;
        }
        setTimeout(()=>{
          this.setState({
            loading: false,
            component: e.default
          });
        },options.delay)
        
      }).catch((e)=>{
        this.setState({
          error: true
        });
      })
    }

    render() {
      const C = this.state.component;
      const E = options.error;
      const L = options.loading;

      return C ? <C {...this.props} />
      : (
        this.state.error ? (
          (this.state.error && E) ? E : null
        ) : (
          (this.state.loading && L) ?  L : null
        )
      )
    }
  }

  return AsyncLoader;
}