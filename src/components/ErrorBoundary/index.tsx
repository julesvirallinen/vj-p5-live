import React, { ReactNode } from "react";

export class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { error: string }
> {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div>{error}</div>;
    } else {
      return <>{this.props.children}</>;
    }
  }
}
