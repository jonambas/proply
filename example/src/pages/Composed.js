function Composed() {
  return (
    <Card>
      <Card.Foo m="10px" />
      <Card.Bar>
        <Card.Baz component={<Card.Foo active/>} />
      </Card.Bar>
    </Card>
  );
}
