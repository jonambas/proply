function Function() {
  function handleClick() {
    return;
  };

  return (
    <div>
      <Button className={styles.Button} onClick={handleClick} />
      <Button className={styles.Button} onClick={handleClick}>
        {(props) => {
          return (
            <Text as='strong'>Within Render Props</Text>
          )
        }}
      </Button>
    </div>
  );
}
