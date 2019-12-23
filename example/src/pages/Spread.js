function Spread(props) {
  return <Box color="text.primary">{props => <Button {...props} />}</Box>;
}
