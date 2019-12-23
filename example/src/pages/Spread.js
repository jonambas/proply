function Spread({ foo, ...rest }) {
  return <Box {...rest}>{props => <Button {...props} />}</Box>;
}
