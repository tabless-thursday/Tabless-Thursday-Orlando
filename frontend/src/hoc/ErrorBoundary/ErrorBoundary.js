import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        erroMessage: null
    }

    componentDidCatch(err, errorInfo) {
        this.setState({hasError: err, errorInfo: errorInfo})
    }

    render() {
        if (this.state.hasError) {
            return (
            <div>
                <h2>Something when wrong.... We are sorry!</h2>
                <p>Find out more:</p>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.hasError && this.state.hasError.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                </details>
                <span>Click <Link to="/">me</Link> to get out of here!</span>
            </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;

